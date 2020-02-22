import * as AuthActions from "./auth";
import * as CommonActions from "./common";
import * as ProfileActions from "./profile";
import * as ArticlesActions from "./articles";
import * as TrackActions from "./tracked";

export const ActionCreators = Object.assign({},
    CommonActions,
    AuthActions,
    ProfileActions,
    ArticlesActions,
    TrackActions,
);