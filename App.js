import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers/index';
import { getDecks } from './utils/api';
import DeckList from './components/DeckList';


const store = createStore(reducer, applyMiddleware(thunk, logger));

export default function App() {

  const [data, setData]= useState('');

  useEffect(() => {
    getDecks().then(result => {
      setData(() => ({
        result
      }));
    });
  });

  return (
    <Provider store={store}>
      <View style={styles.container}>
          <DeckList />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
