import * as types from "../actions/types";

export function authInfo(state = { loggedIn: false }, action) {
    switch (action.type) {
        case types.SAVE_USER_INFO:
            return {...state,
                loggedIn: action.loggedIn,
                userInfo: action.userInfo,
                token: action.token
            };
        case types.REGISTER:
            return {...state,
                newuser: action.newuser ? action.newuser : null,
                errors: action.errors,
            };
        default:
            return state;
    }
}