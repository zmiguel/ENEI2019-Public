import { DATA_AVAILABLE, API_LOGIN, CHECK_USER, LOGOUT_USER, USER_INFO, HOLD, GET_EVENTS } from "../actions/actionTypes" //Import the actions types constant we defined in our actions
import { REHYDRATE } from 'redux-persist';
 
let apiState= { 

    isConnected:false, 
    token:{valid:false}, 
    tokenData:'error', 
    logged:false, 
    onHold:true,user:{}, 
    events:[], 
    failedAttempt:false,
    userDetails:{
        username:'', 
        password:'',
        token:{
            expirationDateToken:0,
            access_token:''
        }
    },
    
}

const apiReducer = (state = apiState, action) => {
    
    switch(action.type){

        case REHYDRATE:

        console.log( action.payload)

              return {
        
                user: action.payload.apiReducer.user,
               
                 userDetails:{
                     token:{
                         expirationDateToken:action.payload.apiReducer.userDetails.token.expirationDateToken, 
                         access_token:action.payload.apiReducer.userDetails.token.access_token,
                        
                        },
                        username:action.payload.apiReducer.userDetails.username,
                        password:action.payload.apiReducer.userDetails.password
                    }
              };
        case 'CHANGE_CONNECTION_STATUS':
             return Object.assign({}, state, {
            isConnected: action.isConnected,
          });

        case HOLD:

            state=Object.assign({},state, { onHold:true });
            return state;

       case API_LOGIN:
          
   
            state=Object.assign({},state, { 
                logged:action.logged, 
                token:action.token, 
                failedAttempt: action.failedAttempt, 
                user:action.user, 
                userDetails: {token:action.token, username:action.userDetails.username, password:action.userDetails.password},
                
                
            });

            return state;

        case CHECK_USER:
        
            state=Object.assign({},state, { token:action.token,logged:action.logged, onHold:action.onHold});

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