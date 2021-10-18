import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import { connect } from "redux-zero/react";
import actions from "../../../store/actions";

const mapToProps = (store) => store;

function OtpCountDown(store) {
  const { otp, resetKey, expTime, currentTime } = store;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return (
        <p className="otp-expired">
          Your OTP code has expired, please resend a new one!
        </p>
      );
    } else {
      // Render a countdown
      return (
        <div>
          <p>
            Your OTP code is   
            <span className="otp-timer"> {otp}</span>
          </p>

          <p className="otp-countdown">
            Your OTP code will expire after{" "}
            <span className="otp-timer">
              {zeroPad(minutes)}:{zeroPad(seconds)}
            </span>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="opt-exprise">
      {currentTime && (
        <Countdown
          date={currentTime + expTime}
          renderer={renderer}
          key={resetKey}
        />
      )}
    </div>
  );
}

export default connect(mapToProps, actions)(OtpCountDown);
