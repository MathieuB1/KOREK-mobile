import React, { Component } from 'react';
import { Button, TextInput, View, Text } from 'react-native';

import ListErrors from '../components/ListErrors';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  render() {
    return (
      <View>

        <View style={{ alignItems: 'center', backgroundColor: '#5CB85C' }}>
          <Text style={{ paddingTop: 100, fontSize: 50, color: 'white' }}>KOREK</Text>
          <Text style={{ paddingBottom: 100, color: 'white' }} >A place to share your media</Text>
        </View>

        {this.props.errors ?
        <ListErrors errors={this.props.errors}/> : null
        }
        
        <View style={{ alignItems: 'center', backgroundColor: 'white'}}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Insert username"
            onChangeText={(username) => this.setState({ username })}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Insert password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <View>
          <Button
            onPress={() => this.props.login(this.state.username, this.state.password)}
            title="Click here to login"
          />
        </View>
        <View style={{ alignItems: 'center', margin: 20 }}>
          <Button
            onPress={() => this.props.register()}
            title="Click here to register"
          />
        </View>
        
      </View>
    );
  }
}
