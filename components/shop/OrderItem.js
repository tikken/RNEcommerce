import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import colors from "../../constants/colors";
import CartItem from './CartItem';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={S.orderItem}>
            <View style={S.summary}>
                <Text style={S.totalAmount}>{props.amount.toFixed(2)}</Text>
                <Text style={S.date}>{props.date}</Text>
            </View>
            <View style={S.button}>
                <Button
                    color={colors.black}
                    onPress={() => {
                        setShowDetails(prevState => !prevState)
                    }}
                    title={showDetails ? "Hide Details" : "Show Details"} />
            </View>
            {showDetails &&
            <View>
                {props.items.map(cartItem =>
                    <CartItem
                        key={cartItem.productId}
                        title={cartItem.productTitle}
                        price={cartItem.productPrice}
                        amount={cartItem.sum}
                        quantity={cartItem.quantity} />)}
            </View>}
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