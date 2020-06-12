import React from 'react';
import Main from './Components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './Redux/configStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './Components/LoadingComponent';

const { persistor, store } = ConfigureStore()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate //pt 5 prevents the app from rendering in data is rehydrated
        loading={<Loading />}
        persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

