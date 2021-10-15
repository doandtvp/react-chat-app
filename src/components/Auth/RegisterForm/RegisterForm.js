import React from "react";
import "./RegisterForm.scss";
import signUp from "../../../images/signup-image.jpg";
import { connect } from "redux-zero/react";
import actions from "../../../store/actions";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import Notification from "../../UI/Notificaton/Notification";
import RegisterSuccess from "../../UI/Notificaton/SuccessNotification";
import { Redirect, Link } from 'react-router-dom';

const mapToProps = (store) => store;

function RegisterForm(store) {
  //--> state
  const {
    userName,
    password,
    rePassword,
    displayName,
    email,
    phone,
    gender,
    auth,
    errorMessage,
    validatePhoneNumber,
    notification,
    userId,
  } = store;
  //--> actions
  const { getInputValue, getErrorMessage, getGender, getNotification, getResetAll } = store;

  if (auth === true) {
    return <Redirect to={"/homepage"} />;
  }

  const addNewUser = async () => {
    try {
      const response = await fetch(
        "https://localhost:5001/api/Account/CreateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            password: password,
            rePassword: rePassword,
            displayName: displayName,
            gender: gender,
            email: email,
            phone: phone,
            errorMessage: "",
          }),
        }
      );

      const data = await response.json();

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
    addNewUser();
  };

  return (
    <div className='main'>
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              {userId === 0 && notification && (
                <Notification notification={notification} userId={userId} />
              )}
              <form className="register-form">
                <div className="fields-group">
                  <Input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="Your User Name"
                    icons="zmdi-account"
                    value={userName}
                    onHandleChange={handleChange}
                  />

                  {errorMessage.userName && (
                    <ErrorMessage error={errorMessage.userName} />
                  )}
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

                  {errorMessage.email && (
                    <ErrorMessage error={errorMessage.email} />
                  )}
                  {errorMessage.Email && (
                    <ErrorMessage error={errorMessage.Email[0]} />
                  )}
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
                  {errorMessage.phone && (
                    <ErrorMessage error={errorMessage.phone} />
                  )}
                  {validatePhoneNumber && (
                    <ErrorMessage error={validatePhoneNumber} />
                  )}
                </div>

                <div className="fields-group">
                  <div className="form-group radio-group">
                    <p htmlFor="gender">Gender</p>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={(e) => getGender(e.target.value)}
                      className="radio"
                      defaultChecked
                    />{" "}
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={(e) => getGender(e.target.value)}
                      className="radio"
                    />{" "}
                    Female
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="agree-term"
                  />
                  <label htmlFor="agree-term" className="label-agree-term">
                    <span>
                      <span></span>
                    </span>
                    I agree all statements in{" "}
                    <a href="#service" className="term-service">
                      Terms of service
                    </a>
                  </label>
                </div>
                <Button
                  type="button"
                  id="signup"
                  name="signup"
                  value="Register"
                  onHandldeClick={handleSubmit}
                  phone={validatePhoneNumber}
                />
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={signUp} alt="sign up img" />
              </figure>
              <Link to='/login' className="signup-image-link" onClick={getResetAll}>
                I am already member
              </Link>
            </div>
          </div>
        </div>

        {userId !== 0 && (
          <RegisterSuccess
            success={notification}
            title="Back to Login"
          />
        )}
      </section>
    </div>
  );
}

export default connect(mapToProps, actions)(RegisterForm);
