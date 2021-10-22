import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import "./ResetPassword.scss";
import signUp from "../../../images/signup-image.jpg";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { connect } from "redux-zero/react";
import { Link } from "react-router-dom";
import actions from "../../../store/actions";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import Notification from "../../UI/Notificaton/Notification";
import SuccessNotification from "../../UI/Notificaton/SuccessNotification";
import { callAPI } from "../../API";

const mapToProps = (store) => store;

function ResetPassword(store) {
  const [expired, setExpried] = useState(false);

  //--> state
  const {
    password,
    rePassword,
    errorMessage,
    notification,
    userId,
    auth,
    url,
    toggleViewPass,
  } = store;

  //--> actions
  const {
    getInputValue,
    getErrorMessage,
    getNotification,
    getResetAll,
    getToggleViewPass,
  } = store;

  const reset = useLocation().search;
  const userID = new URLSearchParams(reset).get("uid");
  const token = new URLSearchParams(reset).get("token");

  useEffect(() => {
    if (userID && token) {
      const reset = `/Account/ResetPassword?uid=${userID}&token=${token}`;

      const confirmResetPassword = async () => {
        try {
          callAPI(reset, "GET").then(async (response) => {
            const data = await response.json();

            if (data.data === null) {
              setExpried(true);
            } else {
              setExpried(false);
            }

            return () => {
              setExpried(false);
            };
          });
        } catch (error) {
          console.log(error);
        }
      };

      confirmResetPassword();
    }
  }, [userID, token, url]);

  if (auth === true) {
    return <Redirect to="/homepage" />;
  }

  const resetPassword = async () => {
    const formData = {
      userID: userID,
      password: password,
      rePassword: rePassword,
      token: token,
    };

    try {
      callAPI(
        `/Account/ResetPassword`,
        "POST",
        { "Content-Type": "application/json" },
        formData
      ).then(async (response) => {
        const data = await response.json();
        console.log(data);

        if (data.statusCode === 200) {
          getNotification({
            notification: data.restMessage,
            userId: 1,
          });
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
      });
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
              {!expired ? (
                <form className="register-form">
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
                      className={
                        toggleViewPass
                          ? "zmdi zmdi-eye-off togglePass"
                          : "zmdi zmdi-eye togglePass"
                      }
                      title={toggleViewPass ? "Hide Password" : "Show Password"}
                    ></i>
                  </div>

                  <div className="fields-group">
                    <Input
                      type={toggleViewPass ? "text" : "password"}
                      name="rePassword"
                      id="rePassword"
                      placeholder="Confirm New Password"
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
              ) : (
                <div className="new-token">
                  This reset password email is not available. It might be used
                  or expired. Please{" "}
                  <Link to="/reset_email">send a new reset password email</Link>
                </div>
              )}
            </div>
            <div className="signup-image">
              <figure>
                <img src={signUp} alt="sign up img" />
              </figure>
              <Link
                to="/login"
                className="signup-image-link"
                onClick={getResetAll}
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>

        {userId !== 0 && (
          <SuccessNotification success={notification} title="Back to Login" />
        )}
      </section>
    </div>
  );
}

export default connect(mapToProps, actions)(ResetPassword);
