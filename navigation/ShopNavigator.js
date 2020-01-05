import React from 'react';
import { Platform } from 'react-native';
import colors from "../constants/colors";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

//router
const ProductsNavigator = createStackNavigator({
    //routes          //screens
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS = 'Android' ? colors.primary : ''
        },
        headerTintColor: Platform.OS = 'Android' ? 'white' : colors.primary,
        headerTitleStyle: {
            fontFamily: 'louis',
            fontSize: 20
        }
    }
});

export default createAppContainer(ProductsNavigator);