{/*import 'react-native-gesture-handler'*/}
import React from 'react';
import Navigation from './src/Components/Navigation'; // Verifica la ruta correcta a Navigation
import { Provider } from 'react-redux';
import store from './src/Components/Store';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';

Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure(config);

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>

  );
}

export default App;

