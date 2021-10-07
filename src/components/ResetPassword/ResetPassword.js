import React from "react";
import "./ResetPassword.scss";
import signUp from "../../images/signup-image.jpg";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { connect } from "redux-zero/react";
import actions from "../../store/actions";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
import Notification from "../UI/Notificaton/Notification";
import SuccessNotification from "../UI/Notificaton/SuccessNotification";

const mapToProps = (store) => store;

function ResetPassword(store) {
  //--> state
  const {
    password,
    rePassword,
    errorMessage,
    notification,
    userId,
    currentUrl,
  } = store;
  //--> actions
  const { getInputValue, getErrorMessage, getNotification } = store;

  const userID = localStorage.getItem("userID");

  const resetPassword = async () => {
    try {
      const response = await fetch(
        "https://localhost:3333/api/Account/ResetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
            password: password,
            rePassword: rePassword,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.statusCode === 200) {
        getNotification({
          notification: data.restMessage,
          userId: 1,
        });

        localStorage.removeItem("userID")
      }

      if (data.status === 400) {
        getErrorMessage(data.errors);
      } else if (data.statusCode === 400) {
        getErrorMessage(data.errors);
        getNotification({
          notification: data.restMessage,
          userId: 0,
        });
      } else {
        getErrorMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    getInputValue({ name, value });

    if (value !== "") {
      getErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword();
  };

  return (
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Reset Your Password</h2>
              {userId === 0 && notification && (
                <Notification notification={notification} userId={userId} />
              )}
              <form className="register-form">
                <div className="fields-group">
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    icons="zmdi-lock"
                    value={password}
                    onHandleChange={handleChange}
                  />

                  {errorMessage.Password && (
                    <ErrorMessage error={errorMessage.Password[0]} />
                  )}
                </div>

                <div className="fields-group">
                  <Input
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    placeholder="Confirm Password"
                    icons="zmdi-lock-outline"
                    value={rePassword}
                    onHandleChange={handleChange}
                  />

                  {errorMessage.RePassword && (
                    <ErrorMessage error={errorMessage.RePassword[0]} />
                  )}
                </div>

                <Button
                  type="button"
                  id="signup"
                  name="signup"
                  value="Reset Password"
                  onHandldeClick={handleSubmit}
                />
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={signUp} alt="sign up img" />
              </figure>
              <a href={`${currentUrl}/login`} className="signup-image-link">
                Back to Login
              </a>
            </div>
          </div>
        </div>

        {userId !== 0 && (
          <SuccessNotification
            success={notification}
            title="Back to Login"
            url={currentUrl}
          />
        )}
      </section>
    </div>
  );
}

export default connect(mapToProps, actions)(ResetPassword);
