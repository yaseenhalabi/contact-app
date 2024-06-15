import React from 'react';
import TagScreen from './TagsScreen';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import store from '../redux/store';

// Test if the search input is rendered
test('renders search input', () => {
    render(
        <Provider store={store}>
            <TagScreen />
        </Provider>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeTruthy();
});

// Test if the "+ New Tag" button is rendered
test('renders "+ New Tag" button', () => {
    render(
        <Provider store={store}>
            <TagScreen />
        </Provider>
    );
    const newTagButton = screen.getByText('+ New Tag');
    expect(newTagButton).toBeTruthy();
});
// Test if the tag input is rendered when "+ New Tag" button is pressed
test('renders tag input when "+ New Tag" button is pressed', () => {
    render(
        <Provider store={store}>
            <TagScreen />
        </Provider>
    );
    const newTagButton = screen.getByText('+ New Tag');
    fireEvent.press(newTagButton);
    const tagInput = screen.getByPlaceholderText('Enter tag...');
    expect(tagInput).toBeTruthy();
});

// Test if the tag input is not rendered when "+ New Tag" button is not pressed
test('does not render tag input when "+ New Tag" button is not pressed', () => {
    render(
        <Provider store={store}>
            <TagScreen />
        </Provider>
    );
    const tagInput = screen.queryByPlaceholderText('Enter tag...');
    expect(tagInput).toBeNull();
});