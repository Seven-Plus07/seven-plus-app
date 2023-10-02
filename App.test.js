import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/Components/Store';
import App from './App';

// Modify the mock to return a Text component with "Navigation" text
jest.mock('./src/Components/Navigation', () => {
  const { Text } = require('react-native');  // Importa Text dentro del mock
  return function DummyNavigation() {
    return <Text>Navigation</Text>;
  };
});


describe('<App />', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    );

    expect(getByText('Navigation')).toBeDefined();
  });
});

