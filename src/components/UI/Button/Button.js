import React from "react";

function Button(props) {
  const { type, value, name, onHandldeClick, phone } = props;

  return (
    <div className="form-group form-button">
      <input
        className={!phone ? "form-submit" : "form-submit-enable"}
        type={type}
        name={name}
        value={value}
        onClick={onHandldeClick}
        disabled={phone}
      />
    </div>
  );
}

export default Button;
