import * as action from '../actions/photos';

const initialState = {
    photos: []
};

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case SAVE_PHOTO: {
            const urlObj = {
                url: action.url
            }
            return {
                ...state,
                photos: state.photos.concat(action.url)
            }
        }
    }
};