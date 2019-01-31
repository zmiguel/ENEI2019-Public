import { combineReducers } from 'redux';
 
import { DATA_AVAILABLE, API_LOGIN, CHECK_USER, LOGOUT_USER, USER_INFO } from "../actions/" //Import the actions types constant we defined in our actions

 
let dataState = { data: [], loading:true ,token:true};
 
const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading:false });
            return state;
        default:
            return state;
    }
};

let apiState= {token:false, tokenData:'error', loggedIn:false, onHold:true, user:{}}

const apiReducer = (state = apiState, action) => {
    
    switch(action.type){

       case API_LOGIN:
     
            state=Object.assign({},state, { loggedIn:action.loggedIn, tokenData:action.tokenData , token:action.token});
            return state;

        case CHECK_USER:
        
            state=Object.assign({},state, { token:action.token, tokenData:action.tokenData, onHold:false});

            return state;

        case LOGOUT_USER:

             state=Object.assign({},state, { token:action.token, tokenData:action.tokenData, loggedIn:action.loggedIn});

            return state;

        case USER_INFO:

            state=Object.assign({},state, { user: action.user });
            
            return state;


        default:
            return state;
    }
}


 
// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer, apiReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;