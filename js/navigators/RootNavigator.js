import { createSwitchNavigator } from "react-navigation";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import LoadingContainer from "../containers/LoadingContainer";
import RegisterContainer from "../containers/RegisterContainer";
import ArticlePreviewContainer from "../containers/ArticlePreviewContainer";

const RootNavigator = createSwitchNavigator({
    Loading: LoadingContainer,
    Register: RegisterContainer,
    Auth: AuthNavigator,
    App: AppNavigator
}, {
    initialRouteName: "Loading"
});

export default RootNavigator;