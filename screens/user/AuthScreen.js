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
import Gradient from '../../components/ui/Gradient';

const AuthScreen = props => {
  return (
    <View style={S.centered}>
      <Gradient>
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
      </Gradient>
    </View>
  );
};

const S = StyleSheet.create({
  font: {
    fontFamily: "louis"
  },
  centered: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default AuthScreen;