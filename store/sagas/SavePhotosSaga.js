import { delay } from 'redux-saga/effects';

function* savePhotoSaga() {
    yield delay(1000);
    console.log('saga1');
    yield delay(1000);
    console.log('saga2');
    yield delay(1000);
}


export default savePhotoSaga;