import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  user: {
    login: credentials => axios.post(`${API_URL}/v1/auth`, { credentials }).then(res => res.data.user),

    signup: user => axios.post(`${API_URL}/v1/users`, { user }).then(res => res.data.user),

    confirm: token => axios.post(`${API_URL}/v1/auth/confirmation`, { token }).then(res => res.data.user),

    resetPasswordRequest: email => axios.post(`${API_URL}/v1/auth/reset_password_request`, { email }),

    validateToken: token => axios.post(`${API_URL}/v1/auth/validate_token`, { token }),

    resetPassword: data => axios.post(`${API_URL}/v1/auth/reset_password`, { data })
  },

  locations: {}
}