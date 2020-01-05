import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import productReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';

//assets
async function fetchFonts() {
    await Font.loadAsync({
        'louis': require('./assets/fonts/louis.ttf')
    });
};
//redux
const rootReducer = combineReducers({
    products: productReducer
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
