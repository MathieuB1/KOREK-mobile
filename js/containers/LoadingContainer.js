import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
import LoadingScreen from "../screens/LoadingScreen";

class LoadingContainer extends React.Component {
    render() {
        return React.createElement(LoadingScreen);
    }

    componentDidMount() {

        this.props.getCsrfToken();

        this.props.navigation.navigate(
            this.props.commonInfo &&
            this.props.commonInfo.token &&
            this.props.commonInfo.loggedIn ?
            "App" :
            "Auth"
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer);