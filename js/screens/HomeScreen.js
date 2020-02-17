import React, { Component } from 'react';
import { Image, Platform, Button, View,  ScrollView,
  StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { Video } from 'expo-av';
import * as Icon from '@expo/vector-icons';

import ListErrors from '../components/ListErrors';

import HTML from 'react-native-render-html';

export default class HomeScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
          isRefresh: false,
          loading: false,
          searchTitle: '',
      };
    }

  onRefresh() {
     this.props.refreshArticles();
     this.setState({ isRefresh: true });
  }



  componentDidUpdate(prevProps) {
    if (this.props.articlesInfo !==  prevProps.articlesInfo && this.state.isRefresh) {
      this.setState({ isRefresh: false });
    }

    if ( ((this.props.articlesInfo !== prevProps.articlesInfo) || this.props.articlesInfo.next === null) && this.state.loading )
    {
      this.setState({ loading: false });
    }

  }

  getArticlePreview = (item) => { 
    this.props.view(item);
  }

  _searchTitle = (val) => { 
    this.props.filterArticlesByTitle(val);
  }

  render() {

    return (
      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.Ionicons
              name='md-search'
              size={20}
              color='gray'
          />
          <TextInput
            style={{ height: 40, width: 200 }}
            placeholder=" Search in title..."
            onChangeText={( searchTitle ) => this.setState({ searchTitle }, () => {this._searchTitle(searchTitle) })}
          />

          {this.props.errors ?
          <ListErrors errors={this.props.errors}/> : 
          <View>
            <Text>Articles: {this.props.articlesInfo.count}</Text>
          </View>
          }

        </View>




        { !this.state.isRefresh && this.props.commonInfo.token && this.props.commonInfo.token !== '' && this.props.articlesInfo.articles ?
            <FlatList style={styles.container}
              ref={(ref) => { this.flatListRef = ref; }}
              data={this.props.articlesInfo.articles}
              keyExtractor={(item, index) => item.id.toString() }
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isRefresh}
              
              onEndReached={() => {this.setState({ loading: true }); this.props.handleLoadMore(); }}
              onEndReachedThreshold={0.5}

              renderItem={({item}) => 
              <View style={{ backgroundColor: 'white', borderRadius: 5, margin: 2 }}>
                <TouchableOpacity onPress={() => this.getArticlePreview(item)}>
                  <View style={styles.imageContainer}>
                  <Text style={{ fontSize: 20 }} >{item.title}</Text>
                  { (item.videos[0]) ?
                    <Video source={{ uri: item.videos[0].video + "?token=" + this.props.commonInfo.token }}
                      rate={1.0}
                      volume={1.0}
                      isMuted={false}
                      resizeMode="cover"
                      style={{ width: 355, height: 300 }}
                    />: null }

                  { (item.images[0] && !item.videos[0]) ?
                    <Image style={{width: 355, height: 300, borderRadius: 2 }} 
                                                source={{ uri: item.images[0].image, 
                                                          headers: { Authorization: 'Bearer ' + this.props.commonInfo.token }}}/> : null }
                  </View>
                  <View style={{ marginTop: 5 }}>
                  { item.text ?
                    <HTML  html={item.text.replace(/(\r\n|\n|\r)/gm," ").substr(0, 200)} /> : null }
                  </View>

                  <View style={styles.TagContainer}>
                      {item.tags.map(el => 
                      <View style={styles.TagsContainer} key={`tag_` + el}>
                          <Text style={styles.TagElementContainer}>{el}</Text>
                      </View>)}
                  </View>
                </TouchableOpacity>
              </View>}
              
            />
            
        : null }
        { this.state.loading ? <ActivityIndicator/> : null }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  TagsContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
        color: 'white',
        backgroundColor: '#007bff',
        borderRadius: 2,
        padding: 3,
  },
  TagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
  },
  TagElementContainer: {
        color: 'white',
  }
});
