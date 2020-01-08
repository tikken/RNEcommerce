import React from 'react';
import { ScrollView, StyleSheet, View, Keyboard, Text, Button } from 'react-native'

const AuthScreen = props => {
    return(
        <View style={S.centered}>
            <Text>Authorize please</Text>
            <Button title="Proceed" onPress={() => props.navigation.navigate('Shop')}/>
        </View>
    );
};

const S = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default AuthScreen;