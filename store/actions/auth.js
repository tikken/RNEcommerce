export const SIGNUP = "SIGNUP";

export const signup = (email, password) => {

  console.log('action creator', email, password);

  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBi5LFCDJl26zybD6V3_IPmBMzDpKL42y8",
      {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true
          })
      }
    );

    if(!response.ok) {
        throw new Error('Failed to reach firebase auth')
    }

    const resData = response.json();
    console.log(resData);
    dispatch({ type: SIGNUP });
  };
};