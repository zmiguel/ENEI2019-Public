import { DATA_AVAILABLE, API_LOGIN, CHECK_USER, LOGOUT_USER, USER_INFO, HOLD, GET_EVENTS, GET_CAREERS, CHANGE_GUEST, WAIT_CHANGE, GET_SESSIONS } from "../actions/actionTypes" //Import the actions types constant we defined in our actions
import { REHYDRATE } from 'redux-persist';
 
let apiState= { 

    isConnected:false, 
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
    calendar:{

    },
    changingGuest:false,
    sessions:{}
    
}

const apiReducer = (state = apiState, action) => {
    
    switch(action.type){

        case REHYDRATE:

            console.log( action.payload)

            var expirationDateTokenA=0;
            var access_tokenA='';

            if(action.payload.apiReducer.userDetails.token!=undefined){
            
                if(action.payload.apiReducer.userDetails.token.expirationDateToken!= undefined){
            
                    expirationDateTokenA= action.payload.apiReducer.userDetails.token.expirationDateToken;
                }
        
                if((action.payload.apiReducer.userDetails.token.access_token!= undefined)){

                    access_tokenA= action.payload.apiReducer.userDetails.token.access_token;

                }
        
            }
            
            return {
                
               // token: action.payload.apiReducer.token,
                user: action.payload.apiReducer.user,
               
                 userDetails:{
                        token:{
                            expirationDateToken: expirationDateTokenA, 
                            access_token:access_tokenA,
                        
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
                //token:action.token, 
                failedAttempt: action.failedAttempt, 
                user:action.user, 
                userDetails: {token:action.token, username:action.userDetails.username, password:action.userDetails.password},
                
                
            });

            return state;

        case CHECK_USER:

           var u=  action.userDetails;
           if(action.token!=undefined)
           u.token= action.token;

            state=Object.assign({},state, {logged:action.logged, onHold:action.onHold, userDetails:u });

            return state;

        case LOGOUT_USER:

             state=Object.assign({},state, { logged:false});

            return state;

        case USER_INFO:

            state=Object.assign({},state, { user: action.user , loggedIn:action.loggedIn, onHold:action.onHold});
            
            return state;
            
        case GET_EVENTS:

            state=Object.assign({},state, { events: action.events});
            
            return state;
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        case GET_CAREERS:
            var c= {
                guests:action.guests
            }
            state=Object.assign({},state, { calendar:c });

            return state;
        
        case CHANGE_GUEST:
            state=Object.assign({},state, { changingGuest:false});
            return state;   

        case WAIT_CHANGE:
            state=Object.assign({},state, { changingGuest:true});
            return state; 

        case GET_SESSIONS:
            state=Object.assign({},state, { changingGuest:false, sessions:action.sessions});
            return state; 
        default:
            return state;
    }
}
export default apiReducer;