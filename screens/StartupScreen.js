import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData) {
                props.navigation.navigate("Auth");
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expire } = transformedData;

            const expireDate = new Date(expire)
            if(expireDate <= new Date || !token || !userId) {
                props.navigation.navigate("Auth");
                return;
            }

            props.navigation.navigate('Shop');
            dispatch(authenticate(userId, token));
        }

        tryLogin()
    }, [dispatch]);

    return (
        <View style={S.scree}>
            <ActivityIndicator size="large" color="black" />
        </View>
    );
};

const S = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;