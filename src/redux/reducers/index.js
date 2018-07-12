import { combineReducers } from "redux";
import playerMetaDataReducer from "./playerMetaDataReducer";
import playerFinancialReducer from "./playerFinancialInfoReducer";
import gameProgressReducer from "./gameProgressReducer";
export default combineReducers({
  playerMetaData: playerMetaDataReducer,
  playerFinancialInfo: playerFinancialReducer,
  gameProgress: gameProgressReducer
});
