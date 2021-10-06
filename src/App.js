import React, { useEffect } from 'react';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import {  BrowserRouter as Router , Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/Route/PrivateRoute';
import { connect } from 'redux-zero/react';
import actions from './store/actions';
import './App.scss';

const mapToProps = (store) => store

function App(store) {
  const { auth, getAuth } = store
  const rememberUser = localStorage.getItem('token')

  useEffect(() => {
    if(rememberUser !== null) {
      getAuth(true)
    }
  }, [rememberUser, getAuth])

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
        <Route exact path='/password_reset' component={ForgotPassword}/>
        <PrivateRoute path='/homepage' auth={auth} token={rememberUser}>
          <HomePage/>
        </PrivateRoute>
      </Switch>
      </div>
    </Router>
  );
}

export default connect(mapToProps, actions)(App);
