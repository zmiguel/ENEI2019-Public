import { createStore, applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';
 
import reducers from './reducers/index'; //Import the reducer
 

import {persistStore, persistReducer} from 'redux-persist'

import {AsyncStorage} from 'react-native'

const persistConfig={

  key:'root' ,
  storage: AsyncStorage,




}

const persistedReduzer= persistReducer(persistConfig, reducers);
// Connect our store to the reducers
export const store = createStore(persistedReduzer, applyMiddleware(thunk));

export const persistor=persistStore(store);