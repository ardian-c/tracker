import {
    CURRENT_USER,
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE,
    SIGNUP_FAILURE,
    USER_LOGGED_OUT,
    SOCKET_CONNECTED
} from '../types';

const initialState = {
    isAuthenticated: false,
    willAuthenticate: true,
    currentUser: {},
    socket: null,
    channel: null,
    signupErrors: []
};

export default function user(state = initialState, action) {
   switch(action.type) {
       case CURRENT_USER:
           return {
               ...state,
               currentUser: action.currentUser,
               socket: action.socket,
               channel: action.channel,
               isAuthenticated: true,
               willAuthenticate: false
           };

       case AUTHENTICATION_REQUEST:
           return {
               ...state,
               willAuthenticate: true
           };

       case AUTHENTICATION_SUCCESS:
           return {
               ...state,
               willAuthenticate: false,
               isAuthenticated: true,
               currentUser: action.response.data
           };

       case AUTHENTICATION_FAILURE:
           return {
               ...state,
               willAuthenticate: false
           };

       case USER_LOGGED_OUT:
           return {
               ...state,
               willAuthenticate: false,
               isAuthenticated: false,
               currentUser: {},
               socket: null
           };

       case SOCKET_CONNECTED:
           return {
               ...state,
               socket: action.socket
           };

       case SIGNUP_FAILURE:
           return {
               ...state,
               signupErrors: action.error.errors
           };

       default:
           return state;
   }
}