import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from '../../src/layouts/MainLayout';
import store from '../../src/store';

const renderWithProviders = (component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('Navigation Integration', () => {
  test('renders sidebar with navigation items', () => {
    renderWithProviders(<MainLayout />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('User Management')).toBeInTheDocument();
  });

  test('clicking navigation item updates content', () => {
    renderWithProviders(<MainLayout />);
    const usersMenu = screen.getByText('User Management');
    fireEvent.click(usersMenu);
    // Add assertions based on your navigation behavior
  });
});
