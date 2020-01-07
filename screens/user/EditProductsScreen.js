import React, {useState, useReducer} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView, Button, Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {updateProduct} from "../../store/actions/products";
import {createProduct} from "../../store/actions/products";
import Input from '../../components/ui/Input';

const INPUT_UPDATE = 'INPUT_UPDATE';

const formReducer = (state, action) => {

    console.warn('reducer',state, action)

    if(action.type === INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true;

        for(const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        
        return {
            ...state,
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }

    return state;
};

const EditProductScreen = props => {
    let pid = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === pid));
    const dispatch = useDispatch();
    //validation
    const [formState, dispatchForm] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct.title ? editedProduct.title : '',
            imageUrl: editedProduct.imageUrl ? editedProduct.imageUrl : '',
            price: editedProduct.price ? editedProduct.price : '',
            descr: editedProduct.descr ? editedProduct.descr : ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            descr: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    const inputChangeHandler = (inputIdentifier, inputValue, inputValidity) => {

        console.log('inputChangeHandler',inputIdentifier, inputValue, inputValidity);

        dispatchForm({type: INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputIdentifier})
    };

    // console.log(selected);

    return (
        <ScrollView>
        <View style={S.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            initiallyValid={!!editedProduct}
            initialValue={editedProduct ? `${editedProduct.price}` : ''}
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
        <View style={S.formControl}>
            <View style={S.button} >
                <Button
                    onPress={() => {
                        console.log('submited edited');
                        
                        // if(editedProduct) {
                        dispatch(updateProduct(
                                pid, 
                                formState.inputValues.title, 
                                formState.inputValues.descr, 
                                formState.inputValues.imageUrl, 
                                +formState.inputValues.price))
                                props.navigation.navigate('AdminProducts');
                        // } else {
                        // console.log('create edited');
                        // dispatch(createProduct(
                        //         formState.inputValues.title, 
                        //         formState.inputValues.descr, 
                        //         formState.inputValues.imageUrl, 
                        //         +formState.inputValues.price))
                        //     props.navigation.navigate('AdminProducts');
                        // }
                    }}
                    title={"Save"}/>
            </View>
        </View>
      </ScrollView>
    );
};

const S = StyleSheet.create({
    button: {
        margin: 20
    },
    text: {
        textAlign:'center',
        fontSize: 20
    },
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'louis',
        marginVertical:8
    },
    input: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;