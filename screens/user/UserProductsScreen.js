import React from 'react';
import {StyleSheet, FlatList, Button, Text, Alert, View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { deleteProduct } from "../../store/actions/products";
import colors from "../../constants/colors";

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const allProducts = useSelector(state => state.products.availableProducts);
    
    const uid = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();
    
    let a = userProducts.length
    let b = allProducts.length

    // userProducts.forEach((item) => {
    //     console.log(item.ownerId)
    // })

    // allProducts.forEach((item) => {
    //     console.warn(item.ownerId)
    // })

    console.log(a,b, uid);

    // console.warn(uid);
    // console.warn(a, b);

    return (
        <View
            style={S.view}
            showsVerticalScrollIndicator={false}>
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
                           onPress={() => {
                               dispatch(deleteProduct(itemData.item.id))
                           }} />

                   </ProductItem>
               }>
           </FlatList>
        </View>
    );
};

const S = StyleSheet.create({
    view: {
        height: '100%'
    },
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