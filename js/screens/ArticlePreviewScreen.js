import React from 'react';
import { View, Text, Image, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import * as Icon from '@expo/vector-icons';

import HTML from 'react-native-render-html';

import ListErrors from '../components/ListErrors';

import * as mime from 'react-native-mime-types';

import MapScreen from "./MapScreen";

export default class ArticlePreviewScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: 0,
            image_path: '',
            image: '',
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            disable: false,
            shouldPlay: new Array(this.props.article.videos.length).fill(false),
        };
    }


    componentDidUpdate() {
        if (this.props.status && this.props.status == 204)
        {
            this.props.goToHome();
        }
    }

    updateList = (idx, prevState) => {
        var array = new Array(this.props.article.videos.length).fill(false);
        array[idx] = !prevState.shouldPlay[idx];
        return array
    }

    handlePlayAndPause = (idx) => {  
        this.setState((prevState) => ({
        shouldPlay: this.updateList(idx, prevState)
        }));
    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */
        return <ScrollView>
                    <View>

                        {this.props.errors ?
                        <ListErrors errors={this.props.errors}/> : null
                        }

                        <View style={{ flexWrap: 'wrap', flexDirection: 'row'}}>
                            
                            <Icon.Ionicons
                                name='md-calendar'
                                size={25}
                            />
                            <View style={{ width: 180, marginTop: 3 }}>
                                <Text>&nbsp;{new Date(this.props.article.created).toDateString()}</Text>
                            </View>
                            
                            <Icon.Ionicons
                                name='md-contact'
                                size={25}
                            />
                            <Text style={{ marginTop: 3 }}>&nbsp;{this.props.article.owner}</Text>
                        </View>

                        <View style={{ marginTop: 5, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{ fontSize: 20 }}>{this.props.article.title}</Text>

                            { this.props.article && this.props.article.subtitle !== '' ?
                                    <Text style={{ fontSize: 10 }}>{this.props.article.subtitle}</Text> : null
                            }
                        </View>

                        <View style={{ borderRadius: 5, backgroundColor: 'white', margin: 5, padding: 5}}>
                        { this.props.article.text ?
                            <HTML html={this.props.article.text} /> : null }
                        </View>

                        <View style={styles.TagContainer}>
                            {this.props.article.tags.map(el => 
                            <View style={styles.TagsContainer} key={`tag_` + el}>
                                <Text style={styles.TagElementContainer}>{el}</Text>
                            </View>)}
                        </View>

                        <View style={styles.imageContainer}>
                        { (this.props.article.images[0]) ?
                            this.props.article.images.map(el => 
                                <View key={`image_` + el.image} ><Image style={{ width: 355, height: 355}} 
                                                                source={{ uri: el.image, 
                                                                headers: { Authorization: 'Bearer ' + this.props.commonInfo.token }}}/></View>) : null }
                        </View>

                        <View style={styles.imageContainer}>
                        { (this.props.article.videos[0]) ?
                            this.props.article.videos.map((el, idx) => 
                                <View key={`item_` + el.video} style={{ alignItems: 'center', justifyContent: 'center' }}><View key={`video_` + el.video} >
                                     <Video source={{ uri: el.video + "?token=" + this.props.commonInfo.token }}
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={false}
                                            resizeMode="cover"
                                            shouldPlay={this.state.shouldPlay[idx]}
                                            style={{ width: 355, height: 355 }}
                                            /></View>                    
                                            <Icon.Ionicons key={`button_` + el.video}
                                            name={this.state.shouldPlay[idx] ? 'md-pause' : 'md-play'}  
                                            size={25}
                                            color="white" 
                                            onPress={() => this.handlePlayAndPause(idx)}/>
                                            </View>) : null }
                        </View>

                        <View>
                            {(this.props.article.locations[0]) ?
                                React.createElement(MapScreen, {
                                    locations: this.props.article.locations,
                                    title: this.props.article.title,
                                    id: this.props.article.id,
                                }) : null }
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Button title='Update Article' onPress={() => this.props.update(this.props.article.id)} />
                        </View>
                        <Button color="red" title='Delete Article' onPress={() => this.props.deleteArticle(this.props.article.id)} />
                        
                    </View>
               </ScrollView>
    }
}


const styles = StyleSheet.create({
  TagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 5
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
  TagsTotalContainer: {
        marginLeft: 2,
        backgroundColor: 'black',
        color: 'white',
        paddingLeft: 3,
        paddingRight: 3,
  },
  TagElementContainer: {
        color: 'white',
  }
});