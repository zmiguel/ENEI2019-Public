import { UI_LOGIN_PASSWORD_INPUT ,UI_LOGIN_OPEN_SCANNER} from "../actions/actionTypes" //Import the actions types constant we defined in our actions

 
let uiState= {UI_loginPasswordInputActive:false, UI_loginPasswordInputInvalid:false, UI_loginScannerActive:false}

const uiReducer = (state = uiState, action) => {
    
    switch(action.type){

        case UI_LOGIN_PASSWORD_INPUT:

            state=Object.assign({},state, { onHold:true });
            return state;

        case UI_LOGIN_OPEN_SCANNER:
            state=Object.assign({},state, { UI_loginScannerActive:action.UI_loginScannerActive });
          
            return state;

        default:
            return state;
    }
}
export default uiReducer;