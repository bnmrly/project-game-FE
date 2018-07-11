import { combineReducers } from "redux";
import playerInfoReducer from './playerInfoReducer';
export default combineReducers({ playerInfo: playerInfoReducer });
