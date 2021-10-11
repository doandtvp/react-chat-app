import React from "react";
import "./SuccessNotification.scss";

function SuccessNotification(props) {
  const { success, title, url } = props;

  return (
    <div className="success">
      <div>
        <p>{success}</p>
        <button>
          <a href={`${url}`}>
            {title}
          </a>
        </button>
      </div>
    </div>
  );
}

export default SuccessNotification;
