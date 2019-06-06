import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
import LoginScreen from "../screens/LoginScreen";

class LoginContainer extends React.Component {
    componentDidUpdate() {
        if (!this.props.commonInfo.username && this.props.commonInfo.loggedIn) {
            this.props.getUserRegister();
        }

        if (this.props.commonInfo.username) {
            this.props.getUserProfile(this.props.commonInfo.username);
        }

        if (this.props.commonInfo.username && this.props.commonInfo.loggedIn) {
            this.props.navigation.navigate("App");
        }
    }

    render() {
        return React.createElement(LoginScreen, {
            login: (username, password) => this.props.performLogin(username, password),
            register: () => this.props.navigation.navigate("Register"),
            errors: this.props.commonInfo.errors,
        });
    }
}

function mapStateToProps(state) {
    return {
        commonInfo: state.commonInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);