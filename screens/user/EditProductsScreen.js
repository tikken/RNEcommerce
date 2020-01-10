import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../store/actions/products";
import { createProduct } from "../../store/actions/products";

const EditProductScreen = props => {
  let pid = props.navigation.getParam("productId");
  const selected = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === pid)
  );
  const id = useSelector(state => console.log('edit screen', state.auth.userId));

  const [title, setTitle] = useState(selected ? selected.title : "");
  const [imageUrl, setImageUrl] = useState(selected ? selected.imageUrl : "");
  const [price, setPrice] = useState(selected ? `${selected.price}` : "");
  const [description, setDescription] = useState(
    selected ? selected.descr : ""
  );
  const dispatch = useDispatch();
  // console.log(selected);
  return (
    <ScrollView>
      <View style={S.form}>
        <View>
          <Text style={S.text}>
            {selected ? "Edit product" : "Add product"}
          </Text>
        </View>
        <View style={S.formControl}>
          <Text style={S.label}>Title:</Text>
          <TextInput
            onChangeText={text => setTitle(text)}
            value={title}
            style={S.input}
          />
        </View>
        <View style={S.formControl}>
          <Text style={S.label}>Image:</Text>
          <TextInput
            onChangeText={imageUrl => setImageUrl(imageUrl)}
            value={imageUrl}
            style={S.input}
          />
        </View>
        <View style={S.formControl}>
          <Text style={S.label}>Price:</Text>
          <TextInput
            onChangeText={price => setPrice(price)}
            value={price}
            style={S.input}
          />
        </View>
        <View style={S.formControl}>
          <Text style={S.label}>Description:</Text>
          <TextInput
            onChangeText={description => setDescription(description)}
            value={description}
            style={S.input}
          />
        </View>
        <View style={S.formControl}>
          <View style={S.button}>
            <Button
              onPress={() => {
                if (selected) {
                  dispatch(
                    updateProduct(pid, title, description, imageUrl, +price)
                  );
                  props.navigation.navigate("AdminProducts");
                } else {
                  dispatch(createProduct(title, description, imageUrl, +price, id));
                  props.navigation.navigate("AdminProducts");
                }
              }}
              title={"Save"}
            />
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
    textAlign: "center",
    fontSize: 20
  },
  form: {
    margin: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: "louis",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default EditProductScreen;
