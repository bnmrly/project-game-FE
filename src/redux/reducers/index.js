import { combineReducers } from "redux";
import wallet from "./cardSelection";
import id   from './idSelector';
export default combineReducers({ wallet,id });
