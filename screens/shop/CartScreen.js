import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => state.cart.items);

    console.log(cartItems);

    return (
        <View style={S.screen}>
            <View style={S.summary}>
                <Text style={S.summaryText}>Total: <Text style={S.totalAmount}>${cartTotalAmount.toFixed(2)}</Text></Text>
                <Button title="Order now" disabled={cartTotalAmount === 0}/>
            </View>
           <View>
               <Text>Cart items:</Text>
           </View>

            <FlatList data={cartItems} keyExtractor={item => item.productId} />

        </View>
    );
};

CartScreen.navigationOptions = navData => {
    return {
        headerTitle: 'LOUIS VUITTON',
        headerTintColor: 'black'
    }
};


const S = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        padding: 10
    },
    summaryText: {},
    totalAmount: {},
});

export default CartScreen;