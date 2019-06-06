import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
import RegisterScreen from "../screens/RegisterScreen";

class RegisterContainer extends React.Component {
    componentDidUpdate() {
        if (this.props.authInfo.newuser && this.props.authInfo.newuser.id) {
            this.props.navigation.navigate("Auth");
        }
    }

    render() {
        return React.createElement(RegisterScreen, {
            createUser: (data) => this.props.registerUser(data),
            errors: this.props.authInfo.errors,
        });
    }
}

function mapStateToProps(state) {
    return {
        authInfo: state.authInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);