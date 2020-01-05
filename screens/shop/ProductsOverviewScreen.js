import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import colors from "../../constants/colors";

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);

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
                    onAddToCart={() => {console.log('add to cart')}}
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

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'LOUIS VUITTON',
    headerTintColor: 'black'
};

export default ProductsOverviewScreen;