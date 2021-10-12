import createStore from 'redux-zero';

const initialState = {
  userName: '',
  password: '',
  rePassword: '',
  email: '',
  displayName: '',
  phone: '',
  gender: true,
  rememberLogin: null,
  userId: 0,
  errorMessage: '',
  validatePhoneNumber: '',
  notification: '',
  submitSuccess: false,
  auth: false,
  token: null,
  currentUrl: '',
  device: '',
  otp: '',
  mfa: false
};

const store = createStore(initialState);

export default store;
