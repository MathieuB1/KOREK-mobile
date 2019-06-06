import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
import SettingScreen from "../screens/SettingScreen";

class SettingContainer extends React.Component {
    static navigationOptions = {
        title: 'My Settings',
    };

    render() {
        return React.createElement(SettingScreen, {
            update: (formData, userid, logout) => this.props.updateProfile(formData, userid, logout),
            profileInfo: this.props.profileInfo,
            percent: this.props.profileInfo.percent,
            errors: this.props.profileInfo.errors,
        })
    }


    _profileUpdated = () => {
        this.props.performSettingRefresh();
    };
  

  
    componentDidUpdate() {
        if (!this.props.profileInfo.userRegister) {
            this.props.getUserRegister();
        }

        if (!this.props.profileInfo.userProfile) {
            this.props.getUserProfile(this.props.commonInfo.username);
        }

        if (this.props.profileInfo.profile) {

            if (this.props.profileInfo.logout) {
              this.props.performLogout();
              this.props.navigation.navigate('Auth');
            } else { 
              this._profileUpdated(); 
            }
        }


    }


}

function mapStateToProps(state) {
    return {
        profileInfo: state.profileInfo,
        commonInfo: state.commonInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);