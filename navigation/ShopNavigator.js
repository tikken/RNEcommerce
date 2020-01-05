import React from 'react';
import { Platform } from 'react-native';
import colors from "../constants/colors";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

//router
const ProductsNavigator = createStackNavigator({
    //routes          //screens
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS = 'Android' ? colors.primary : ''
        },
        headerTintColor: Platform.OS = 'Android' ? 'white' : colors.primary
    }
});

export default createAppContainer(ProductsNavigator);