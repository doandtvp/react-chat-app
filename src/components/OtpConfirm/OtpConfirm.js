import React, { useState } from "react";
import "./OtpConfirm.scss";
import { connect } from "redux-zero/react";
import actions from "../../store/actions";
import OtpCountDown from "../OtpCountDown/OtpCountDown";
import { useEffect } from "react/cjs/react.development";

const mapToProps = (store) => store;

function OtpConfirm(store) {
  const [notification, setNotification] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { rememberLogin, userId, device, disable, expTime, currentUrl } = store;
  const {
    getAuth,
    getMfa,
    getExpTime,
    getDisable,
    getResetKey,
    getCurrentTime,
  } = store;
  const date = new Date().getTimezoneOffset() / -60;

  const handleToggle = () => {
    if (expTime !== 0) {
      setTimeout(() => {
        getDisable(false);
        getCurrentTime(expTime);
      }, expTime);
    }
  };

  useEffect(() => {
    handleToggle();
  }, []);

  //=> Validate OTP
  const handleValidateOTP = async () => {
    try {
      const response = await fetch(
        "https://localhost:5001/api/Account/ValidateOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            otp: otpValue,
            deviceName: device,
            expireTime: "2021-10-11T10:05:36.910Z",
            expireDuration: 3600,
            timeZoneOffset: date,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        //=> remember loggin
        if (data.token !== null && rememberLogin === "on") {
          localStorage.setItem("token", data.token);
        } //=> loggin
        else if (data.token !== null) {
          getAuth(true);
          sessionStorage.setItem("isAuth", data.token);
        } else {
          setIsSuccess(false);
        }

        setNotification(data.loginResultMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //=> reset OTP
  const resendOTP = async () => {
    try {
      const response = await fetch(
        "https://localhost:5001/api/Account/ResendOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            otp: otpValue,
            deviceName: device,
            expireTime: "2021-10-11T10:05:36.910Z",
            expireDuration: 3600,
            timeZoneOffset: date,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        if (userId) {
          setIsSuccess(true);
          setNotification(data.loginResultMessage);
        }

        getExpTime(6000);
        getCurrentTime(Date.now());
        getResetKey(Math.random());
        setOtpValue("")
        getDisable(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // => getAllActiveOTP
  // const getAllActiveOTP = async () =>{
  //   try {
  //     const response = await fetch('https://localhost:5001/api/Account/GetAllActiveOTP');
  //     const data = await response.json()

  //     data.forEach(otp => {
  //       if(otp.userId === userId) {
  //         console.log(otp)
  //       }
  //     });

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleChange = (e) => {
    setOtpValue(e.target.value)

    if(e.target.value !== "") {
      setNotification("")
    }
  }

  //=> resend OTP
  const handleResendOTP = () => {
    resendOTP();
    handleToggle();
    // getAllActiveOTP();
  };

  //=> prevent loading when user trigger enter
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //=> Close tab
  const onCloseOTPTab = () => {
    getDisable(true);
    getExpTime(0);
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
        An OTP code was send to your email, check it and confirm to loggin and
        join the chat
      </p>
      <p>
        If you don't receive email or OTP code was expire then resend to get a
        new one
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
