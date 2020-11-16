import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR} from '../actions/types';

const initialState = {
    // Getting the tken from local storage
    token: localStorage.getItem('token'),
    isAuntheticated: null, // Will be set to true if user has successfully logged in
    loading: true, // Ensures loading is done, backend request has been finished
    user: null // User will get stored here
}

export default function(state = initialState, action){
    // Takes in action that is dispatched
    const {type, payload} = action;

    switch(type) {
        case USER_LOADED:
            // If user has loaded
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user:payload
            }
        case REGISTER_SUCCESS: // User must get logged in
            localStorage.setItem('token', payload.token); // Stores token so that user can log in, first argument is name and second is value
            return {
                ...state,
                ...payload,
                isAuntheticated: true,
                loading: false
            }
        case AUTH_ERROR: // Does same thing as register fail which is clearing the state and deleting the token from local storage
        case REGISTER_FAIL: // Remove local storage of token
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuntheticated: false,
                loading: false
            }

        default: return state;
    }
}