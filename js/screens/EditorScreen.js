import React, { Component } from 'react';
import { Platform, Button, Image, View, ScrollView, StyleSheet, TextInput, Text } from 'react-native';
import * as Icon from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import ListErrors from '../components/ListErrors';
import TagsList from '../components/TagsList';

import * as mime from 'react-native-mime-types';

import * as Progress from 'react-native-progress';

export default class EditorScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
          id: '', 
          images_path: [],
          images: [],
          title: '',
          subtitle: '',
          text: '',
          selected_tags: [],
          imageTodelete: [],
          disabled: false,
          height: 0,
      };
    }

  componentDidMount() {

    this.props.getTags();

    if (this.props.update && this.props.article )
    {
      this.setState({
        id: this.props.article.id, 
        title: this.props.article.title, 
        subtitle: this.props.article.subtitle,
        text: this.props.article.text,
        selected_tags: this.props.article.tags,
        imageTodelete: this.props.article.images,
        
      });
    }

  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({disabled: false});
    }

    if (this.props.update && this.props.article !== prevProps.article  )
    {
      this.setState({
        id: this.props.article.id, 
        title: this.props.article.title, 
        subtitle: this.props.article.subtitle,
        text: this.props.article.text,
        selected_tags: this.props.article.tags,
        imageTodelete: this.props.article.images,
      });
    }


  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false
    });

    if (!result.cancelled) {
      this.setState({ images_path: this.state.images_path.concat(result.uri), images: this.state.images.concat(result) });
    }
  };

  _pickNewImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1
    });

    if (!result.cancelled) {
      this.setState({ images_path: this.state.images_path.concat(result.uri), images: this.state.images.concat(result) });
    }
  }; 


   _CreateArticle = ev => {
          ev.preventDefault();
          this.setState({disabled: true});

          var formData  = new FormData();
          formData.append("title",this.state.title);
          formData.append("subtitle",this.state.subtitle);
          formData.append("text",this.state.text);
          formData.append("tags",JSON.stringify(this.state.selected_tags));

          if (this.state.images.length > 0)
          {
             this.state.images.map( (image, index) => formData.append(`file${index}`, {
              name: image.fileName ? image.fileName : +new Date() + '_' + Math.floor((Math.random() * 10000000) + 1) + '.jpg',
              type: mime.lookup(image.uri),
              uri: image.uri
            }));
          }

         this.props.update ? this.props.update(this.state.id,formData) : this.props.create(formData);

      }

    onSelectedItemsChange = selected_tags => {
        this.setState({ selected_tags });
      };


    onDeleteImage = ev => {
        this.setState({ 
          images_path: this.state.images_path.filter(el => el !== ev),
          images: this.state.images.filter(el => el.uri !== ev),
       });
      };


  deleteMedia(key, type) {
      const item_to_remove = type; //images_url, videos_url, audios_url

      var data = { "id": this.state.id,
                   "title": this.state.title,
                   "text": this.state.text
                   }

      data[item_to_remove] = [key];
      this.props.onDeleteMedia(this.state.id, data);
    }


    onDeleteExistingImage = ev => {
        this.setState({ 
          imageTodelete: this.state.imageTodelete.filter(el => el.image !== ev),
       });
       this.deleteMedia(ev, "images_url");
      };

  render() {


    return (
      <ScrollView>


            {this.props.errors ?
            <ListErrors errors={this.props.errors}/> : null
            }

            <View>
                <TextInput
                style={{ height: 40 }}
                placeholder="Title"
                style={styles.inputText}
                onChangeText={(title) => this.setState({ title })}
                value={this.state.title}
                />

                <TextInput
                style={{ height: 40 }}
                placeholder="Sub Title"
                style={[styles.inputText, { height: 30 }]}
                onChangeText={(subtitle) => this.setState({ subtitle })}
                value={this.state.subtitle}
                />

                <TextInput
                style={{ height: 40 }}
                placeholder="Text"
                style={[styles.inputText, {height: Math.max(80, this.state.height)}]}
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
                multiline={true}
                onContentSizeChange={(event) => { this.setState({ height: event.nativeEvent.contentSize.height }) }}
                />

                <View>
                    <TagsList selectedItems={this.state.selected_tags} onSelectedItemsChange={this.onSelectedItemsChange} items={this.props.tags}/>
                </View>

                <View>
                    <Text>Add images:</Text>
                </View>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                    <View style={{ width: 150, margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon.Ionicons
                          name='md-camera'
                          size={110}
                          color='#2196f3'
                          onPress={this._pickNewImage}
                      />
                    </View>
                    <View style={{  width: 150, margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon.Ionicons
                            name='md-images'
                            size={110}
                            color='#2196f3'
                            onPress={this._pickImage}
                        />
                    </View>
                </View>

                <View style={styles.MainContainer}>
                    {this.state.imageTodelete &&
                        this.state.imageTodelete.map(key => { return (
                          <View key={key.image} style={styles.imagegroup}>
                            <Image style={styles.imageThumbnail} source={{ uri: key.image }} style={{ width: 120, height: 120 }} />
                            <Button title="Remove image" onPress={() => this.onDeleteExistingImage(key.image)}/>
                          </View>) })
                    }
                    {this.state.images_path &&
                        this.state.images_path.map(key => { return (
                          <View key={key} style={styles.imagegroup}>
                            <Image style={styles.imageThumbnail} source={{ uri: key }} style={{ width: 120, height: 120 }} />
                            <Button title="Remove image" onPress={() => this.onDeleteImage(key)}/>
                          </View>) })
                    }
                </View>

                <Button
                  style={{ marginTop: 5, marginBottom: 5 }}
                  onPress={this._CreateArticle}
                  title={this.props.update ? "Update Article" : "Create Article"}
                  color="#4caf50"
                  disabled={this.state.disabled} />
                
                { this.props.percent && this.props.percent !== 0 ?
                  <Progress.Bar progress={this.props.percent} width={null} /> : null
                }

            </View>

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  MainContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
  },
  imagegroup: {
        margin: 2,
  },
  imageThumbnail: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
  },
  inputText: {
        flex:1,
        marginTop: 10,
        height: 50,
        borderBottomColor: '#bbb',
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
  },
});