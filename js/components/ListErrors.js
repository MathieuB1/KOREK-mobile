import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ListErrors extends React.Component {
  render() {
    const errors = this.props.errors;
    if (errors) {
      return (
        <View>
          {
            Object.keys(errors).map(key => {
              return (
                <Text style={styles.ErrorContainer} key={key}>
                  {key} : {errors[key]}
                </Text>
              );
            })
          }
        </View>
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;

const styles = StyleSheet.create({
  ErrorContainer: {
        textAlign: 'center',
        color: 'red',
  },
});