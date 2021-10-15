import React from "react";
import "./LoginForm.scss";
import singIn from "../../../images/signin-image.jpg";
import { connect } from "redux-zero/react";
import actions from "../../../store/actions";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import Notification from "../../UI/Notificaton/Notification";
import OtpConfirm from "../../OtpConfirm/OtpConfirm";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router";

const mapToProps = (store) => store;

function LoginForm(store) {
  const { state } = useLocation();
  //--> state
  const {
    userName,
    password,
    errorMessage,
    notification,
    userId,
    auth,
    currentUrl,
    mfa,
  } = store;
  //--> actions
  const {
    getInputValue,
    getErrorMessage,
    getNotification,
    getMfa,
    getDevice,
    getExpTime,
    getCurrentTime,
    getResetKey,
    getOtp
  } = store;
  const date = new Date().getTimezoneOffset() / -60;

  const userAgent = navigator.userAgent;
  const getIndexOfOpenBrackets = userAgent.indexOf("(");
  const getIndexOfCloseBrackets = userAgent.indexOf(")");
  const thisDevice = userAgent.slice(
    getIndexOfOpenBrackets + 1,
    getIndexOfCloseBrackets
  );

  if (auth === true) {
    return <Redirect to={state?.from || "/homepage"} />;
  }

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://localhost:5001/api/Account/IdentityLoginRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            password: password,
            deviceName: thisDevice,
            expireDuration: 3600,
            timeZoneOffset: date,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      getDevice(thisDevice);

      if (response.status === 200) {
        getExpTime(6000);
        getCurrentTime(Date.now());
        getResetKey(Math.random());

        getMfa(true);
        getOtp('345678')
        // if(data.mfa) {
        //   getMfa(data.mfa)
        // }

        getNotification({
          notification: data.loginResultMessage,
          userId: data.userId,
        });

        getErrorMessage("");
      } else if (response.status === 400) {
        getErrorMessage(data.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    getInputValue({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="main">
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={singIn} alt="sign in img" />
              </figure>
              <a href={`${currentUrl}/signup`} className="signup-image-link">
                Create an account
              </a>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              {userId === 0 && notification && (
                <Notification notification={notification} userId={userId} />
              )}
              <form className="register-form">
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

                <div className="form-group">
                  <input
                    type="checkbox"
                    name="rememberLogin"
                    id="rememberLogin"
                    className="agree-term"
                    onChange={handleChange}
                  />

                  <label htmlFor="rememberLogin" className="label-agree-term">
                    <span>
                      <span></span>
                    </span>
                    Remember me
                  </label>
                </div>

                <Button
                  type="button"
                  name="signin"
                  value="Log in"
                  onHandldeClick={handleSubmit}
                />

                <a href={`${currentUrl}/reset_email`} className="reset_email">
                  Forgot your password?
                </a>
              </form>

              <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li>
                    <a href="#x">
                      <i className="display-flex-center zmdi zmdi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#y">
                      <i className="display-flex-center zmdi zmdi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#z">
                      <i className="display-flex-center zmdi zmdi-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {mfa && <OtpConfirm />}
      </section>
    </div>
  );
}

export default connect(mapToProps, actions)(LoginForm);
