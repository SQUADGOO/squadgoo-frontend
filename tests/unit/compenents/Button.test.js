import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../src/components/common/Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with icon', () => {
    render(<Button icon="fa-plus">Add</Button>);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('disabled button cannot be clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
