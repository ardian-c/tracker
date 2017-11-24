/* eslint-disable import/prefer-default-export */
import api from '../api';
import { CURRENT_USER } from "../types/index"

export const currentUser = () => dispatch => {
        api.user.currentUser().then((data) => {
            dispatch({
                type: CURRENT_USER,
                data
            })
        });
    }