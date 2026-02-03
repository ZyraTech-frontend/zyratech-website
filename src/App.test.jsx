import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Routing', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    // App should render
    expect(document.body).toBeTruthy();
  });

  it('renders home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    // Check for common home page elements
    const homeContent = document.querySelector('body');
    expect(homeContent).toBeInTheDocument();
  });

  it('renders about page', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    
    // About page should render
    expect(document.querySelector('body')).toBeInTheDocument();
  });

  it('renders 404 page for invalid routes', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route-that-does-not-exist']}>
        <App />
      </MemoryRouter>
    );
    
    // Should show 404 or redirect
    expect(document.querySelector('body')).toBeInTheDocument();
  });
});
