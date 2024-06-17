import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import AddressInput from '../../../components/profile screen/AddressInput';
import store from '../../../redux/store';

test('AddressInput', () => {
    let component = (
            <Provider store={store}>
                <AddressInput id={1} />
            </Provider>
        );
    const { getByPlaceholderText } = render(component);
    expect(getByPlaceholderText('Add address here...')).toBeTruthy();
});