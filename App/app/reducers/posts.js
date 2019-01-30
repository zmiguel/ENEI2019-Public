import createReducer from '../Helpers/createReducer'
import * as types from '../actions/types'

export const currentPost = createReducer({}, {
  [types.SET_POST](state, action) {
    return action;
  }
});