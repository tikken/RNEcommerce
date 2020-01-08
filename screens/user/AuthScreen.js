import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
  Text,
  Button,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AuthScreen = props => {
  return (
    <View style={S.centered}>
      <LinearGradient style={S.gradient} colors={["#ffedff", "#ffe3ff"]}>
        <View style={S.centered}>
          <Text
            style={S.font}
            onPress={() => props.navigation.navigate("SignIn")}
          >
            Sign in
          </Text>
          <Text
            onPress={() => props.navigation.navigate("SignUp")}
            style={S.font}
          >
            Sign up
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const S = StyleSheet.create({
  font: {
    fontFamily: "louis"
  },
  gradient: {
    width: "100%",
    height: "100%"
  },
  centered: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default AuthScreen;