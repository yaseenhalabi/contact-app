import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

jest.mock('expo-font', () => ({
  useFonts: () => [true, false],
}));

jest.mock('../redux/store', () => ({
  getState: jest.fn(),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
}));

jest.mock('react-native-paper/react-navigation', () => {
  return {
    createMaterialBottomTabNavigator: jest.fn().mockReturnValue({
      Navigator: ({ children }) => <>{children}</>,
      Screen: ({ children }) => <>{children}</>,
    }),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({ children }) => <>{children}</>,
  };
});

jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: jest.fn().mockReturnValue({
      Navigator: ({ children }) => <>{children}</>,
      Screen: ({ children }) => <>{children}</>,
    }),
  };
});

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: ({ children }) => <>{children}</>,
  };
});

test('renders App component', () => {
  const { getByTestId } = render(<App />);
  // expect(getByTestId('app-component')).toBeTruthy();
  // expect(getByTestId('tab-bar')).toBeTruthy();
  // expect(getByTestId('people-screen')).toBeTruthy();
  // expect(getByTestId('tags-screen')).toBeTruthy();
  // expect(getByTestId('status-bar')).toBeTruthy();
});
