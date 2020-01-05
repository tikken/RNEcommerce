import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from "../../constants/colors";

const CartItem = props => {
    return (
        <View style={S.cartItem}>
            <Text style={S.itemData}>
                <Text style={S.qnty}>Quantity:</Text>
                <Text style={S.text}>Title:</Text>
            </Text>
            <View style={S.itemData}>
                <Text style={S.text}>$</Text>
                <TouchableOpacity onPress={props.onRemove} style={S.deleteButton}>
                    <Ionicons
                        size={23}
                        name={Platform.OS === 'adroid' ? 'md-trash' : 'ios-trash'} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const S = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'louis',
        color: colors.black,
        fontSize: 16
    },
    text: {
        fontFamily: 'louis',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;