import React from "react";
import singIn from "../../../images/signin-image.jpg";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { connect } from "redux-zero/react";
import actions from "../../../store/actions";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import Notification from "../../UI/Notificaton/Notification";
import SuccessNotification from "../../UI/Notificaton/SuccessNotification";
import { Redirect, Link } from "react-router-dom";
import { callAPI } from "../../API";

const mapToProps = (store) => store;

function SendResetEmail(store) {
  const {
    email,
    errorMessage,
    notification,
    userId,
    auth,
    currentUrl,
    getInputValue,
    getErrorMessage,
    getNotification,
    getResetAll,
  } = store;

  if (auth === true) {
    return <Redirect to="/homepage" />;
  }

  //--> check mail in database
  const handleResetMail = async () => {
    const formData = {
      email: email,
      domain: `${currentUrl}/reset_password`,
    };

    try {
      callAPI(
        '/Account/SendResetEmail',
        "POST",
        { "Content-Type": "application/json" },
        formData
      ).then(async (response) => {
        const data = await response.json();

        if (data.statusCode === 200) {
          getNotification({
            notification: data.restMessage,
            userId: data.data[1],
          });

          getErrorMessage("");
        } else if (data.statusCode === 400) {
          getNotification({
            notification: data.restMessage,
            userId: 0,
          });
          getErrorMessage("");
        }

        if (response.status === 400) {
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

  const handleSubmit = () => {
    handleResetMail();
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
                to="/login"
                className="signup-image-link"
                onClick={getResetAll}
              >
                Back to Login
              </Link>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Reset Password</h2>
              {userId === 0 && notification && (
                <Notification notification={notification} userId={userId} />
              )}
              <form className="register-form">
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

                  {errorMessage.Email && (
                    <ErrorMessage error={errorMessage.Email[0]} />
                  )}
                </div>

                <Button
                  type="button"
                  name="signin"
                  value="Reset Password"
                  onHandldeClick={handleSubmit}
                />
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

        {userId !== 0 && (
          <SuccessNotification
            success={notification}
            title="Back to Login"
            url="/login"
          />
        )}
      </section>
    </div>
  );
}

export default connect(mapToProps, actions)(SendResetEmail);
