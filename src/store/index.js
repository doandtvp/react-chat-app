import createStore from 'redux-zero';

const initialState = {
  userName: '',
  password: '',
  rePassword: '',
  email: '',
  displayName: '',
  phone: '',
  gender: true,
  reset: 0,
  userId: 1,
  errorMessage: '',
  validatePhoneNumber: '',
  notification: '',
  submitSuccess: false,
  token: null
};

const store = createStore(initialState);

export default store;
