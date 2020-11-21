import axios from 'axios';
import { setAlert } from './alert';
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE} from './types';

// Get current users profile
export const getCurrentProfile =  () => async dispatch => {
    try {
        // Will get profile from the user id
        const res = await axios.get('/api/profile/me');
    
        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Create or Update Profile
export const createProfile = (formData, history, edit=false) => async dispatch => {// History object has a method called push that can help us redirect to a client side route
    try {
        // Need to create config object to send data
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);

        dispatch ({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", `success`)); // If edit is true, send alert that profile has been updated, else created

        // If creating profile, redirect
        if (!edit) {
            history.push('/dashboard'); // Cannot redirect normally in an action
        }

    } catch(err){
        const errors = err.response.data.errors; // Gets body errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }

};

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        // Need to create config object to send data
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch ({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', `success`)); // If edit is true, send alert that profile has been updated, else created

        history.push('/dashboard'); // Cannot redirect normally in an action

    } catch(err){
        const errors = err.response.data.errors; // Gets body errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        // Need to create config object to send data
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch ({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', `success`)); // If edit is true, send alert that profile has been updated, else created

        history.push('/dashboard'); // Cannot redirect normally in an action

    } catch(err){
        const errors = err.response.data.errors; // Gets body errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
};