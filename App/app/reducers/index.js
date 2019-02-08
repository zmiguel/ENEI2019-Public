import { combineReducers } from 'redux';
 
import { DATA_AVAILABLE, API_LOGIN, CHECK_USER, LOGOUT_USER, USER_INFO, HOLD, GET_EVENTS } from "../actions/" //Import the actions types constant we defined in our actions

 
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

let apiState= { token:{valid:false}, tokenData:'error', logged:false, onHold:true, user:{}, events:[]}

const apiReducer = (state = apiState, action) => {
    
    switch(action.type){

        case HOLD:

            state=Object.assign({},state, { onHold:true });
            return state;

       case API_LOGIN:
     
            state=Object.assign({},state, { logged:action.logged, token:action.token});

            return state;

        case CHECK_USER:
        
            state=Object.assign({},state, { token:action.token, logged:action.logged, onHold:action.onHold});

            return state;

        case LOGOUT_USER:

             state=Object.assign({},state, { token:action.token, logged:false});

            return state;

        case USER_INFO:

            state=Object.assign({},state, { user: action.user, token: action.token , loggedIn:action.loggedIn, onHold:action.onHold});
            
            return state;
            
        case GET_EVENTS:

            state=Object.assign({},state, { events: action.events});
            
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