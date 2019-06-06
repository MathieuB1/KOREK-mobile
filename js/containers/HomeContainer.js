import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
import HomeScreen from "../screens/HomeScreen";
import { Button, Image, View, StyleSheet, AsyncStorage } from 'react-native';

class HomeContainer extends React.Component {

  constructor() {
      super();
      this.state = {
        userImage: '',
        page: 0,
      };
  }

    static navigationOptions = ({ navigation }) => {

    const { params = {} } = navigation.state
        return {
            headerTitle: 'korek',
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
  
  
    handleLoadMore = () => {
        if (this.props.articlesInfo.next)
        {
            this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.props.getArticles(this.state.page);
            }
            );
        }
    };


    onRefresh = () => {
        
        this.setState(
        {
            page: 0
        },
        () => {
            this.props.getArticles(this.state.page);
        }
        );
    };

    componentDidMount() {
        this.props.navigation.setParams({ signOutAsync: this._signOutAsync });
        this.props.getArticles();
    }

    componentDidUpdate() {
        if ( this.props.commonInfo && this.props.commonInfo.currentUserImage && this.state.userImage !== this.props.commonInfo.currentUserImage )
        {
            this.props.navigation.setParams({ currentUserImage: this.props.commonInfo.currentUserImage });
            this.setState({ userImage: this.props.commonInfo.currentUserImage })
        }
    }

    render() {

        return React.createElement(HomeScreen, {
            view: (article) => this.props.navigation.navigate('ArticlePreview', { article: article }),
            articlesInfo: this.props.articlesInfo,
            commonInfo: this.props.commonInfo,
            refreshArticles: () => this.onRefresh(),
            handleLoadMore: () => this.handleLoadMore(),
            page: this.state.page,
            errors: this.props.articlesInfo.errors,
            filterArticlesByTitle: (criteria) => this.props.getArticles(this.state.page, { title : criteria }),
        });


    }
}

function mapStateToProps(state) {
    return {
        commonInfo: state.commonInfo,
        articlesInfo: state.articlesInfo
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  }
});