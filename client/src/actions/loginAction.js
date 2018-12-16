import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";

export const LOGIN = "LOGIN";
export const SET_ERRORS_LOGIN_NULL = "SET_ERRORS_LOGIN_NULL";
export const LOGOUT = "LOGOUT";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GITHUB_LOGIN = "GITHUB_LOGIN"

const config = require('../config/config')

export const initLogin = (data) => {
    return dispatch => {
        axios.post(config.host + config.login, data).then(tokenData => {
            console.log(tokenData);
            dispatch({
                type: LOGIN,
                payload: tokenData.data
            });
        });
    }
};

export const initLoginGithub = token => {
    return dispatch => {
        console.log('login successful via github');
        dispatch({
            type: GITHUB_LOGIN,
            payload: {token: token, message: 'successful'}
        })
    }
}

export const setCurrentUser = (token) => {
    return dispatch => {
        dispatch({
            type: SET_CURRENT_USER,
            payload: localStorage.getItem('authToken')
        });
    }
};

export const setLoginErrorsToNull = () => {
    return dispatch => {
        dispatch({
            type: SET_ERRORS_LOGIN_NULL
        })
    }
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('authToken');
        setAuthToken(false);
        dispatch({
            type: LOGOUT,
            payload: {currentUser: null}
        });
    }
};