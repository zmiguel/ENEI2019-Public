import {
  DATA_AVAILABLE,
  API_LOGIN,
  CHECK_USER,
  LOGOUT_USER,
  USER_INFO,
  HOLD,
  GET_EVENTS,
  GET_CAREERS,
  CHANGE_GUEST,
  WAIT_CHANGE,
  GET_SESSIONS,
  SESSION_BLOCKS,
  TIMERWAIT_CHANGE,
  SIGN_SESSION,
  OPEN_MODAL,
  CLOSE_MODAL,
  LOADINGLOGIN,
  REMOVE_SESSION,
  UPDATE_USER,
  
} from "../actions/actionTypes"; //Import the actions types constant we defined in our actions

import { REHYDRATE } from "redux-persist";

let apiState = {
  isConnected: false,
  logged: false,
  onHold: true,
  user: {},
  events: [],
  showAlert: true,
  failedAttempt: false,
  userDetails: {
    username: "",
    password: "",
    token: {
      expirationDateToken: 0,
      access_token: "",
      refresh_token:""
    }
  },
  calendar: {},
  changingGuest: false,
  sessions: {},
  Blocks: {},
  onHoldBlocks: true,
  careerPath: { name: "Sem Career Path", color: "#eeeeee" },
  a: {},
  b: {},
  c: {},
  d: {},
  loadingLogin: false,
  alimentacao:[],
  acesso:[],
  alojamento:[]
};

const apiReducer = (state = apiState, action) => {
  switch (action.type) {
    case REHYDRATE:
      console.log(action);
      if (action.payload != undefined) {
        console.log(action.payload);

        var expirationDateTokenA = 0;
        var access_tokenA = "";
        var refresh_tokenA= "puta";

        if (action.payload.apiReducer.token != undefined) {
          if (
            action.payload.apiReducer.token.expirationDateToken !=
            undefined
          ) {
            expirationDateTokenA =
              action.payload.apiReducer.token.expirationDateToken;
          }

          if (
            action.payload.apiReducer.token.access_token !=
            undefined
          ) {
            access_tokenA =
              action.payload.apiReducer.token.access_token;
          }
          if (
            action.payload.apiReducer.token.refresh_token !=
            undefined
          ) {

            refresh_tokenA =
              action.payload.apiReducer.token.refresh_token;
          }
        }

        return {
          sessions: action.payload.apiReducer.sessions,
          // token: action.payload.apiReducer.token,
          user: action.payload.apiReducer.user,
          onHoldBlocks: true,
          userDetails: {
            token: {
              expirationDateToken: expirationDateTokenA,
              access_token: access_tokenA,
              refresh_token:refresh_tokenA,
            },
            username: action.payload.apiReducer.userDetails.username,
            password: action.payload.apiReducer.userDetails.password
          },
        token:action.payload.apiReducer.token
        };
      }

    case "CHANGE_CONNECTION_STATUS":
      return Object.assign({}, state, {
        isConnected: action.isConnected
      });

    case UPDATE_USER:
      state = Object.assign({}, state, { user:action.user});
      return state
    case LOADINGLOGIN:
      state = Object.assign({}, state, { loadingLogin: true });

    case HOLD:
      state = Object.assign({}, state, { onHold: true });
      return state;

    case API_LOGIN:
      state = Object.assign({}, state, {
        logged: action.logged,
        //token:action.token,
        failedAttempt: action.failedAttempt,
        user: action.user,
        userDetails: {
          token: action.token,
          username: action.userDetails.username,
          password: action.userDetails.password
        },
        loadingLogin: false,
        onHold: action.onHold,
        token:action.token
      });

      return state;

    case CHECK_USER:
      
      state = Object.assign({}, state, {
        logged: action.logged,
        onHold: action.onHold,
       // userDetails: u,
        token:action.token
      });

      return state;

    case LOGOUT_USER:
      state = Object.assign({}, state, {
        user: {},
        userDetails: {},
        token:{},
        logged: false
      });

      return state;

    case USER_INFO:
     
      state = Object.assign({}, state, {
        user: action.user,
        loggedIn: action.loggedIn,
        onHold: action.onHold,
        token: action.token
        
      });

      return state;

    case GET_EVENTS:
      state = Object.assign({}, state, {
        events: action.events,
        a: action.day1,
        b: action.day2,
        c: action.day3,
        d: action.day4,
        alimentacao: action.alimentacao,
        alojamento: action.alojamento,
        acesso:action.acesso

      });

      return state;

    case REMOVE_SESSION:
      state = Object.assign({}, state, {
        sessions: action.sessions,
        Blocks: action.Blocks,
        careerPath: action.careerPath,
        changingGuest: action.changingGuest,
        user: action.user
      });
      return state;

    case OPEN_MODAL:
      console.log("open modal");
      state = Object.assign({}, state, {
        modalOpen: true,
        modalInfo: action.modalInfo,
        modalType: action.type
      });
      return state;

    case CLOSE_MODAL:
      state = Object.assign({}, state, {
        modalOpen: false,
        modalInfo: "",
        type: ""
      });
      return state;

    case SIGN_SESSION:

      if(action.sessions==undefined ||  action.Blocks==undefined || action.user==undefined){
        state = Object.assign({}, state, {
        
          changingGuest: false,
      
        });
      }
      else{
        
           state = Object.assign({}, state, {
        sessions: action.sessions,
        Blocks: action.Blocks,
        careerPath: action.careerPath,
        changingGuest: false,
        user: action.user,
        a:action.day1,
        b:action.day2,
        c:action.day3,
        d:action.day4
      });
      }
  
    
      return state;

    case SESSION_BLOCKS:
      state = Object.assign({}, state, {
        Blocks: action.Blocks,
        onHoldBlocks: false,
        changingGuest: false
      });
      return state;

    case GET_CAREERS:
      var c = {
        guests: action.guests
      };
      state = Object.assign({}, state, { calendar: c });

      return state;

    case CHANGE_GUEST:
      state = Object.assign({}, state, {
        changingGuest: false,
        sessions: action.sessions,
        Blocks: action.Blocks,
        careerPath: action.careerPath
      });
      return state;

    case WAIT_CHANGE:
      state = Object.assign({}, state, { changingGuest: true });
      return state;

    case TIMERWAIT_CHANGE:
      state = Object.assign({}, state, { Blocks: true });
      return state;
    case GET_SESSIONS:
      state = Object.assign({}, state, {
        sessions: action.sessions,
        Blocks: action.Blocks,
        careerPath: action.careerPath
      });
      return state;
    default:
      return state;
  }
};
export default apiReducer;