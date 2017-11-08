/* eslint-disable import/prefer-default-export */
import api from '../api';
import { userLoggedIn } from './auth';

export const signup = data => dispatch =>
    api.user.signup(data).then(user => {
        console.log("user: ", user);
        localStorage.trackerJWT = user.token;
        dispatch(userLoggedIn(user));
    });