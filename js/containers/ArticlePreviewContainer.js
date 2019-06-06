import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
import ArticlePreviewScreen from "../screens/ArticlePreviewScreen";

class ArticlePreviewContainer extends React.Component {

    static navigationOptions = {
        title: 'View Article',
    };

    render() {
        return React.createElement(ArticlePreviewScreen, {
            update: (articleId) => this.props.navigation.navigate('ArticleUpdate', { articleId: articleId}),
            errors: this.props.articlesInfo.errors,
            status: this.props.articlesInfo.status,
            goToHome: () => this.props.navigation.navigate('Loading'),
            deleteArticle: (articleId) => this.props.deleteArticle(articleId),
            article: this.props.navigation.getParam('article'),
            commonInfo: this.props.commonInfo
        });
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreviewContainer);