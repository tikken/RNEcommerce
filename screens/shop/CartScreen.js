import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import colors from "../../constants/colors";
import *  as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }

        return transformedCartItems.sort((a,b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    return (
        <View style={S.screen}>
            <View style={S.summary}>
                <Text style={S.summaryText}>
                    Total:{' '}
                    <Text style={S.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button
                    color={colors.black}
                    title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
                    }}
                />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        price={itemData.item.productPrice}
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                    />
                )}
            />
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