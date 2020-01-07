import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView, Button} from 'react-native';
import { useSelector } from 'react-redux';

const EditProductScreen = props => {
    const pid = props.navigation.getParam('productId');
    const selected = useSelector(state => state.products.userProducts.find(prod => prod.id === pid));

    const [title, setTitle] = useState(selected ? selected.title : '');
    const [imageUrl, setImageUrl] = useState(selected ? selected.imageUrl : '');
    const [price, setPrice] = useState(selected ? `${selected.price}` : '');
    const [description, setDescription] = useState(selected ? selected.descr : '');
    // console.log(selected);
    return (
        <ScrollView>
            <View style={S.form}>
                <View>
                    <Text style={S.text}>{pid ? 'Edit product': 'Add product'}</Text>
                </View>
                <View style={S.formControl}>
                    <Text style={S.label}>Title:</Text>
                    <TextInput
                        onChangeText={text => setTitle(text)}
                        value={title}
                        style={S.input}/>
                </View>
                <View style={S.formControl}>
                    <Text style={S.label}>Image:</Text>
                    <TextInput
                        onChangeText={imageUrl => setImageUrl(imageUrl)}
                        value={imageUrl}
                        style={S.input}/>
                </View>
                <View style={S.formControl}>
                    <Text style={S.label}>Price:</Text>
                    <TextInput
                        onChangeText={price => setPrice(price)}
                        value={price}
                        style={S.input}/>
                </View>
                <View style={S.formControl}>
                    <Text style={S.label}>Description:</Text>
                    <TextInput
                        onChangeText={description => setDescription(description)}
                        value={description}
                        style={S.input}/>
                </View>
                <View style={S.formControl}>
                    <View style={S.button} >
                        <Button title={"Save"}/>
                    </View>
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