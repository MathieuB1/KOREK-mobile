import React from 'react';
import { View, Text, Image, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ListErrors from '../components/ListErrors';

import * as Progress from 'react-native-progress';
import * as mime from 'react-native-mime-types';

export default class SettingScreen extends React.Component {

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
            password: '',
            disable: false,
        };
    }


    componentDidMount() {
        if (this.props.profileInfo.userRegister)
        {
            this.setState({ 
                        user_id: this.props.profileInfo.userRegister.id,
                        first_name: this.props.profileInfo.userRegister.first_name,
                        last_name: this.props.profileInfo.userRegister.last_name,
                        username: this.props.profileInfo.userRegister.username,
                        email: this.props.profileInfo.userRegister.email
                        })
        }
    }

  componentDidUpdate(prevProps) {
    if (this.props.profileInfo !== prevProps.profileInfo) {
      this.setState({disabled: false});
    }
  }

   _updateMySettings = ev => {
        ev.preventDefault();
        this.setState({disabled: true});

        var formData  = new FormData();
        formData.append("first_name",this.state.first_name);
        formData.append("last_name",this.state.last_name);
        formData.append("username",this.state.username);
        formData.append("email",this.state.email);

        var logout = false;
        if (this.state.password != '') { 
            logout = true; 
            formData.append("password",this.state.password); 
        }

        if (this.state.image.uri)
        {
            formData.append(`file`, { name: this.state.image.fileName ? this.state.image.fileName : new Date().toDateString().replace(/ /g, "_") + '.jpg',
                type: mime.lookup(this.state.image.uri),
                uri: this.state.image.uri});
        }

        if (this.state.username !== this.props.profileInfo.userRegister.username )
        {
            logout = true; 
        }

        this.props.update(formData, this.state.user_id, logout);
    }



    _getImagefromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false
        });

        if (!result.cancelled) {
            this.setState({ image_path: result.uri, image: result });
        }
    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */
        return <ScrollView>

                    {this.props.errors ?
                    <ListErrors errors={this.props.errors}/> : null
                    }


                    {this.props.profileInfo.userProfile ?
                        <View>
                            <View style={{
                                            marginTop: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>      
                                <TouchableOpacity onPress={()=>this._getImagefromGallery()}>
                                    <Image 
                                    source={{uri: this.state.image_path ? this.state.image_path: this.props.profileInfo.userProfile.image}}
                                    style={{ borderRadius:5, width: 70, height: 70 }}/>
                                </TouchableOpacity>
                                <Text style={{ marginBottom: 5 }}>Total Articles: {this.props.profileInfo.userProfile.products}</Text>
                            </View>
                            
                            <View style={styles.TagContainer}>
                                {this.props.profileInfo.userProfile.tags.filter(el => el.total !== 0).map(el => 
                                <View style={styles.TagsContainer} key={el.tags__name}>
                                    <Text style={styles.TagsName}>{el.tags__name}</Text>
                                    <Text style={styles.TagsTotalContainer}>{el.total}</Text>
                                </View>)}
                            </View>

                        </View>
                    : null}

                    {this.props.profileInfo.userRegister ?
                        <View>
                            <Text>My Profile:</Text>
                            <TextInput
                                placeholder="First Name"
                                onChangeText={(first_name) => this.setState({first_name})}
                                style={[styles.inputText, { height: 30 }]}
                                value={this.state.first_name}
                            />

                            <TextInput
                                placeholder="Last Name"
                                onChangeText={(last_name) => this.setState({last_name})}
                                style={[styles.inputText, { height: 30 }]}
                                value={this.state.last_name}
                            />

                            <TextInput
                                placeholder="Username"
                                onChangeText={(username) => this.setState({username})}
                                style={styles.inputText}
                                value={this.state.username}
                            />

                            <TextInput
                                placeholder="Email"
                                onChangeText={(email) => this.setState({email})}
                                style={styles.inputText}
                                value={this.state.email}
                            />

                            <TextInput
                                placeholder="Change Password"
                                onChangeText={(password) => this.setState({password})}
                                style={styles.inputText}
                                secureTextEntry={true}
                                style={[styles.inputText, { height: 40 }]}
                                value={this.state.password}
                            />

                            <Button
                            style={{ marginTop: 10, marginBottom: 5 }}
                            onPress={this._updateMySettings}
                            title="Update Settings"
                            color="#4caf50"
                            disabled={this.state.disabled}/>

                            { this.props.percent && this.props.percent !== 0 ?
                            <Progress.Bar progress={this.props.percent} width={null} /> : null
                            }

                        </View> 

                    : null}
               </ScrollView> ;
    }
}


const styles = StyleSheet.create({
  TagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
  },
  TagsContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
        backgroundColor: '#007bff',
        borderRadius: 2,
        padding: 3,
  },
  TagsName: {
        color: 'white',
  },
  TagsTotalContainer: {
        marginLeft: 2,
        backgroundColor: 'black',
        color: 'white',
        paddingLeft: 3,
        paddingRight: 3,
  },
  inputText: {
        flex:1,
        marginTop: 5,
        marginBottom: 5,
        height: 50,
        borderBottomColor: '#CCC',
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
  },
});