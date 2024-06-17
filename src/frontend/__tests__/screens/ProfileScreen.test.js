import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../../screens/ProfileScreen';
import { Provider } from 'react-redux';
import store from '../../redux/store';
describe('ProfileScreen', () => {
    const route = { params: { id: 1 } };
    const navigation = { pop: jest.fn(), navigate: jest.fn()};
    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render( 
            <Provider store={store}>
                <ProfileScreen route={route} navigation={navigation}/>
            </Provider>
        );
        // Check if the placeholders are present
       // Check if the placeholders are present
       expect(getByPlaceholderText('Add notes here...')).toBeTruthy();
       expect(getByPlaceholderText('Add address here...')).toBeTruthy();

       // Check if the text elements are present
       expect(getByText('Notes')).toBeTruthy();
       expect(getByText('Add Photo(s)')).toBeTruthy();
    })
});