import * as types from "../actions/types";

export function trackedInfo(state = {}, action) {
    switch (action.type) {
        case types.TRACKED_ARTICLE:
            return {...state,
                tracked_article: action.tracked_article ? action.tracked_article : null,
                errors: action.tracked_article ? null : action.error,
            };
        default:
            return state;
    }
}