import { CREATE_PHOTO, FETCH_PHOTO } from "../actions/photos";

const initialState = {
    userPhotos: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PHOTO: 
            return {
               userPhotos: action.photos
            }
        case FETCH_PHOTO: 
            console.log('reducer', state, action);
            return {
                userPhotos: action.uid
            }    
    }
    return state;
};