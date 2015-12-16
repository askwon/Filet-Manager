import { 
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    FETCH_FILES_REQUEST,
    FETCH_FILES_FAILURE,
    FETCH_FILES_SUCCESS,
} from '../constants/ActionTypes';

import {
    loginSuccess,
    loginFailure,
    fetchFilesSuccess,
    fetchFilesFailure,
} from '../actions/login.js'

const initialState = [{
    hostname: "",
    port: "",
    username: "",
    password: "",
    type: "",
    message: "",
    isAttemptingLogin: false, 
    isAuthenticated: false,
    opacity: 1,
    shadow: "4px 4px 20px -1px rgba(0,0,0,0.25)",
}];

export function handleEvent(state = initialState, action) {
    console.log('[IN ACTIONS/LOGIN.JS] -> \nHandling action:');
    console.dir(action);
    switch (action.fxn) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                id: action.id,
                message: action.data
            });
        case LOGIN_FAILURE:
            console.log('[IN ACTIONS/LOGIN.JS] -> \nHandling the login failure action');
            return Object.assign({}, state, {
                id: action.id,
                message: action.data
            });
        case FETCH_FILES_SUCCESS:
            return fetchFilesSuccess(action.id, action.data);
        case FETCH_FILES_FAILURE:
            return fetchFilesFailure(action.id, action.data);
        default:
            console.log('[IN ACTIONS/LOGIN.JS] -> \nUnhandled action error!');
            return state;
    }
}
