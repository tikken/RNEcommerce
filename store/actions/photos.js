export const CREATE_PHOTO = "CREATE_PHOTO";
export const FETCH_PHOTO = "FETCH_PHOTO";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";

import { insertPlace, fetchPlaces } from "../../helpers/db";

const FIREBASE = "https://trattattoo.firebaseio.com/photos";

export const createPhoto = (uri, id) => {
  //thunk will execute dispatch func after fetch func
  return async (dispatch, getState) => {
    let token = getState().auth.token;
    try {
      const dbResult = await insertPlace(
        "title",
        "newPath",
        "Dummy address",
        15.6,
        12.3
      );
    } catch (e) {
      console.log("error in sql", e);
    }
    //any middleware logic goes here
    const response = await fetch(`${FIREBASE}/${id}.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageUrl: uri,
        ownerId: id
      })
    });
    const respData = await response.json();
    // console.log(respData);
    dispatch({
      type: CREATE_PHOTO,
      photoData: {
        url: uri,
        uid: id
      }
    });
  };
};

export const fetchPhotos = () => {
  return async dispatch => {
    try {
      const dbRes = await fetchPlaces();
      dispatch({ type: SET_PLACE, places: [] });
      console.log(dbRes);
    } catch (e) {
      console.log(e);
    }
  };
};