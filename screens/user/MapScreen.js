import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Permissions from "expo-permissions";
import LocationPicker from "../../components/shop/LocationPicker";

const MapScreen = props => {
  return (
    <View style={S.wrap}>
        <LocationPicker />
    </View>
  );
};

const S = StyleSheet.create({
    wrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});

export default MapScreen;
