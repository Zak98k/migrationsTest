import { takeLatest } from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import * as userSaga from './UserSaga';

function* rootSaga() {
  yield takeLatest(ACTION.AUTH, userSaga.authSaga);
  yield takeLatest(ACTION.CREATE_ACCOUNT, userSaga.createAccount);
}

export default rootSaga;