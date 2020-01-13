import React from 'react';
import * as Icon from '@expo/vector-icons';



export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color='#2196f3'
      />
    );
  }
}