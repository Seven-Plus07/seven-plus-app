import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/Components/Store';
import App from './App';

// Modify the mock to return a Text component with "Navigation" text
jest.mock('./src/Components/Navigation', () => {
  return function DummyNavigation() {
    return <text>Navigation</text>;
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

  // You can add more tests here depending on the functionality of your app
});
