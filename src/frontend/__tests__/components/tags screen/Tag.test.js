import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Tag from '../../../components/tags screen/Tag';

describe('Tag component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Tag />);
    expect(getByTestId('tag-container')).toBeDefined();
  });

  it('renders a TextInput when isTextInput prop is true', () => {
    const { getByPlaceholderText } = render(<Tag isTextInput={true} />);
    expect(getByPlaceholderText('Enter tag...')).toBeDefined();
  });

  it('renders a Text when isTextInput prop is false', () => {
    const { getByText } = render(<Tag isTextInput={false} tagName="Test" />);
    expect(getByText('Test')).toBeDefined();
  });

  it('calls handleChangeText when text is changed in TextInput', () => {
    const handleChangeText = jest.fn();
    const { getByPlaceholderText } = render(<Tag isTextInput={true} handleChangeText={handleChangeText} />);
    const textInput = getByPlaceholderText('Enter tag...');
    fireEvent.changeText(textInput, 'New tag');
    expect(handleChangeText).toHaveBeenCalledWith('New tag');
  });

  it('calls onEnter when editing ends in TextInput', () => {
    const onEnter = jest.fn();
    const { getByPlaceholderText } = render(<Tag isTextInput={true} onEnter={onEnter} />);
    const textInput = getByPlaceholderText('Enter tag...');
    fireEvent(textInput, 'onEndEditing');
    expect(onEnter).toHaveBeenCalled();
  });
});