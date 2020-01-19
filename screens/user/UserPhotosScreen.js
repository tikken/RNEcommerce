import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, StyleSheet, Image, Button, Alert } from "react-native";
import { createPhoto, fetchPhotos } from "../../store/actions/photos";
import LocationPicker from "../../components/shop/LocationPicker";

async function askFormPermissions() {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );
  if (status !== "granted") {
    Alert.alert("Error", "No camera access");
    return false;
  } else {
    return true;
  }
}

const UserPhotosScreen = props => {
  const userPlaces = useSelector(state => state);

  // console.warn('store places', userPlaces);

  const dispatch = useDispatch();
  const uid = useSelector(state => state.auth.userId);
  //when screen loads we are fetching items from db
  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const takePhoto = async () => {
    const hasPermissions = await askFormPermissions();
    if (!hasPermissions) {
      return;
    }
    //камера
    const img = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
      aspect: [16, 9]
    });

    setImage(img.uri);
    dispatch(createPhoto(img.uri, uid));
  };

  const [image, setImage] = useState(null);

  return (
    <View style={S.wrapper}>
      <LocationPicker />
      <Button title='+' onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={S.image} />}
    </View>
  );
};

const S = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10
  }
});

export default UserPhotosScreen;
