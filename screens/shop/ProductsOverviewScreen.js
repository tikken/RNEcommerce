import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import colors from "../../constants/colors";
import * as cartActions from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  //triggers when the component wil be rendered
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);

    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [dispatch, loadProducts]);
  //fires loadProducts func before details route will be reached
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );
    //clean event subscription
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetails", {
      productTitle: title,
      productId: id
    });
  };

  if (error) {
    return (
      <View style={S.centered}>
        <Text style={S.font}>Failed to fetch products...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={S.centered}>
        <ActivityIndicator size='large' color='black' />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={S.centered}>
        <ActivityIndicator size='large' color='black' />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        showsVerticalScrollIndicator={false}
        style={S.background}
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
          >
            <Button
              color={colors.black}
              title='Details'
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={colors.black}
              title='Add to cart'
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
                // props.navigation.navigate('Cart');
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
    justifyContent: "center"
  },
  background: {
    backgroundColor: colors.gray
  },
  font: {
    fontSize: 20,
    fontFamily: "louis"
  }
});

export default ProductsOverviewScreen;
