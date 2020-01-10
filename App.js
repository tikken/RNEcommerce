import React, { useState } from "react";
import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
//redux
import { createStore, combineReducers, applyMiddleware } from "redux";
//saga
import createSagaMiddleware from 'redux-saga'

import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
//reducers
import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
//routes
import ShopNavigator from "./navigation/ShopNavigator";
import { composeWithDevTools } from "redux-devtools-extension";
//assets
async function fetchFonts() {
  await Font.loadAsync({
    louis: require("./assets/fonts/louis.ttf")
  });
}
//redux settings
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});
const store = createStore(
  rootReducer,
  composeWithDevTools(),
  applyMiddleware(ReduxThunk)
);
//main component
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle='dark-content' />
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
