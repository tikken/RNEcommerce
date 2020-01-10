import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Gradient = props => {
  return (
    <LinearGradient style={S.gradient} colors={["#ffedff", "#ffe3ff"]}>
      {props.children}
    </LinearGradient>
  );
};

const S = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "100%"
  }
});

export default Gradient;
