import { combineReducers } from 'redux';
import userReducer from './userReducer';

const appReducer = combineReducers({
  userReducer
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
