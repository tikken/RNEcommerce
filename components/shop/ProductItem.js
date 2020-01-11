import React from "react";
import {
  View,
  Text,
  Platform,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import colors from "../../constants/colors";

const { width } = Dimensions.get("window");

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    //переходит в экран подробностей после нажатия на любое место по карточке
    <View style={S.touchable}>
      <View style={S.product}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={S.imageWrapper}>
              <Image source={{ uri: props.image }} style={S.image} />
            </View>
            <View style={S.info}>
              <Text style={S.title}>{props.title}</Text>
              <Text style={S.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={S.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const S = StyleSheet.create({
  imageWrapper: {
    height: "100%",
    overflow: "hidden",
    alignItems: "center"
  },
  info: {
    position: "absolute",
    bottom: 40,
    left: 20
  },
  touchable: {
    flex: 1,
    overflow: "hidden",
    width: "100%"
  },
  product: {
    backgroundColor: "white",
    height: 250,
    width: width - 40,
    margin: 20,
    marginBottom: 5,
    paddingBottom: 10
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "louis"
  },
  price: {
    fontSize: 14,
    color: colors.black,
    fontFamily: "louis"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "absolute",
    bottom: 0,
    fontFamily: "louis",
    left: 10
  },
  image: {
    height: "65%",
    width: "100%",
    position: "absolute",
    top: -10
  }
});

ProductItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onViewDetail: PropTypes.func,
  onAddToCart: PropTypes.func
};

export default ProductItem;
