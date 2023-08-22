import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/Components/Store';
import App from './App';

// Mocking the Navigation component to isolate App component tests
jest.mock('./src/Components/Navigation', () => 'Navigation');

describe('<App />', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    );

    // This will check if the Navigation mock component is rendered within App.
    expect(getByText('Navigation')).toBeDefined();
  });

  // You can add more tests here depending on the functionality of your app
});
