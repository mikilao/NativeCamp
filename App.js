import React from 'react';
import Main from './Components/MainComponent';
import {Provider} from 'react-redux';
import {ConfigureStore} from './Redux/configStore';

const store = ConfigureStore()

export default function App() {
  return (
    <Provider store={store}>
    <Main />
  </Provider>
  );
}

