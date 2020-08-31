import React from 'react';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import * as Localization from 'expo-localization';
import i18n from './constants/strings';

import AppNavigator from './navigator/AppNavigator'
import milkReducer from './store/reducers/milk'
import pooReducer from './store/reducers/poo'
import weightReducer from './store/reducers/weight'
import authReducer from './store/reducers/auth'

i18n.locale = Localization.locale;
i18n.fallbacks = true;

const rootReducer = combineReducers({
  milk: milkReducer,
  poo: pooReducer,
  weight: weightReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
