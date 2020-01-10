import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

const FIREBASE = "https://trattattoo.firebaseio.com/products.json";
const FIREBASE_PATCH = "https://trattattoo.firebaseio.com/products";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    //any middleware logic goes here
    const userId = getState().auth.userId;
    const response = await fetch(FIREBASE);

    if (!response.ok) {
      throw new Error("something went wrong with firebase");
    }

    const respData = await response.json();
    const loadedProducts = [];

    for (const key in respData) {
      loadedProducts.push(
        new Product(
          key,
          respData[key].ownerId,
          respData[key].title,
          respData[key].imageUrl,
          respData[key].description,
          respData[key].price
        )
      );
    }
    const obj = {
      type: SET_PRODUCTS,
      products: loadedProducts,
      userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
    }

    obj.userProducts.forEach((item) => {
      if(item.ownerId === userId) {
        console.log(item)
      }
    } )
    // console.warn(respData);
    dispatch(obj);
  };
};

export const deleteProduct = id => {
  return async (dispatch, getState) => {
    let token = getState().auth.token;

    await fetch(`${FIREBASE_PATCH}/${id}.json?auth=${token}`, {
      method: "DELETE"
    });

    dispatch({ type: DELETE_PRODUCT, pid: id });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  //thunk will execute dispatch func after fetch func
  return async (dispatch, getState) => {
    let token = getState().auth.token;
    let userId = getState().auth.userId;

    console.warn('createProduct action creator', userId);
    //any middleware logic goes here
    const response = await fetch(`${FIREBASE_PATCH}.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      })
    });
    const respData = await response.json();
    // console.log(respData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: respData.name,
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        ownerId: userId
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  //получает текущий стэйт
  return async (dispatch, getState) => {
    let token = getState().auth.token;

    await fetch(`${FIREBASE_PATCH}/${id}.json?auth=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    });
    //will be executed
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
      }
    });
  };
};
