import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import { fetchPlaces } from "../../helpers/db";

const delay = ms => new Promise(res => setTimeout(res, ms));

//basic function
export function* helloSaga() {
  console.log("Hello Sagas!");
}
//increment
export function* onSavePlace() {
  console.log("saga start");
  const res = yield fork(fetchPlaces)
  yield delay(5000)

}

export function* watchIncrementAsync() {
  console.log('saga init');  
  yield takeEvery("SAVE_PLACE", onSavePlace);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}