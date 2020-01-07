import React from 'react';
import { StyleSheet,FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import colors from "../../constants/colors";
import * as productsAction from '../../store/actions/products'
import {deleteProduct} from "../../store/actions/products";

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    return (
       <FlatList
           showsVerticalScrollIndicator={false}
           keyExtractor={item => item.id}
           data={userProducts}
           renderItem={itemData =>
               <ProductItem
                   onAddToCart={() => {}}
                   onViewDetail={() => {}}
                   image={itemData.item.imageUrl}
                   title={itemData.item.title}
                   price={itemData.item.price}>

                   <Button
                       color={colors.black}
                       title="Edit"
                       onPress={() => { console.log('edit') }} />
                   <Button
                       color={colors.black}
                       title="Delete"
                       onPress={() => { dispatch(deleteProduct(itemData.item.id)) }} />

               </ProductItem>
           }>
       </FlatList>
    );
};

const S = StyleSheet.create({
    wrapper: {
        width: '100%',
        flex: 1
    }
});

export default UserProductScreen;