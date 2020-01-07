import React from 'react';
import {StyleSheet, FlatList, Button, Text, Platform, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { deleteProduct } from "../../store/actions/products";
import colors from "../../constants/colors";

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    return (
        <View>
            <View style={S.wrapper}>
                <Text
                    style={S.button}
                    onPress={() => {props.navigation.navigate('EditProduct')}}>Add product</Text>
            </View>

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
                           onPress={() => props.navigation.navigate('EditProduct', { productId: itemData.item.id })} />
                       <Button
                           color={colors.black}
                           title="Delete"
                           onPress={() => { dispatch(deleteProduct(itemData.item.id)) }} />

                   </ProductItem>
               }>
           </FlatList>
        </View>
    );
};

const S = StyleSheet.create({
    wrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        width: 100,
        padding: 5
    }
});

export default UserProductScreen;