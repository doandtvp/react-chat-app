import React, { useEffect } from 'react';
import RegisterForm from './components/Auth/RegisterForm/RegisterForm';
import LoginForm from './components/Auth/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage';
import SendResetEmail from './components/ForgotPassword/SendResetEmail/SendResetEmail';
import ResetPassword from './components/ForgotPassword/ResetPassword/ResetPassword';

import {  BrowserRouter as Router , Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/Route/PrivateRoute';
import { connect } from 'redux-zero/react';
import actions from './store/actions';
import './App.scss';

const mapToProps = (store) => store

function App(store) {
  const { auth, getAuth, getCurrentUrl } = store
  const rememberUser = localStorage.getItem('token');
  const isAuth = sessionStorage.getItem('isAuth');
  const getIndexOfSolidus = window.location.href.indexOf('/')
  const url = window.location.href.slice(0, getIndexOfSolidus)

  // remember user login
  useEffect(() => {
    getCurrentUrl(url)
    
    if(isAuth !== null || rememberUser !== null) {
      getAuth(true)
    } 
  }, [url, getCurrentUrl, isAuth, rememberUser, getAuth])

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                rememberUser !== null ?
                <Redirect to="/homepage" /> : <Redirect to="/login" /> 
              )
            }}
          />

        <Route exact path='/login' component={LoginForm}/>
        <Route exact path='/signup' component={RegisterForm}/>
        <Route exact path='/reset_email' component={SendResetEmail}/>
        <Route exact path='/reset_password/:uid?/:token?' component={ResetPassword}/>
        <PrivateRoute path='/homepage' auth={auth}>
          <HomePage/>
        </PrivateRoute>
      </Switch>
      </div>
    </Router>
  );
}

export default connect(mapToProps, actions)(App);
