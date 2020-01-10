import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import { signup } from "../../../store/actions/auth";
import { LinearGradient } from "expo-linear-gradient";
import Gradient from "../../../components/ui/Gradient";

const SignUpScreen = props => {
  const [value, setValues] = useState({});
  const [error, setError] = useState();
  const [loading, setIsLoading] = useState();
  const dispatch = useDispatch();

  const submitHandler = async (form, props) => {
    setIsLoading(true);
    try {
      setError(null);
      await dispatch(signup(form.login, form.pass));
      setIsLoading(false);
      props.navigation.navigate("Shop");
    } catch (e) {
      setError(e);
      setIsLoading(false);
      console.log(e);
    }
  };

  let message;
  if (error) {
    message = error.message;
  }

  useEffect(() => {
    if (error) {
      // Alert.alert("Wrong credits!");
      Alert.alert("Caution!", message, [
        { text: "Retry", onPress: () => setIsLoading(false) }
      ]);
    }
  }, [error]);

  return (
    <Gradient>
      <View style={S.centered}>
        <View style={S.form}>
          <View style={S.formControl}>
            <Text style={S.label}>Login:</Text>
            <TextInput
              onChangeText={val => setValues({ ...value, login: val })}
              autoCapitalize='none'
              style={S.input}
            />
          </View>
          <View style={S.formControl}>
            <Text style={S.label}>Pass:</Text>
            <TextInput
              onChangeText={val => setValues({ ...value, pass: val })}
              secureTextEntry
              autoCapitalize='none'
              style={S.input}
            />
          </View>
          <View style={S.formControl}>
            <View style={S.button}>
              {loading ? (
                <ActivityIndicator size='small' color='black' />
              ) : (
                <Button
                  title='Sign up'
                  onPress={() => {
                    submitHandler(value, props);
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </Gradient>
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