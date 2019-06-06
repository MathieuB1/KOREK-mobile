import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
import EditorScreen from "../screens/EditorScreen";

class EditorContainer extends React.Component {

    static navigationOptions = {
        title: 'Create Article',
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

    componentDidUpdate() {
        if (this.props.articlesInfo.article && this.props.articlesInfo.article.title !== '') {
            this.props.navigation.navigate('Loading');
        }
    }

}

function mapStateToProps(state) {
    return {
        articlesInfo: state.articlesInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);