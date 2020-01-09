import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { signup } from "../../../store/actions/auth";

const SignUpScreen = props => {
  const [value, setValues] = useState({});
  const dispatch = useDispatch();

  const submitHandler = (form, props) => {
      // console.warn(form);
      dispatch(signup(form.login, form.pass));
      //validation
      // props.navigation.navigate('Shop');
  };

  return (
    <View style={S.centered}>
      <View style={S.form}>
        <View style={S.formControl}>
          <Text style={S.label}>Login:</Text>
          <TextInput
            onChangeText={(val) => setValues({...value, login: val})}
            autoCapitalize='none'
            style={S.input}
          />
        </View>
        <View style={S.formControl}>
          <Text style={S.label}>Pass:</Text>
          <TextInput
            onChangeText={(val) => setValues({...value, pass: val})}
            secureTextEntry
            autoCapitalize='none'
            style={S.input}
          />
        </View>
        <View style={S.formControl}>
          <View style={S.button}>
            <Button
              title='Sign up'
              onPress={() => {
                submitHandler(value, props)
              }}
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

export default SignUpScreen;
