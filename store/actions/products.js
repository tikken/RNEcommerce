export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  //thunk will execute dispatch func after fetch func
  return async dispatch => {
    //any middleware logic goes here
    const response = await fetch(
      "https://trattattoo.firebaseio.com/products.json",
      {
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
      }
    );

    const respData = await response.json();

    console.log(respData);

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
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price
    }
  };
};
