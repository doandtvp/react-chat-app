import React, { useRef, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { connect } from "redux-zero/react";
import actions from "../../store/actions";

const mapToProps = (store) => store;

function OtpCountDown(store) {
  const { resetKey, expTime, currentTime, getCurrentTime } = store;
  const date = useRef(Date.now());

  useEffect(() => {
    getCurrentTime(date.current);
  }, [getCurrentTime]);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return (
        <p className="otp-expired">
          OTP code has expired, please resend a new one
        </p>
      );
    } else {
      // Render a countdown
      return (
        <p className="otp-countdown">
          OTP code expire after{" "}
          <span className="otp-timer">
            {zeroPad(minutes)}:{zeroPad(seconds)}
          </span>
        </p>
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
