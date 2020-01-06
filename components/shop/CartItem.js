import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from "../../constants/colors";
import PropTypes from 'prop-types';

const CartItem = props => {
    return (
        <View style={S.cartItem}>
            <Text style={S.itemData}>
                <Text style={S.qnty}>{props.quantity} </Text>
                <Text style={S.text}>{props.title}</Text>
            </Text>
            <View style={S.itemData}>
                <Text style={S.text}>{props.price}</Text>

                {props.deletable && <TouchableOpacity onPress={props.onRemove} style={S.deleteButton}>
                    <Ionicons
                        size={23}
                        name={Platform.OS === 'adroid' ? 'md-trash' : 'ios-trash'} />
                </TouchableOpacity>}

            </View>
        </View>
    );
};

CartItem.propTypes = {
    quantity: PropTypes.number,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onRemove: PropTypes.func
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
        alignItems: 'center',
        justifyContent:'space-between'
    },
    quantity: {
        fontFamily: 'louis',
        color: colors.black,
        fontSize: 16
    },
    text: {
        fontFamily: 'louis',
        fontSize: 16,
        marginLeft: 10
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;