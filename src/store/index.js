import createStore from 'redux-zero';

const initialState = {
  userName: '',
  password: '',
  rePassword: '',
  email: '',
  displayName: '',
  phone: '',
  errorMessage: '',
  validatePhoneNumber: '',
  notification: '',
  device: '',
  userId: 0,
  expTime: 0,
  currentTime: 0,
  gender: true,
  disable: true,
  submitSuccess: false,
  auth: false,
  mfa: false,
  rememberLogin: null,
  token: null,
  resetKey: undefined,
};

const store = createStore(initialState);

export default store;
