import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it('renders the ZyraTech logo/brand', () => {
    renderNavbar();
    // Check for logo image
    const logo = screen.queryByAltText(/zyra.*tech/i);
    expect(logo).toBeInTheDocument();
  });

  it('renders main navigation links', () => {
    renderNavbar();
    
    // Check for main navigation items
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    // About is a dropdown button, not a direct link - just check it exists
    const aboutButton = screen.queryByRole('button', { name: /about/i });
    expect(aboutButton).toBeTruthy();
  });

  it('renders services navigation', () => {
    renderNavbar();
    
    // Check for services/training related links
    const servicesLink = screen.queryByRole('link', { name: /services/i }) || 
                        screen.queryByRole('link', { name: /training/i });
    expect(servicesLink).toBeInTheDocument();
  });

  it('renders contact or CTA button', () => {
    renderNavbar();
    
    // Check for contact or call-to-action
    const contactButton = screen.queryByRole('link', { name: /contact/i }) ||
                          screen.queryByRole('button', { name: /contact/i });
    expect(contactButton).toBeInTheDocument();
  });
});
