{/*import 'react-native-gesture-handler'*/}
import React from 'react';
import Navigation from './src/Components/Navigation'; // Verifica la ruta correcta a Navigation
import { Provider } from 'react-redux';
import store from './src/Components/Store';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>

  );
}

export default App;

