import {  } from "../actions/actionTypes" //Import the actions types constant we defined in our actions

 
let uiState= { }

const uiReducer = (state = apiState, action) => {
    
    switch(action.type){

        case HOLD:

            state=Object.assign({},state, { onHold:true });
            return state;

        default:
            return state;
    }
}
export default uiReducer;