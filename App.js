import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MapView, {Marker} from 'react-native-maps';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDMyUNS5Np3ktkGSlvqtWGWQaIXymyI7-o",
  authDomain: "maps-a6edf.firebaseapp.com",
  databaseURL: "https://maps-a6edf.firebaseio.com",
  projectId: "maps-a6edf",
  storageBucket: "",
  messagingSenderId: "1003443130092",
  appId: "1:1003443130092:web:af0825e2ed3289f035dfc9",
  measurementId: "G-ED8GXXRPXP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      firebaseCoords: null,
    };
    this.coords = firebase.database().ref().child('coords');
  }

  componentWillMount(){
    setInterval(()=>this.coords.on('value', data=>{
      this.setState({
        firebaseCoords: data.val()
      })
    }),10000 )
    
  }

  render() {
    console.log(this.state.firebaseCoords)
    return (
      <View style={styles.container}>
          
        {this.state.firebaseCoords ?
        <MapView
        ref={ref=>myMap =ref}
        style={styles.map}
        initialRegion={{
          latitude: this.state.firebaseCoords.latitude,
          longitude: this.state.firebaseCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.1
        }}>
        <Marker
        coordinate={{
          latitude: this.state.firebaseCoords.latitude,
          longitude: this.state.firebaseCoords.longitude
        }}
        title={"Zmona yra cia"}
        onPress={()=>myMap.fitToCoordinates([{
          latitude: this.state.firebaseCoords.latitude,
          longitude: this.state.firebaseCoords.longitude
        }],{
            animated: true
        })}
        />
        </MapView>
        : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  map:{
    width: 500,
    height: 500,
  }
});