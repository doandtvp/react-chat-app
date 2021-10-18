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
  activeId: '',
  clientId: '',
  user: {},
  userId: 0,
  expTime: 0,
  currentTime: 0,
  gender: true,
  disable: true,
  isUpdate: false,
  submitSuccess: false,
  auth: false,
  mfa: false,
  mfaLogin: null,
  rememberLogin: null,
  token: null,
  resetKey: undefined,
};

const store = createStore(initialState);

export default store;
