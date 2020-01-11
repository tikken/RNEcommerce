import React from "react";
import {
  StyleSheet,
  FlatList,
  Button,
  Text,
  Alert,
  View,
  ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { deleteProduct } from "../../store/actions/products";
import colors from "../../constants/colors";

const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const uid = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  if (userProducts.length === 0) {
    return (
      <View style={S.centered}>
        <Text
          style={S.button}
          onPress={() => {
            props.navigation.navigate("EditProduct");
          }}
        >
          Add product
        </Text>
        <Text>No products created yet.</Text>
      </View>
    );
  }
  return (
    <View style={S.view} showsVerticalScrollIndicator={false}>
      <View style={S.wrapper}>
        <Text
          style={S.button}
          onPress={() => {
            props.navigation.navigate("EditProduct");
          }}
        >
          Add product
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={userProducts}
        renderItem={itemData => (
          <ProductItem
            onAddToCart={() => {}}
            onViewDetail={() => {}}
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
          >
            <Button
              color={colors.black}
              title='Edit'
              onPress={() =>
                props.navigation.navigate("EditProduct", {
                  productId: itemData.item.id
                })
              }
            />
            <Button
              color={colors.black}
              title='Delete'
              onPress={() => {
                dispatch(deleteProduct(itemData.item.id));
              }}
            />
          </ProductItem>
        )}
      ></FlatList>
    </View>
  );
};

const S = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    fontFamily: "louis",
    fontSize: 23
  },
  view: {
    height: "100%"
  },
  wrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    padding: 5
  }
});

export default UserProductScreen;
