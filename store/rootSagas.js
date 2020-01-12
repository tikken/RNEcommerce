import { all, fork } from 'redux-saga/effects'

import savePhotosSaga from './sagas/SavePhotosSaga';

export default function* () {
  yield all([
    // comments
    fork(savePhotosSaga)
  ])
}
