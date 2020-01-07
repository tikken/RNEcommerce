import React from 'react';
import { StyleSheet,FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import colors from "../../constants/colors";

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);

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
                       onPress={() => { console.log('delete') }} />

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