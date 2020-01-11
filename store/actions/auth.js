import { AsyncStorage } from "react-native";

export const AUTH = "AUTH";

export const authenticate = (userId, token) => {
  return { type: AUTH, userId: userId, token: token };
};

export const signup = (email, password) => {
  // console.log("signup creator", email, password);
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBi5LFCDJl26zybD6V3_IPmBMzDpKL42y8",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error.message;

      throw new Error(errorMessage);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.localId, resData.idToken));
    //автологин
    const expire = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    savaDataToStorage(resData.idToken, resData.localId, expire);
  };
};

export const signin = (email, password) => {
  // console.warn("signin", email, password);
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBi5LFCDJl26zybD6V3_IPmBMzDpKL42y8",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error.message;

      throw new Error(errorMessage);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.localId, resData.idToken));
    //автологин
    const expire = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    savaDataToStorage(resData.idToken, resData.localId, expire);
  };
};

const savaDataToStorage = (token, userId, expire) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expire: expire.toISOString()
    })
  );
};
