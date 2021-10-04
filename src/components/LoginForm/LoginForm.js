import React from 'react';
import './LoginForm.scss';
import singIn from '../../images/signin-image.jpg';
import { connect } from 'redux-zero/react';
import actions from '../../store/actions';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';
import Notification from '../UI/Notificaton/Notification';
import { useHistory } from 'react-router-dom';

const mapToProps = (store) => store;

function LoginForm(store) {
  const history = useHistory()
  //--> state
  const { userName, password, errorMessage, notification, userId } = store;

  //--> actions
  const { getInputValue, getErrorMessage, getNotification } = store;

  const userAgent = navigator.userAgent
  const date = new Date().getTimezoneOffset() / -60

  const getIndexOfOpenBrackets = userAgent.indexOf('(');
  const getIndexOfCloseBrackets = userAgent.indexOf(')');
  const getDevice = userAgent.slice(getIndexOfOpenBrackets + 1, getIndexOfCloseBrackets)

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    getInputValue({ name, value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:3333/api/Account/IdentityLoginRequest', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify ({
              userName: userName,
              password: password,
              deviceName: getDevice,
              expireDuration: 3600,
              timeZoneOffset: date
          })
      });

      const data = await response.json()

      console.log(data)

      if(response.status === 200) {
        getNotification({
          notification: data.loginResultMessage,
          userId: data.userId
        });

        getErrorMessage('');

        if(data.token !== null) {
          history.push('/homepage')
        }

      } else if(response.status === 400) {
        getErrorMessage(data.errors)
      }

    } catch (error) {
        console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin();
  };

  return (
    <section className='sign-in'>
      <div className='container'>
        <div className='signin-content'>
          <div className='signin-image'>
            <figure>
              <img src={singIn} alt='sign in img' />
            </figure>
            <a href='http://localhost:3000/signup' className='signup-image-link'>
              Create an account
            </a>
          </div>

          <div className='signin-form'>
            <h2 className='form-title'>Sign In</h2>
            {notification && <Notification notification={notification} userId={userId} />}
            <form className='register-form'>
              <div className='fields-group'>
                <Input
                  type='text'
                  name='userName'
                  id='userName'
                  placeholder='User Name'
                  icons='zmdi-account'
                  value={userName}
                  onHandleChange={handleChange}
                />

                {errorMessage.UserName && <ErrorMessage error={errorMessage.UserName[0]} />}
              </div>

              <div className='fields-group'>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Your Password'
                  icons='zmdi-lock'
                  value={password}
                  onHandleChange={handleChange}
                />

                {errorMessage.Password && <ErrorMessage error={errorMessage.Password[0]} />}
              </div>
              <div className='form-group'>
                <input
                  type='checkbox'
                  name='remember-me'
                  id='remember-me'
                  className='agree-term'
                />
                <label htmlFor='remember-me' className='label-agree-term'>
                  <span>
                    <span></span>
                  </span>
                  Remember me
                </label>
              </div>

              <Button
                type='button'
                name='signin'
                value='Log in'
                onHandldeClick={handleSubmit}
              />
          
            </form>
            <div className='social-login'>
              <span className='social-label'>Or login with</span>
              <ul className='socials'>
                <li>
                  <a href='#x'>
                    <i className='display-flex-center zmdi zmdi-facebook'></i>
                  </a>
                </li>
                <li>
                  <a href='#y'>
                    <i className='display-flex-center zmdi zmdi-twitter'></i>
                  </a>
                </li>
                <li>
                  <a href='#z'>
                    <i className='display-flex-center zmdi zmdi-google'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default connect(mapToProps, actions)(LoginForm);
