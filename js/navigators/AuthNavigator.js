import { createStackNavigator } from 'react-navigation-stack';
import LoginContainer from "../containers/LoginContainer";
import RegisterContainer from "../containers/RegisterContainer";

const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginContainer
    },
    Register: RegisterContainer,
}, {
    headerMode: "none",
    initialRouteName: "Login"
});

export default AuthNavigator;