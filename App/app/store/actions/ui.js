
import { GET_EVENTS, UI_LOGIN_OPEN_SCANNER } from "./actionTypes" //Import the actions types constant we defined in our actions



export function showLoginPasswordInput(user){
    return (dispatch)=>{

  dispatch({
    type: GET_EVENTS,
    events: events

});

}
}

export function openScannerLogin(){

  return (dispatch)=>{

dispatch({
  type: UI_LOGIN_OPEN_SCANNER,
  UI_loginScannerActive:true

});

}
}

export function closeLoginQRScan(){
  return (dispatch)=>{

    dispatch({
      type: UI_LOGIN_OPEN_SCANNER,
      UI_loginScannerActive:false
    
    });
}}
