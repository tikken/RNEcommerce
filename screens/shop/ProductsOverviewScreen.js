import React from 'react';
import { FlatList, Text, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import colors from "../../constants/colors";
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    return (
        <FlatList
            style={S.background}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', {
                            productTitle: itemData.item.title,
                            productId: itemData.item.id
                        });
                    }}
                    onAddToCart={() => {dispatch(cartActions.addToCart(itemData.item))}}
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price} />
            }>
        </FlatList>
    );
};

const S = StyleSheet.create({
    background: {
        backgroundColor: colors.gray
    }
});

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'LOUIS VUITTON',
        headerTintColor: 'black',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    color="black"
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                    iconName={'ios-cart'}
                    title="Cart"/>
            </HeaderButtons>
    }
};

export default ProductsOverviewScreen;