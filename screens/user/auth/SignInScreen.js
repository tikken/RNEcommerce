import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignInScreen = props => {
    return (
        <View style={S.form}>
            <View style={S.formControl}>
                <Text style={S.header}>Authorization</Text>
            </View>
            <View style={S.formControl}>
                <Text style={S.label}>Login:</Text>
            <TextInput 
                onChangeText={() => console.log('focused')}
                autoCapitalize="none"
                style={S.input}/>
            </View>
            <View style={S.formControl}>
                <Text style={S.label}>Pass:</Text>
            <TextInput 
                secureTextEntry
                onChangeText={() => console.log('focused2')}
                autoCapitalize="none"
                style={S.input}/>
            </View>
            <View style={S.formControl}>
                <View style={S.button}>
                    <Button 
                        title="Sign in" 
                        onPress={() => props.navigation.navigate('Shop')}/>
                </View>
            </View>
        </View>
    );
};

const S = StyleSheet.create({
    form: {},
    formControl: {},
    input: {},
    label: {}
});

export default SignInScreen;