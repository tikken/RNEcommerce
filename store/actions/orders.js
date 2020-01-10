import Order from "../../models/order";

const FIREBASE_POST = "https://trattattoo.firebaseio.com/orders";

export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();

    const response = await fetch(`${FIREBASE_POST}/${userId}.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      })
    });

    if (!response.ok) {
      //failed orders analytics
      throw new Error("Failed to create an order");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.id,
        date: date,
        items: cartItems,
        amount: totalAmount
      }
    });
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const loadedOrders = [];

    try {
      const response = await fetch(`${FIREBASE_POST}/${userId}.json?auth=${token}`);
      if (!response.ok) {
        throw new Error("failed to reach the firebase server");
      }
      const resData = await response.json();
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
    } catch (e) {
      console.log("failed to fetch orders");
    }

    dispatch({ type: FETCH_ORDERS, orders: loadedOrders });
  };
};
