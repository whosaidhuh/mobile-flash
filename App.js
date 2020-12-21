import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers/index';
import TabNavigator from './navigation/TabNavigator'
import { setLocalNotification } from './utils/helpers';

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default function App() {

  useEffect(() => {
    setLocalNotification();
  },[]);

  return (
    <Provider store={store}>
      <TabNavigator/>
    </Provider>
  );
}
