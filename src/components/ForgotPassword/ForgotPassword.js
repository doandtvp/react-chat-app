import React from "react";
import "./ForgotPassword.scss";
import singIn from "../../images/signin-image.jpg";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { connect } from "redux-zero/react";
import actions from "../../store/actions";
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage'
import Notification from '../UI/Notificaton/Notification'

const mapToProps = (store) => store

function ForgotPassword(store) {
    const { email, errorMessage, getInputValue, getErrorMessage, getNotification, notification, userId } = store;

    const handleResetMail = async () => {
        try {
            const response = await fetch('https://localhost:3333/api/Account/SendResetEmail', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify ({
                   email: email
                })
            });
      
            const data = await response.json()
            console.log(data)

            if(data.statusCode === 200) {

                getNotification({
                    notification: data.restMessage,
                    userId: 1
                });

                getErrorMessage('');
        
              } else if(data.statusCode === 400) {
                getNotification({
                    notification: data.restMessage,
                    userId: 0
                });
                getErrorMessage('');
              }
              
              if(response.status === 400) {
                getErrorMessage(data.errors)
              }
        
      
        } catch (error) {
        console.log(error)
        }
    }

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        getInputValue({ name, value })
    }
    
    const handleSubmit = () => {
        handleResetMail()
    }

    return (
        <div className="main">
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure>
                                <img src={singIn} alt="sign in img" />
                            </figure>
                            <a href='http://localhost:3000/login' className='signup-image-link'>
                                Back to Login
                             </a>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Reset Your Password</h2>
                            {notification && <Notification notification={notification} userId={userId} />}
                            <form className="register-form">

                                <div className='fields-group'>
                                    <Input
                                    type='text'
                                    name='email'
                                    id='email'
                                    placeholder='Your Email'
                                    icons='zmdi-email'
                                    value={email}
                                    onHandleChange={handleChange}
                                    />

                                    {errorMessage.Email && <ErrorMessage error={errorMessage.Email[0]} />}
                                </div>

                                <Button
                                    type="button"
                                    name="signin"
                                    value="Send Password Reset Email"
                                    onHandldeClick={handleSubmit}
                                />
                            </form>
                            <div className="social-login">
                                <span className="social-label">
                                    Or login with
                                </span>
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
            </section>
        </div>
    );
}

export default connect(mapToProps, actions)(ForgotPassword);
