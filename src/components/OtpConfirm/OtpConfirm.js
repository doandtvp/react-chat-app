import React, { useState, useRef } from "react";
import "./OtpConfirm.scss";
import { connect } from "redux-zero/react";
import actions from "../../store/actions";
import Countdown, { zeroPad } from "react-countdown";

const mapToProps = (store) => store;

function OtpConfirm(store) {
  const [notification, setNotification] = useState("");
  const [resetKey, setResetKey] = useState(undefined);
  const startDate = useRef(Date.now()).current;
 
  const { rememberLogin, otp, userId, device } = store;
  const { getInputValue, getAuth , getMfa} = store;
  const date = new Date().getTimezoneOffset() / -60;

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
            otp: otp,
            deviceName: device,
            expireTime: "2021-10-11T10:05:36.910Z",
            expireDuration: 3600,
            timeZoneOffset: date,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        //remember loggin
        if (data.token !== null && rememberLogin === "on") {
          localStorage.setItem("token", data.token);
        }

        //loggin
        if (data.token !== null) {
          getAuth(true);
          sessionStorage.setItem("isAuth", data.token);
        }

        setNotification(data.loginResultMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendOTP = async () => {
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
            otp: otp,
            deviceName: device,
            expireTime: "2021-10-11T10:05:36.910Z",
            expireDuration: 3600,
            timeZoneOffset: date,
          }),
        }
      );

      const data = await response.json();
      setResetKey(1)

      if (response.status === 200) {
        setNotification(data.loginResultMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseOTPTab = () => {
    getMfa(false)
  }

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <p className='otp-expired'>OTP has expired, please resend a new one </p>;
    } else {
      // Render a countdown
      return (
        <p>
          OTP code expire after: <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
        </p>
      );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    getInputValue({ name, value });
  };

  return (
    <div className="otp">
      <div className='close-tab'>
        <i onClick={onCloseOTPTab} className="zmdi zmdi-close-circle-o"></i>
      </div>
      <p>An OTP code was send to your email, check it and confirm to loggin and join the chat</p>
      <p>If you don't receive email or OTP code was expire then resend to get a new one</p>
      
      <div className='opt-exprise'>
        <Countdown date={startDate + 90000} renderer={renderer} key={resetKey}/>
      </div>

      <div className="otp-errors">
        <span>{notification}</span>
      </div>
      <form className="register-form">
        <div className="otp-group">
          <input
            className="otp-input"
            placeholder="Enter your OTP Code"
            type="text"
            name="otp"
            value={otp}
            onChange={handleChange}
          />
          <div className="otp-buttons">
            <button 
              type='button' 
              className="otp-resend"
              onClick={handleResendOTP}
            >Resend</button>
            <button
              type="button"
              className="otp-success"
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
