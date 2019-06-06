import { combineReducers } from "redux";
import * as AuthReducer from "./auth";
import * as ArticleReducer from "./articles";
import * as CommonReducer from "./common";
import * as ProfileReducer from "./profile";

const allReducers = Object.assign({},
    AuthReducer,
    CommonReducer,
    ArticleReducer,
    ProfileReducer,
);

export default combineReducers(
    Object.assign(allReducers),
);