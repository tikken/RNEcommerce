import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

const FIREBASE = "https://trattattoo.firebaseio.com/products.json";
const FIREBASE_PATCH = "https://trattattoo.firebaseio.com/products";

export const fetchProducts = () => {
  return async dispatch => {
    //any middleware logic goes here
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
          "u1",
          respData[key].title,
          respData[key].imageUrl,
          respData[key].description,
          respData[key].price
        )
      );
    }
    // console.log(respData);
    dispatch({ type: SET_PRODUCTS, products: loadedProducts });
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
  return async dispatch => {
    //any middleware logic goes here
    const response = await fetch(FIREBASE, {
      method: "POST",
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
    const respData = await response.json();
    // console.log(respData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: respData.name,
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
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
