import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Platform, StyleSheet, View, Dimensions, Text } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";

export class MapScreen extends Component {

    parse_lat(location) {
      return parseFloat(location[location.length-1].coords.split(' ')[2].replace('(',''))
    }

    parse_lon(location) {
      return parseFloat(location[location.length-1].coords.split(' ')[1].replace('(',''))
    }

  constructor(props) {
    super(props);
    this._isMounted = false;


    this.state = {
      latitude: this.parse_lat(this.props.locations),
      longitude: this.parse_lon(this.props.locations),

      mylocation: null,
      errorMessage: null,
      intervalId: null
    };
  }



  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._isMounted = true;
      this._getLocationAsync();
      this._interval = setInterval(() => { this._getLocationAsync() }, 15000);
    }
    
  }

  componentDidUpdate(prevProps) {

        if (prevProps.trackedInfo && prevProps.trackedInfo != this.props.trackedInfo) {
          const item_track_location = this.props.trackedInfo.tracked_article;
          this.setState({ latitude: this.parse_lat(item_track_location.locations), 
                          longitude: this.parse_lon(item_track_location.locations) });
        }
  }

  componentWillUnmount () {
    this._isMounted = false;
    clearInterval(this._interval);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this._isMounted && this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let mylocation = await Location.getCurrentPositionAsync({});

    this.props.getTrackedArticle(this.props.id);

    this._isMounted && this.setState({ mylocation: mylocation });
  };
  
  render() {

    let mylocation = null;
    if (this.state.errorMessage) {
      mylocation = null;
    } else if (this.state.mylocation) {
      mylocation = JSON.parse(JSON.stringify(this.state.mylocation));
    }

    return (
      <View>

      <View style={styles.container}>

      </View>

      <View style={styles.container}>
      
        <MapView style={styles.mapStyle} initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta:0.001,
          longitudeDelta: 0.001
          }}> 
          
        <MapView.Marker
            coordinate={{ "latitude": this.state.latitude,
                          "longitude": this.state.longitude }}
            title={this.props.title.split('-')[0]}
          />

        { (mylocation) ?
        <MapView.Marker pinColor='green'
            coordinate={{ "latitude": mylocation.coords.latitude,
                          "longitude": mylocation.coords.longitude }}
            title={"me"}
          /> : null }

     </MapView>
      </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
        trackedInfo: state.trackedInfo
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

