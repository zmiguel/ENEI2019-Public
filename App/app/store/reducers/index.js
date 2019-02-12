import { combineReducers } from 'redux';

import uiReducer from "./ui";
import apiReducer from "./api";

 
// Combine all the reducers
const rootReducer = combineReducers({
    apiReducer, uiReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;