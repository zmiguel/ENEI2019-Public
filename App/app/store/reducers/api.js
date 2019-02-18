import { DATA_AVAILABLE, API_LOGIN, CHECK_USER, LOGOUT_USER, USER_INFO, HOLD, GET_EVENTS } from "../actions/actionTypes" //Import the actions types constant we defined in our actions

 
let apiState= { token:{valid:false}, tokenData:'error', logged:false, onHold:true, user:{}, events:[], failedAttempt:false}

const apiReducer = (state = apiState, action) => {
    
    switch(action.type){

        case HOLD:

            state=Object.assign({},state, { onHold:true });
            return state;

       case API_LOGIN:
     
            state=Object.assign({},state, { logged:action.logged, token:action.token, failedAttempt: action.failedAttempt});

            return state;

        case CHECK_USER:
        
            state=Object.assign({},state, { token:action.token, logged:action.logged, onHold:action.onHold});

            return state;

        case LOGOUT_USER:

             state=Object.assign({},state, { token:action.token, logged:false});

            return state;

        case USER_INFO:

            state=Object.assign({},state, { user: action.user , loggedIn:action.loggedIn, onHold:action.onHold});
            
            return state;
            
        case GET_EVENTS:

            state=Object.assign({},state, { events: action.events});
            
            return state;


        default:
            return state;
    }
}
export default apiReducer;