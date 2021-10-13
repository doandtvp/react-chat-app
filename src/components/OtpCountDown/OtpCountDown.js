import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import { connect } from "redux-zero/react";
import actions from "../../store/actions";

const mapToProps = (store) => store;

function OtpCountDown(store) {
  const { iat, getIat, getDisable } = store;

  const renderer = ({ minutes, seconds, completed }) => {
    if (!completed) {
      // Render a countdown
      getDisable(true)
      return (
        <p className="otp-coundown">
          OTP code expire after{" "}
          <span className='otp-timer'>
            {zeroPad(minutes)}:{zeroPad(seconds)}
          </span>
        </p>
      );
    } else {
      // Render a complete state
      getDisable(false)
      getIat(0)
      return (
        <p className="otp-expired"></p>
      );
    }
  };

  return (
   <div className="opt-exprise">
      { iat ? 
        <Countdown date={iat + 6000} renderer={renderer}/> 
        : <p className="otp-expired">OTP code has expired, please resend a new one </p>}
    </div>
  );
}

export default connect(mapToProps, actions)(OtpCountDown);
