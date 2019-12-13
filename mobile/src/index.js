import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {StatusBar, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

export default function index() {
  useEffect(() => {
    if (Platform.OS !== 'ios') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <App />
      </PersistGate>
    </Provider>
  );
}
