import React, { useState } from "react";
import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
//redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
//reducers
import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import photosReducer from "./store/reducers/photos";
//routes
import NavigatorContainer from "./navigation/NavigationContainer";
import { composeWithDevTools } from "redux-devtools-extension";
//sagas
import rootSaga from "./store/sagas/sagas";
import createSagaMiddleware from "redux-saga";

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
  auth: authReducer,
  photos: photosReducer
});
const sagaMiddleware = createSagaMiddleware();
const middleWares = [ReduxThunk, sagaMiddleware]
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);
sagaMiddleware.run(rootSaga)
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
      <NavigatorContainer />
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
