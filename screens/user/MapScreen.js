import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MapView from "react-native-maps";

const MapScreen = props => {
  const mapRegion = {
    latitude: 59.56,
    longitude: 30.18,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  const selectLocation = event => {
      console.log(event)
  };
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.mapStyle} 
        region={mapRegion}
        onPress={selectLocation}
      >
        <MapView.Marker
          coordinate={mapRegion}
          title='Title'
          description='Description'
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

export default MapScreen;
