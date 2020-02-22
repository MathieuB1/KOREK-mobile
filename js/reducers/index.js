import { combineReducers } from "redux";
import * as AuthReducer from "./auth";
import * as ArticleReducer from "./articles";
import * as CommonReducer from "./common";
import * as ProfileReducer from "./profile";
import * as TrackReducer from "./track";

const allReducers = Object.assign({},
    AuthReducer,
    CommonReducer,
    ArticleReducer,
    ProfileReducer,
    TrackReducer
);

export default combineReducers(
    Object.assign(allReducers),
);