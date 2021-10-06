const actions = (store) => ({
  getInputValue: (state, payload) => {
    let regVnF = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

    if(payload.name === 'phone' && payload.value === '') {
      return {
        [payload.name]: payload.value,
        validatePhoneNumber: ''
      }
    } else if(payload.name === 'phone' && !regVnF.test(payload.value)) {
      return {
        [payload.name]: payload.value,
        validatePhoneNumber: 'Your Phone Number is invalid'
      };
    } else {
      return {
        [payload.name]: payload.value,
        validatePhoneNumber: '',
      }
    }
  },
  getGender: (store, payload) => {
    if (payload === 'male') {
        return {
          gender: true
        } 
    } else {
        return {
          gender: false
        };
    }
  },
  getErrorMessage: (state, payload) => {
    return {
      errorMessage: payload,
    }
  },
  getNotification: (state, payload) => {
    return {
      notification: payload.notification,
      userId: payload.userId
    }
  },
  getToken: (state, payload) => {
    if(payload !== null) {
      return {
        token: payload
      }
    }
  },
  getAuth: (state, payload) => {
    return {
      auth: payload
    }
  }
});

export default actions;
