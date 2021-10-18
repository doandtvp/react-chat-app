import React, { useState, useEffect } from "react";
import "./UserCP.scss";
import { connect } from "redux-zero/react";
import actions from "../../../store/actions";
import Input from "../../UI/Input/Input";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import Button from "../../UI/Button/Button";

const mapToProps = (store) => store;

function UserCP(store) {
  const [updateSuccess, setUpdateSuccess] = useState("");

  const {
    userName,
    phone,
    email,
    displayName,
    userId,
    user,
    mfa,
    mfaLogin,
    errorMessage,
    validatePhoneNumber,
  } = store;

  const {
    getInputValue,
    getErrorMessage,
    getUpdate,
    getMfa,
  } = store;

  const token = sessionStorage.getItem("isAuth");

  useEffect(() => {
    if (mfaLogin === "on") {
      getMfa(true);
    }
  }, [mfaLogin, getMfa]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    getInputValue({ name, value });

    if (value !== "") {
      getErrorMessage("");
    }
  };

  const saveUserCP = async () => {
    try {
      const response = await fetch(
        "https://localhost:5001/api/Account/SaveUserCP",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userId,
            userName: userName,
            displayName: displayName,
            email: email,
            phone: phone,
            mfa: mfa,
            user: user,
          }),
        }
      );

      const data = await response.json();

      if (data.statusCode === 200) {
        setUpdateSuccess(data.restMessage);
      } else if (data.statusCode === 400) {
        getErrorMessage(data.errors);
      } else if (data.status === 400) {
        getErrorMessage(data.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUserCP();
  };

  const onCloseUpdateModal = () => {
    getUpdate(false);
  };

  return (
    <div className="user-cp">
      <div className="close-modal">
        <i onClick={onCloseUpdateModal} className="zmdi zmdi-close"></i>
      </div>
      <form className="register-form">
        <h3>Update User Infomation</h3>
        <div className="fields-group">
          <Input
            type="text"
            name="userName"
            id="userName"
            placeholder="User Name"
            icons="zmdi-account"
            value={userName}
            onHandleChange={handleChange}
          />

          {errorMessage.UserName && (
            <ErrorMessage error={errorMessage.UserName[0]} />
          )}
        </div>

        <div className="fields-group">
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Your Email"
            icons="zmdi-email"
            value={email}
            onHandleChange={handleChange}
          />

          {errorMessage.email && <ErrorMessage error={errorMessage.email} />}
          {errorMessage.Email && <ErrorMessage error={errorMessage.Email[0]} />}
        </div>

        <div className="fields-group">
          <Input
            type="text"
            name="displayName"
            id="displayName"
            placeholder="Your Display Name"
            icons="zmdi-face"
            value={displayName}
            onHandleChange={handleChange}
          />
          {errorMessage.DisplayName && (
            <ErrorMessage error={errorMessage.DisplayName[0]} />
          )}
        </div>

        <div className="fields-group">
          <Input
            type="number"
            name="phone"
            id="phone"
            placeholder="Your Phone Number"
            icons="zmdi-phone"
            value={phone}
            onHandleChange={handleChange}
          />
          {errorMessage.phone && <ErrorMessage error={errorMessage.phone} />}
          {validatePhoneNumber && <ErrorMessage error={validatePhoneNumber} />}
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            name="mfaLogin"
            id="mfaLogin"
            className="agree-term"
            onChange={handleChange}
          />

          <label htmlFor="mfaLogin" className="label-agree-term">
            <span>
              <span></span>
            </span>
            Login require OTP code
          </label>
        </div>

        <Button
          type="button"
          name="Update User Infomation"
          value="Update User"
          onHandldeClick={handleSubmit}
          phone={validatePhoneNumber}
        />
      </form>

      {updateSuccess && (
        <div className="update-success">
          <p>{updateSuccess}</p>
          <a href="http://localhost:3000/homepage">Back to Homepage</a>
        </div>
      )}
    </div>
  );
}

export default connect(mapToProps, actions)(UserCP);
