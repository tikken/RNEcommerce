import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View,Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import colors from "../../constants/colors";
import * as cartActions from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    //triggers when the component wil be rendered
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productTitle: title,
            productId: id
        });
    };

    return (
        <View>
        <FlatList
            style={S.background}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}>
                    <Button
                        color={colors.black}
                        title="Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }} />
                    <Button
                        color={colors.black}
                        title="Add to cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                            // props.navigation.navigate('Cart');
                        }} />
                </ProductItem>
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