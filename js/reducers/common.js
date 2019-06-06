import * as types from "../actions/types";

export function commonInfo(state = { csrfLoaded: false, loggedIn: false }, action) {
  switch (action.type) {
    case types.REQUEST_CSRF:
    return Object.assign({}, state, {
            csrf: action.csrf,
            csrfLoaded: true
    });
    case types.LOGIN:
      return { ...state,
          loggedIn: action.loggedIn,
          token: action.token,
          username: action.username,
          currentUserImage: action.currentUserImage,
          errors: action.token ? null : action.errors,
        };
    case types.REGISTER_PAGE_LOAD:
      return { ...state,
          username: action.username,
        };
    case types.SETTING_PAGE_LOAD:
      return { ...state,
          currentUserImage: action.currentUserImage,
        };
    case types.SETTING_PAGE_UNLOAD:
      return { ...state,
          currentUserImage: null,
        };
    case types.LOGOUT:
      return {};   
    default:
      return state;
  }
}
