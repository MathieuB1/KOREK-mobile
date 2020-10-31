import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
import EditorScreen from "../screens/EditorScreen";

class ArticleUpdateContainer extends React.Component {

    static navigationOptions = {
        title: 'Update Article',
    };

    render() {
        return React.createElement(EditorScreen, {
            update: (id, formData) => this.props.updateArticle(id, formData),
            onDeleteMedia: (id, formData) => this.props.onDeleteMedia(id, formData),
            getTags: () => this.props.getTagsList(),
            commonInfo: this.props.commonInfo,
            percent: this.props.articlesInfo.percent,
            article: this.props.articlesInfo.articles.filter(el => el.id === this.props.navigation.getParam('articleId'))[0],
            errors: this.props.articlesInfo.errors,
            tags: this.props.articlesInfo.tags,
        });
    }

    componentDidUpdate() {
        if (this.props.articlesInfo.article && this.props.articlesInfo.article.title !== '') {
            this.props.navigation.navigate('Loading');
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleUpdateContainer);