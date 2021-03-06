import React from "react";
import "./LoginForm.scss";
import singIn from "../../../images/signin-image.jpg";
import { connect } from "redux-zero/react";
import actions from "../../../store/actions";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import Notification from "../../UI/Notificaton/Notification";
import OtpConfirm from "../../OTP/OtpConfirm/OtpConfirm";
import { Redirect, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { callAPI } from "../../API";

const mapToProps = (store) => store;

function LoginForm(store) {
  const { state } = useLocation();
  //--> state
  const {
    mfa,
    auth,
    userId,
    userName,
    password,
    rememberLogin,
    errorMessage,
    notification,
    toggleViewPass
  } = store;

  //--> actions
  const {
    getAuth,
    getDevice,
    getResetAll,
    getInputValue,
    getNotification,
    getErrorMessage,
    getMfa,
    getExpTime,
    getCurrentTime,
    getOtpId,
    getOtp,
    getToggleViewPass
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
    getDevice(thisDevice);

    const formData = {
      userName: userName,
      password: password,
      deviceName: thisDevice,
      expireDuration: 3600,
      timeZoneOffset: date,
    };

    try {
      callAPI(
        "/Account/IdentityLoginRequest",
        "POST",
        { "Content-Type": "application/json" },
        formData
      ).then(async (response) => {
        const data = await response.json();

        if (response.status === 200) {
          if (data.userId !== 0) {
            localStorage.setItem("userId", data.userId);
          }
          //=> remember loggin
          if (data.token !== null && rememberLogin === "on") {
            getAuth(true);
            localStorage.setItem("token", data.token);
            sessionStorage.setItem("isAuth", data.token);
          } //=> loggin
          else if (data.token !== null) {
            getAuth(true);
            sessionStorage.setItem("isAuth", data.token);
          } else if (data.mfa) {
            getOtp(data.otp);
            getOtpId({
              activeId: data.activeId,
              clientId: data.clientId,
            });
            getMfa(data.mfa);
            getExpTime(120000);
            //=> trigger timer when duration exprise
            getCurrentTime(Date.now());
          }

          getNotification({
            notification: data.loginResultMessage,
            userId: data.userId,
          });

          getErrorMessage("");
        } else if (response.status === 400) {
          getErrorMessage(data.errors);
        }
      });
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
              <Link
                to="/signup"
                onClick={getResetAll}
                className="signup-image-link"
              >
                Create an account
              </Link>
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

                <div className="fields-group loginPass">
                  <Input
                    type={toggleViewPass ? "text" : "password"}
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

                  <i
                    onClick={getToggleViewPass}
                    className={toggleViewPass ? "zmdi zmdi-eye-off togglePass" : "zmdi zmdi-eye togglePass"}
                    title={toggleViewPass ? "Hide Password" : "Show Password"}
                  ></i>
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

                <Link
                  to="/reset_email"
                  onClick={getResetAll}
                  className="reset_email"
                >
                  Forgot your password?
                </Link>
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
