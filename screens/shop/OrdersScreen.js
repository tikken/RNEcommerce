import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, Platform, ActivityIndicator, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import colors from "../../constants/colors";
import { fetchOrders } from "../../store/actions/orders";

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOrders()).then(() => setIsLoading(false));
  }, [dispatch]);

  if(isLoading) {
      return (
          <View style={S.centered}>
              <ActivityIndicator size="small" color="black" />
          </View>
      );
  }
  return (
    <FlatList
      style={S.background}
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          key={itemData.item.id}
          items={itemData.item.items}
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
        />
      )}
    ></FlatList>
  );
};

const S = StyleSheet.create({
  centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: "center"
  },  
  background: {
    backgroundColor: colors.gray
  }
});

export default OrdersScreen;
