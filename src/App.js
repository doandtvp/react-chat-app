import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './components/HomePage/HomePage'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='main'>
        <Switch>
          <Route exact path='/signup' component={RegisterForm} />
          <Route exact path='/signin' component={LoginForm} />
          <Route exact path='/homepage' component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
