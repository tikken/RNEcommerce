import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import colors from "../../constants/colors";

const OrderItem = props => {
    return (
        <View style={S.orderItem}>
            <View style={S.summary}>
                <Text style={S.totalAmount}>{props.amount.toFixed(2)}</Text>
                <Text style={S.date}>{props.date}</Text>
            </View>
            <View style={S.button}>
                <Button
                    color={colors.black}
                    title="Show Details" />
            </View>
        </View>
    );
};

OrderItem.propTypes = {
    amount: PropTypes.number.isRequired,
    date: PropTypes.string
};

const S = StyleSheet.create({
    button: {
      marginTop: 20
    },
    orderItem: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    totalAmount: {
        fontFamily: 'louis',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        color: colors.black
    }
});

export default OrderItem;