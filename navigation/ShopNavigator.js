import React from "react";
import { Platform, Button } from "react-native";
import colors from "../constants/colors";

import {
  createAppContainer,
  NavigationActions,
  createSwitchNavigator
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CartScreen from "../screens/shop/CartScreen";
import HeaderButton from "../components/ui/HeaderButton";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "./SideMenu";
//screens
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import EditProductScreen from "../screens/user/EditProductsScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import AuthScreen from "../screens/user/AuthScreen";
import SignInScreen from "../screens/user/auth/SignInScreen";
import SignUpScreen from "../screens/user/auth/SignUpScreen";
import StartUpScreen from "../screens/StartupScreen";
import UserPhotosScreen from "../screens/user/UserPhotosScreen";
//обьединяет внутренние рауты и сайдбар
const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsOverviewScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Products",
        drawerIcon: drawerConfig => (
          <Ionicons
            color={drawerConfig.tintColor}
            size={23}
            name={Platform.OS === "android" ? "md-albums" : "ios-albums"}
          />
        )
      })
    },
    Orders: {
      screen: OrdersScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Orders",
        drawerIcon: drawerConfig => (
          <Ionicons
            color={drawerConfig.tintColor}
            size={23}
            name={Platform.OS === "android" ? "md-list" : "ios-list"}
          />
        )
      })
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Cart",
        drawerIcon: drawerConfig => (
          <Ionicons
            color={drawerConfig.tintColor}
            size={23}
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          />
        )
      })
    },
    EditProduct: {
      screen: EditProductScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Edit product",
        drawerIcon: drawerConfig => (
          <Ionicons
            color={drawerConfig.tintColor}
            size={23}
            name={Platform.OS === "android" ? "md-create" : "ios-create"}
          />
        )
      })
    },
    AdminProducts: {
      screen: UserProductsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Admin products",
        drawerIcon: drawerConfig => (
          <Ionicons
            color={drawerConfig.tintColor}
            size={23}
            name={Platform.OS === "android" ? "md-create" : "ios-create"}
          />
        )
      })
    },
    Photos: {
      screen: UserPhotosScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Photos",
        drawerIcon: drawerConfig => (
          <Ionicons
            color={drawerConfig.tintColor}
            size={23}
            name={Platform.OS === "android" ? "md-albums" : "ios-albums"}
          />
        )
      })
    }
  },
  {
    drawerType: "slide",
    drawerBackgroundColor: "white",
    // overlayColor: colors.gray,
    contentComponent: SideMenu,
    contentOptions: {
      activeTintColor: colors.black,
      itemsContainerStyle: {
        width: "100%",
        position: "absolute",
        top: 0
      }
    }
  }
);

ShopNavigator.navigationOptions = navData => {
  return {
    headerTitle: "LOUIS VUITTON",
    headerTintColor: "black",
    headerStyle: {},
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color='black'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          title='Orders'
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color='black'
          onPress={() => {
            navData.navigation.navigate("Photos");
          }}
          iconName={Platform.OS === "android" ? "md-camera" : "ios-camera"}
          title='Photo'
        />
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

const WholeShopNavigator = createStackNavigator({
  defaultHome: ShopNavigator,
  ProductDetails: ProductDetailScreen
});

const MainNavigator = createSwitchNavigator({
  Splash: StartUpScreen,
  Auth: AuthScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  Shop: WholeShopNavigator
});

export default createAppContainer(MainNavigator);
