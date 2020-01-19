import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from "react-native";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [picked, setPicked] = useState();

  async function askFormPermissions() {
    setIsFetching(true);
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert("Error", "No location access");
      return false;
    } else {
      return true;
    }
  }

  const getLocationHandler = async () => {
    const greenLight = await askFormPermissions();
    if (!greenLight) {
      return;
    }
    //stop trying to call after timeout
    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      console.log(location);
      setPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      setPicked(null);
    } catch (e) {
      console.log("failed to fetch location", e);
    }

    setIsFetching(false);
  };

  return (
    <View style={S.locationPicker}>
      <View style={S.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size='small' color='black' />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </View>
      <Button
        title='Get user location'
        color='black'
        onPress={getLocationHandler}
      />
    </View>
  );
};

const S = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
    width: '100%'
  },
  mapPreview: {
    marginBottom: 15,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LocationPicker;