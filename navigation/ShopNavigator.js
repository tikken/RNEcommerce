import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import colors from "../constants/colors";

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS = 'Android' ? colors.primary : ''
        },
        headerTintColor: Platform.OS = 'Android' ? 'white' : colors.primary
    }
});

export default createAppContainer(ProductsNavigator);