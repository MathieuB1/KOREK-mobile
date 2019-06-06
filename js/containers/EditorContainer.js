import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
import EditorScreen from "../screens/EditorScreen";
import { Button, Image, View, AsyncStorage } from 'react-native';

class EditorContainer extends React.Component {

    static navigationOptions = ({ navigation }) => {

    const { params = {} } = navigation.state
        return {
            headerTitle: 'Create Article',
            headerRight: (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex:1 }}>
                <Image 
                    source={{uri: params.currentUserImage}}
                    style={{width: 35, height: 35, flex: 1}}
                />
                <Button
                onPress={ ()=> params.signOutAsync() }
                title="Sign out"
                color="red"
                style={{ flex: 1 }}
                />
            </View>
            ),
        };
    };

    _signOutAsync = async () => {
        this.props.performLogout();
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return React.createElement(EditorScreen, {
            create: (formData) => this.props.createArticle(formData),
            getTags: () => this.props.getTagsList(),
            percent: this.props.articlesInfo.percent,
            article: this.props.articlesInfo.article,
            errors: this.props.articlesInfo.errors,
            tags: this.props.articlesInfo.tags,
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.articlesInfo.article && this.props.articlesInfo.article.title !== '') {
            this.props.navigation.navigate('Loading');
        }

        if (this.props.commonInfo !== prevProps.commonInfo) {
            this.props.navigation.setParams({ currentUserImage: this.props.commonInfo.currentUserImage });
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ signOutAsync: this._signOutAsync, currentUserImage: this.props.commonInfo.currentUserImage });
    }

}

function mapStateToProps(state) {
    return {
        articlesInfo: state.articlesInfo,
        commonInfo: state.commonInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);