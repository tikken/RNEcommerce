import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailScreen = ({navigation}) => {
    const productId = navigation.getParam('productId');
    const product = useSelector(state => state.products.availableProducts.find(item => item.id === productId));

    return (
        <View>
            <Text>
                {product.descr}
            </Text>
            <Text>
                {product.price}
            </Text>
        </View>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};

const S = StyleSheet.create({

});

export default ProductDetailScreen;