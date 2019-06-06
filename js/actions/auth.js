import * as types from "./types";
import * as variables from "./constant";
import {
    AsyncStorage,
} from 'react-native';

export function performLogin(username, password) {

    return async(dispatch, getState) => {
        try {
            const result = await fetch(
                `${variables.BACKEND_SERVER}/api-token-auth/`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: username, password: password })
                }
            ).then(res => res.json());

            if(result.token)
            {
                AsyncStorage.setItem('jwtoken', result.token);
                dispatch(
                    setLoginInfo({
                        token: result.token,
                        loggedIn: true
                    })
                );
            } else {

                    dispatch(
                        setLoginInfo({
                            token: '',
                            loggedIn: false,
                            errors: result,
                        }));
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    };
}

export function performLogout() {
    return dispatch => {
        dispatch(
            setLoginInfo({
                type: types.LOGOUT,
                token: null,
                loggedIn: false
            })
        );
    };
}

export function setLoginInfo({
    token,
    loggedIn,
    errors,
}) {
    return {
        type: types.LOGIN,
        token,
        loggedIn,
        errors,
    };
}


export function registerUser(data) {

    return async(dispatch, getState) => {
        try {
            const result = await fetch(
                `${variables.BACKEND_SERVER}/register/`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }
            ).then(res => res.json());

            if(result.id)
            {
                dispatch(
                    createUser({
                        newuser: result,
                        errors: null,
                    })
                );
            } else {

                    dispatch(
                        createUser({
                            newuser: null,
                            errors: result,
                        }));
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    };
}

export function createUser({
    newuser,
    errors,
}) {
    return {
        type: types.REGISTER,
        newuser,
        errors,
    };
}
