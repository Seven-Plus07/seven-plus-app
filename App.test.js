// Mock de @react-native-community/netinfo
jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(() => Promise.resolve({
    isConnected: true,
  })),
}));

import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

jest.mock('./src/Components/Navigation', () => 'Navigation');


describe('<App />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
