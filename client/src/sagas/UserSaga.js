import { put } from "redux-saga/effects";
import ACTION from "../actions/actiontsTypes";
import {registration, auth, getUserIdListener, getDataFromTokenListener} from "../api/rest/restContoller";

export function* loginSaga({login}) {
    const { userName, password, navigate } = login;
    yield put({ type: ACTION.CURRENT_USER_REQUEST });
    try {
        const { data } = yield auth(login);
        yield put({ type: ACTION.CURRENT_USER_RESPONSE, token: data});
        if (!data) {navigate('/reg');}
        const { token } = data;
        localStorage.setItem("token", token);
        navigate('/contest');
    } catch (e) {
        yield put({ type: ACTION.CURRENT_USER_ERROR, error: e });
    }
}

export function* createAccount({createAccountData}) {
    yield put({ type: ACTION.CURRENT_USER_REQUEST });
    try {
        const { data } = yield registration(createAccountData);
        yield put({ type: ACTION.CREATE_USER_REQUEST, currentUser: data });
    } catch (e) {
        yield put({ type: ACTION.CURRENT_USER_ERROR, error: e });
    }
}

export function* getUserId() {
    yield put({ type: ACTION.GET_USER_REQUEST });
    try {
        const token = localStorage.getItem("token");
        yield getDataFromTokenListener(token);

        const { data } = yield getUserIdListener();

        yield put({ type: ACTION.GET_USER_RESPONSE, userId: data });
    } catch (e) {
        yield put({ type: ACTION.GET_USER_ERROR, error: e });
    }
}