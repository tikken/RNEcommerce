import React from 'react';
import {
    View,
    Text,
    Platform,
    Image,
    StyleSheet,
    Dimensions,
    Button,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../../constants/colors";

const { width } = Dimensions.get('window');

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;

    if(Platform === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        //переходит в экран подробностей после нажатия на любое место по карточке
        <View style={S.touchable}>
            <View style={S.product}>
                <TouchableCmp onPress={props.onViewDetail} useForeground>
                    <View>
                        <View style={S.imageWrapper}>
                            <Image source={{ uri: props.image }} style={S.image} />
                        </View>
                        <View style={S.info}>
                            <Text style={S.title}>{props.title}</Text>
                            <Text style={S.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={S.actions}>
                            <Button
                                color={colors.primary}
                                title="Details"
                                onPress={props.onViewDetail} />
                            <Button
                                color={colors.primary}
                                title="Add to cart"
                                onPress={props.onAddToCart} />
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
};

const S = StyleSheet.create({
    imageWrapper: {
        height: '100%',
        borderRadius:10,
        overflow:'hidden'
    },
    info: {
        position: 'absolute',
        bottom: 50,
        left: 20
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    product: {
        shadowColor: 'black',
        shadowOpacity: .6,
        shadowOffset: {width:0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        width: width - 40,
        margin: 20,
        marginBottom: 5,
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: colors.gray
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    image: {
        height: '65%',
        width: '100%'
    }
});

ProductItem.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onViewDetail: PropTypes.func,
    onAddToCart: PropTypes.func
};

export default ProductItem;