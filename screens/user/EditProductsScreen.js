import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';

const EditProductScreen = props => {
    const pid = props.navigation.getParam('productId');

    console.log(pid);

    return (
        <View>
            <Text>The edit product screen {pid ? pid : 'nope'} </Text>
        </View>
    );
};

const S = StyleSheet.create({

});

export default EditProductScreen;