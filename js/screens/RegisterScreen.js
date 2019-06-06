import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';

import ListErrors from '../components/ListErrors';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        firstname: '', 
        lastname: '', 
        username: '', 
        email: '', 
        password: '' };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>

        {this.props.errors ?
        <ListErrors errors={this.props.errors}/> : null
        }

        <TextInput
          style={{ height: 40 }}
          placeholder="First Name"
          onChangeText={(firstname) => this.setState({ firstname })}
        />

        <TextInput
          style={{ height: 40 }}
          placeholder="Last Name"
          onChangeText={(lastname) => this.setState({ lastname })}
        />

        <TextInput
          style={{ height: 40 }}
          placeholder="Username"
          onChangeText={(username) => this.setState({ username })}
        />

        <TextInput
          style={{ height: 40 }}
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />

        <TextInput
          style={{ height: 40 }}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button
          onPress={() => this.props.createUser(this.state)}
          title="Submit"
        />
      </View>
    );
  }
}
