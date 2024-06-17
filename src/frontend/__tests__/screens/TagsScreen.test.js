import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import TagsScreen from '../../screens/TagsScreen';
import store from '../../redux/store'; // Adjust the import path as needed

describe('TagsScreen', () => {
  test('renders TagsScreen component', async () => {
    render(
      <Provider store={store}>
        <TagsScreen />
      </Provider>
    );
  });
});
