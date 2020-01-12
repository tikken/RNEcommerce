export const CREATE_PHOTO = "CREATE_PHOTO";
export const FETCH_PHOTO = "FETCH_PHOTO";
export const INCREMENT_ASYNC = "INCREMENT_ASYNC";

const FIREBASE = "https://trattattoo.firebaseio.com/photos";

export const createPhoto = (uri, id) => {
    //thunk will execute dispatch func after fetch func
    return async (dispatch, getState) => {
      let token = getState().auth.token;
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
  return { type: INCREMENT_ASYNC }
  // console.log('fetch photos action created');
  // return { type: FETCH_PHOTO, photos: photos };
};