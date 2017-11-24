import axios from 'axios';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

const API_URL = process.env.REACT_APP_API_URL;
const currentToken = JSON.parse(localStorage.getItem("trackerJWT"));
setAuthorizationHeader(currentToken);

export default {
  user: {
    login: credentials => axios.post(`${API_URL}/v1/login`, { credentials }).then(res => res.data.user),

    signup: user => axios.post(`${API_URL}/v1/register`, { user }).then(res => res.data),

    confirm: token => axios.post(`${API_URL}/v1/auth/confirmation`, { token }).then(res => res.data),

    resetPasswordRequest: email => axios.post(`${API_URL}/v1/auth/reset_password_request`, { email }),

    validateToken: token => axios.post(`${API_URL}/v1/auth/validate_token`, { token }),

    resetPassword: data => axios.post(`${API_URL}/v1/auth/reset_password`, { data }),

    currentUser: () => axios.get(`${API_URL}/v1/current_user`).then(res => res.data)
  },

  locations: {}
}