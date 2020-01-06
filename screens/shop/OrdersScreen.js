import React from 'react';
import {FlatList, StyleSheet, Text, Platform} from 'react-native';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import colors from "../../constants/colors";

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return(
        <FlatList
            style={S.background}
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <OrderItem
                    items={itemData.item.items}
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate} />
            }>
        </FlatList>
    );
};

const S = StyleSheet.create({
    background: {
        backgroundColor: colors.gray
    }
});

export default OrdersScreen;