import { UI_LOGIN_PASSWORD_INPUT } from "../actions/actionTypes" //Import the actions types constant we defined in our actions

 
let uiState= {UI_loginPasswordInputActive:false, UI_loginPasswordInputInvalid:false}

const uiReducer = (state = uiState, action) => {
    
    switch(action.type){

        case UI_LOGIN_PASSWORD_INPUT:

            state=Object.assign({},state, { onHold:true });
            return state;

        default:
            return state;
    }
}
export default uiReducer;