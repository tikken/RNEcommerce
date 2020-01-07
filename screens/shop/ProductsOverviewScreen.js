import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import colors from "../../constants/colors";
import * as cartActions from '../../store/actions/cart';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    return (
        <View>
        <FlatList
            style={S.background}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetails', {
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
        </View>
    );
};

const S = StyleSheet.create({
    background: {
        backgroundColor: colors.gray
    }
});

export default ProductsOverviewScreen;