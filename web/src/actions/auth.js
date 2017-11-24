import { Socket } from 'phoenix';
import api from '../api';
import { USER_LOGGED_OUT, AUTHENTICATION_SUCCESS, CURRENT_USER, SOCKET_CONNECTED} from '../types';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

const API_URL = process.env.REACT_APP_API_URL;
const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api', '');

function connectToSocket(dispatch, response) {
    const token = JSON.parse(localStorage.getItem("trackerJWT"));
    const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
        params: { token }
    });
    socket.connect();
    dispatch({ type: SOCKET_CONNECTED, socket });

    const channel = socket.channel(`users:${response.data.id}`);
    if(channel.state !== 'joined') {
        channel.join().receive('ok', () => {
            dispatch({
                type: CURRENT_USER,
                currentUser: response.data,
                socket,
                channel
            });
        })
    }
}

function setCurrentUser(dispatch, response) {
    localStorage.setItem('trackerJWT', JSON.stringify(response.meta.token));
    dispatch({ type: AUTHENTICATION_SUCCESS, response});
    connectToSocket(dispatch, response);
}

export const userLoggedIn = user => ({
  type: CURRENT_USER,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const getCurrentUser = () => dispatch =>
    api.user.currentUser().then((res) => {
        if(Object.keys(res).length !== 0) {
            res.data = res;
            connectToSocket(dispatch, res.data);
        } else {
            userLoggedOut();
        }
    }).catch((error) => {
        throw error;
    });

export const login = credentials => dispatch => 
  api.user.login(credentials)
  .then(user => {
    localStorage.trackerJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem("trackerJWT");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const confirm = token => dispatch => 
  api.user.confirm(token).then(data => {
      setCurrentUser(dispatch, data);
      setAuthorizationHeader(data.meta.token);
  });

export const signup = data => dispatch =>
    api.user.signup(data).then(res => {
        setCurrentUser(dispatch, res);
    });

export const resetPasswordRequest = ({ email }) => () => api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);