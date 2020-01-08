export const ADD_ORDER = "ADD_ORDER";

const FIREBASE_POST = "https://trattattoo.firebaseio.com/orders";

export const addOrder = (cartItems, totalAmount) => {
  return async dispatch => {
    const date = new Date();
    const response = await fetch(
      `${FIREBASE_POST}/u1.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    if(!response.ok) {
      //failed orders analytics
      throw new Error('Failed to create an order');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: { 
        id: resData.id, 
        date: date,
        items: cartItems, 
        amount: totalAmount }
    });
  };
};
