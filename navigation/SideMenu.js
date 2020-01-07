import {NavigationActions} from "react-navigation";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import React, {Component} from 'react';

const styles = StyleSheet.create({
    sectionHeadingStyle: {
        fontSize: 20,
        marginLeft: 10
    },
    navSectionStyle: {
        margin: 5
    },
    navItemStyle: {
        margin: 5
    }
});

class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });

        this.props.navigation.dispatch(navigateAction);
    }

    render () {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.sectionHeadingStyle} onPress={() => console.log('pressed')}>
                            Mortal
                        </Text>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Products')}>
                               Products
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Cart')}>
                                Cart
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Orders')}>
                                Orders
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.sectionHeadingStyle}>
                            Immortal
                        </Text>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('EditProduct')}>
                                EditProduct
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('DeleteProduct')}>
                                DeleteProduct
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Text>This is my fixed footer</Text>
                </View>
            </View>
        );
    }
}

export default SideMenu;