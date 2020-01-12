import { CREATE_PHOTO } from "../actions/photos";

const initialState = {
    userPhotos: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PHOTO: 
            return {
               userPhotos: action.photos
            }
    }
    return state;
};