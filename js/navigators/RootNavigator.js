import { createSwitchNavigator } from "react-navigation";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import LoadingContainer from "../containers/LoadingContainer";
import ArticlePreviewContainer from "../containers/ArticlePreviewContainer";
import { createAppContainer } from "react-navigation";

const RootNavigator = createAppContainer(createSwitchNavigator({
    Loading: LoadingContainer,
    Auth: AuthNavigator,
    App: AppNavigator
}, {
    initialRouteName: "Loading"
}));

export default RootNavigator;