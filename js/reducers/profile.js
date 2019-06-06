import * as types from "../actions/types";

export function profileInfo(state = {}, action) {
    switch (action.type) {
        case types.REGISTER_PAGE_LOAD:
            return {...state,
                userRegister: action.userRegisterInfo,
                profile: null,
                errors: null,
            };
        case types.SETTING_PAGE_LOAD:
            return {...state,
                userProfile: action.userProfileInfo,
                percent: 0,
                profile: null,
                errors: null,
            };
        case types.UPLOAD_SETTING_PROGRESS:
            return {...state,
                percent: action.percent
            };
        case types.SETTING_PAGE_UNLOAD:
            return {...state,
                userProfile: null,
                userRegister: null,
                percent: 0,
                profile: null,
                errors: null,
            };
        case types.PROFILE_UPDATE:
            return {...state,
                profile: action.profile ? action.profile : null,
                errors: action.profile ? null : action.error,
                logout: action.logout,
                percent: 0,
            };
        default:
            return state;
    }
}