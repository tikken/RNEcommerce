import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
//redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
//reducers
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from "./store/reducers/orders";
//routes
import ShopNavigator from './navigation/ShopNavigator';

//assets
async function fetchFonts() {
    await Font.loadAsync({
        'louis': require('./assets/fonts/louis.ttf')
    });
};
//redux settings
const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    orders: ordersReducer
});

const store = createStore(rootReducer);

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if(!fontLoaded) {
        return <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={err => console.log(err)}
        />
    }

    return (
       <Provider store={store}>
          <ShopNavigator />
       </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
