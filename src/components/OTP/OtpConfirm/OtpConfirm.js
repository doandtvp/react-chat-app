import React, { useState, useCallback } from "react";
import "./OtpConfirm.scss";
import { connect } from "redux-zero/react";
import actions from "../../../store/actions";
import OtpCountDown from "../OtpCountDown/OtpCountDown";
import { useEffect } from "react/cjs/react.development";
import { callAPI } from "../../API";

const mapToProps = (store) => store;

function OtpConfirm(store) {
  const [notification, setNotification] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    rememberLogin,
    userId,
    device,
    disable,
    expTime,
    activeId,
    clientId,
    currentUrl,
  } = store;

  const { getAuth, getMfa, getOtp, getDisable, getResetKey, getCurrentTime } =
    store;
  const date = new Date().getTimezoneOffset() / -60;

  const handleToggle = useCallback(() => {
    if (expTime !== 0) {
      setTimeout(() => {
        getDisable(false);
        getCurrentTime(expTime);
      }, expTime);
    }
  }, [expTime, getDisable, getCurrentTime]);

  useEffect(() => {
    handleToggle();

    return () => {
      clearInterval(handleToggle);
    };
  }, [handleToggle]);

  //=> Validate OTP
  const handleValidateOTP = async () => {
    const formData = {
      userId: userId,
      otp: otpValue,
      deviceName: device,
      expireDuration: 3600,
      timeZoneOffset: date,
      activeId: activeId,
      clientId: clientId,
    };

    try {
      callAPI(
        "/Account/ValidateOTP",
        "POST",
        { "Content-Type": "application/json" },
        formData
      ).then(async (response) => {
        const data = await response.json();

        if (response.status === 200) {
          if (data.userId !== 0) {
            localStorage.setItem("userId", data.userId);
          }
          //=> remember loggin
          if (data.token !== null && rememberLogin === "on") {
            localStorage.setItem("token", data.token);
            getAuth(true);
          } //=> loggin
          else if (data.token !== null) {
            sessionStorage.setItem("isAuth", data.token);
            getAuth(true);
          } else {
            setIsSuccess(false);
            setNotification(data.loginResultMessage);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //=> reset OTP
  const resendOTP = async () => {
    const formData = {
      userId: userId,
      deviceName: device,
      expireDuration: 3600,
      timeZoneOffset: date,
    };

    try {
      callAPI(
        "/Account/ResendOTP",
        "POST",
        { "Content-Type": "application/json" },
        formData
      ).then(async (response) => {
        const data = await response.json();

        if (response.status === 200) {
          if (userId) {
            setIsSuccess(true);
            setNotification(data.loginResultMessage);
          }
          setOtpValue("");
          getOtp(data.otp);

          getCurrentTime(Date.now());
          getResetKey(Math.random());

          getDisable(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //=> resend OTP
  const handleResendOTP = () => {
    resendOTP();
    handleToggle();
    // getAllActiveOTP();
  };

  //=> get otp from input
  const handleChange = (e) => {
    setOtpValue(e.target.value);

    if (e.target.value !== "") {
      setNotification("");
    }
  };

  //=> prevent loading when user trigger enter
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //=> Close tab
  const onCloseOTPTab = () => {
    getDisable(true);
    getMfa(false);
  };

  return (
    <div className="otp">
      <div className="close-tab">
        <a href={`${currentUrl}/login`}>
          <i onClick={onCloseOTPTab} className="zmdi zmdi-close-circle-o"></i>
        </a>
      </div>
      <p>
        An OTP code was generate for you click confirm to loggin. After 2
        minutes OTP code will expried so click resend to get a new one
      </p>

      {/*countdown timer for OTP code */}
      <OtpCountDown />

      <div className={isSuccess ? "otp-success" : "otp-errors"}>
        <span>{notification}</span>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="otp-group">
          <input
            className="otp-input"
            placeholder="Enter your OTP Code"
            type="text"
            name="otp"
            onChange={handleChange}
            value={otpValue}
          />
          <div className="otp-buttons">
            <button
              type="button"
              className={disable ? "otp-disable" : "otp-resend"}
              onClick={handleResendOTP}
              disabled={disable}
            >
              Resend
            </button>
            <button
              type="submit"
              className="otp-confirm"
              onClick={handleValidateOTP}
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default connect(mapToProps, actions)(OtpConfirm);
