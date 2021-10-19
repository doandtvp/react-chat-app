const actions = (store) => ({
  getInputValue: (state, payload) => {
    let regVnF = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

    if (payload.name === 'phone' && payload.value === '') {
      return {
        [payload.name]: payload.value,
        validatePhoneNumber: ''
      }
    } else if (payload.name === 'phone' && !regVnF.test(payload.value)) {
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
  getGender: (state, payload) => {
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
  getAuth: (state, payload) => {
    return {
      auth: payload
    }
  },
  getUserId: (state, payload) => {
    return {
      userId: payload
    }
  },
  getCurrentUrl: (state, payload) => {
    return {
      currentUrl: payload
    }
  },
  getDevice: (state, payload) => {
    return {
      device: payload
    }
  },
  getMfa: (state, payload) => {
    return {
      mfa: payload
    }
  }, getOtpId: (state, payload) => {
    return {
      activeId: payload.activeId,
      clientId: payload.clientId
    }
  }, getOtp: (state, payload) => {
    return {
      otp: payload
    }
  },
  getToken: (state, payload) => {
    return {
      token: payload
    }
  },
  getUser: (state, payload) => {
    return {
      user: payload
    }
  },
  getCurrentTime: (state, payload) => {
    return {
      currentTime: payload
    }
  },
  getExpTime: (state, payload) => {
    return {
      expTime: payload
    }
  },
  getDisable: (state, payload) => {
    return {
      disable: payload
    }
  },
  getResetKey: (state, payload) => {
    return {
      resetKey: payload
    }
  },
  getUpdate: (state, payload) => {
    return {
      isUpdate: payload
    }
  },
  getResetAll: (state, payload) => {
    return {
      userName: '',
      password: '',
      rePassword: '',
      email: '',
      displayName: '',
      phone: '',
      rememberLogin: null,
      notification: '',
      errorMessage: '',
      userId: 0,
      mfa: false,
    }
  }
});

export default actions;
