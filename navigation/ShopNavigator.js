import React from 'react';
import { Platform } from 'react-native';
import colors from "../constants/colors";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import HeaderButton from "../components/ui/HeaderButton";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";

import {Ionicons} from '@expo/vector-icons';

//обьединяет внутренние рауты и сайдбар
const ShopNavigator = createDrawerNavigator({
    Products: {
        screen: ProductsOverviewScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Products',
            drawerIcon: drawerConfig =>
                <Ionicons
                    color={drawerConfig.tintColor}
                    size={23}
                    name={Platform.OS === 'android' ? 'md-albums' : 'ios-albums'} />
        })
    },
    Orders: {
        screen: OrdersScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Orders',
            drawerIcon: drawerConfig =>
                <Ionicons
                    color={drawerConfig.tintColor}
                    size={23}
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} />
        })
    },
    Cart: {
        screen: CartScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Cart',
            drawerIcon: drawerConfig =>
                <Ionicons
                color={drawerConfig.tintColor}
                size={23}
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} />
        })
    },
    Admin: {
        screen: UserProductsScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Admin',
            drawerIcon: drawerConfig =>
                <Ionicons
                    color={drawerConfig.tintColor}
                    size={23}
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} />
        })
    },
}, {
    drawerType: 'slide',
    drawerBackgroundColor: 'white',
    // overlayColor: colors.gray,
    contentOptions: {
        activeTintColor: colors.black,
        itemsContainerStyle: {
            width: '100%',
            position: 'absolute',
            top: 0
        }
    }
});


const stackContainer = createStackNavigator({
    defaultHome: ShopNavigator,
    ProductDetails: ProductDetailScreen
});

ShopNavigator.navigationOptions = navData => {
    return {
        headerTitle: 'LOUIS VUITTON',
        headerTintColor: 'black',
        headerStyle: {
        },
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    color="black"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    title="Orders"
                />
            </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    color="black"
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    title="Cart"/>
            </HeaderButtons>
    }
};

export default createAppContainer(stackContainer);