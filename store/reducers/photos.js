import { CREATE_PHOTO, FETCH_PHOTO, ADD_PLACE, SAVE_PLACE } from "../actions/photos";

const initialState = {
    userPhotos: [],
    places: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PLACE: 
            return {
                places: action.places
            }
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