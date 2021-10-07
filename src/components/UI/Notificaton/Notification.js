import React from "react";

function Notification(props) {
  const { notification, userId } = props;

  return (
    <div className={userId !== 0 ? "notification" : "errors"}>
      <p>{notification}</p>
    </div>
  );
}

export default Notification;
