import { takeLatest } from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import * as userSaga from './UserSaga';

function* rootSaga() {
  yield takeLatest(ACTION.LOGIN, userSaga.loginSaga);
  yield takeLatest(ACTION.CREATE_ACCOUNT, userSaga.createAccount);
  yield takeLatest(ACTION.GET_USER_ID, userSaga.getUserId);
}

export default rootSaga;