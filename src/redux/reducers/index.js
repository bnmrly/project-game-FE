import { combineReducers } from "redux";
import playerMetaDataReducer from './playerMetaDataReducer';
import playerFinancialReducer from './playerFinancialInfoReducer';
export default combineReducers({ playerMetaData: playerMetaDataReducer, playerFinancialInfo: playerFinancialReducer });
