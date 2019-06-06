import * as AuthActions from "./auth";
import * as CommonActions from "./common";
import * as ProfileActions from "./profile";
import * as ArticlesActions from "./articles";

export const ActionCreators = Object.assign({},
    CommonActions,
    AuthActions,
    ProfileActions,
    ArticlesActions,
);