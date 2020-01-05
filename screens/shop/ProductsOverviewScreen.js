import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = () => {
    const products = useSelector(state => state.products.availableProducts);

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    onViewDetail={() => {console.log('view details')}}
                    onAddToCart={() => {console.log('add to cart')}}
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price} />
            }>
        </FlatList>
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All products'
};

export default ProductsOverviewScreen;