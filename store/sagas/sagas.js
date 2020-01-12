import { put, takeEvery, all } from "redux-saga/effects";
const delay = ms => new Promise(res => setTimeout(res, ms));

//basic function
export function* helloSaga() {
  console.log("Hello Sagas!");
}
//increment
export function* incrementAsync() {
  console.log("start");
  yield delay(1000);
  console.log("done");
}

export function* watchIncrementAsync() {
  console.log('saga')  
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}