import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const SignInScreen = props => {
  return (
    <View style={S.centered}>
      <View style={S.form}>
        <View style={S.formControl}>
          <Text style={S.label}>Login:</Text>
          <TextInput
            onChangeText={() => console.log("focused")}
            autoCapitalize='none'
            style={S.input}
          />
        </View>
        <View style={S.formControl}>
          <Text style={S.label}>Pass:</Text>
          <TextInput
            secureTextEntry
            onChangeText={() => console.log("focused2")}
            autoCapitalize='none'
            style={S.input}
          />
        </View>
        <View style={S.formControl}>
          <View style={S.button}>
            <Button
              title='Sign in'
              onPress={() => props.navigation.navigate("Shop")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const S = StyleSheet.create({
  centered: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: 20
  },
  text: {
    textAlign: "center",
    fontSize: 20
  },
  form: {
    margin: 20,
    padding: 20,
    width: "100%"
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: "louis",
    marginVertical: 8
  },
  input: {
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default SignInScreen;
