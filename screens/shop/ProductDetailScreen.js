import React from "react";
import {
  Image,
  Text,
  Button,
  View,
  StyleSheet,
  ScrollView,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import colors from "../../constants/colors";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/ui/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const ProductDetailScreen = ({ navigation }) => {
  const productId = navigation.getParam("productId");
  const product = useSelector(state =>
    state.products.availableProducts.find(item => item.id === productId)
  );
  const dispatch = useDispatch();
  // console.log(product);
  return (
    <ScrollView>
      <Image style={S.image} source={{ uri: product.imageUrl }} />
      <View style={S.actions}>
        <Button
          color={colors.black}
          title='Add to cart'
          onPress={() => {
            dispatch(cartActions.addToCart(product));
          }}
        />
      </View>

      <Text style={S.price}>${product.price.toFixed(2)}</Text>
      <Text style={S.descr}>{product.descr}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
    headerTintColor: colors.black,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color='black'
          onPress={() => {
            navData.navigation.goBack();
          }}
          iconName={Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"}
          title='Back'
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color='black'
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          title='Cart'
        />
      </HeaderButtons>
    )
  };
};

const S = StyleSheet.create({
  actions: {
    marginVertical: 10,
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 300
  },
  price: {
    fontSize: 20,
    color: colors.black,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "louis"
  },
  descr: {
    fontSize: 14,
    marginHorizontal: 20,
    textAlign: "center",
    fontFamily: "louis"
  }
});

ProductDetailScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default ProductDetailScreen;
