import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import PartnershipApplicationPage from './apply';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Partnership Application Form', () => {
  const renderForm = () => {
    return render(
      <BrowserRouter>
        <PartnershipApplicationPage />
      </BrowserRouter>
    );
  };

  it('renders the partnership application form', () => {
    renderForm();
    expect(screen.getByText(/Partnership Application/i)).toBeInTheDocument();
  });

  it('displays all form steps', () => {
    renderForm();
    expect(screen.getByText(/Organization Information/i)).toBeInTheDocument();
  });

  it('validates required fields on step 1', async () => {
    const user = userEvent.setup();
    renderForm();
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    // Should still be on step 1 due to validation
    expect(screen.getByText(/Organization Information/i)).toBeInTheDocument();
  });

  it('allows navigation through form steps when fields are filled', async () => {
    const user = userEvent.setup();
    renderForm();
    
    // Fill organization name
    const orgNameInput = screen.getByPlaceholderText(/organization name/i);
    await user.type(orgNameInput, 'Test Organization');
    
    // Fill organization type - now has proper htmlFor
    const orgTypeSelect = screen.getByLabelText(/Organization Type/i);
    await user.selectOptions(orgTypeSelect, 'corporate');
    
    // Fill country
    const countryInput = screen.getByPlaceholderText(/country/i);
    await user.type(countryInput, 'Ghana');
    
    // Click next (website is optional, no description on step 1)
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    // Should move to step 2
    await waitFor(() => {
      expect(screen.getByText(/Contact Person Details/i)).toBeInTheDocument();
    });
  });

  it('displays progress indicators', () => {
    renderForm();
    
    // Check for step indicators - use getAllByText since text appears multiple times
    const orgInfoElements = screen.getAllByText(/Organization Info/i);
    expect(orgInfoElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Contact Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Partnership Goals/i)).toBeInTheDocument();
    expect(screen.getByText(/Review & Submit/i)).toBeInTheDocument();
  });

  it('allows going back to previous steps', async () => {
    const user = userEvent.setup();
    renderForm();
    
    // Fill and move to step 2 (simplified)
    const orgNameInput = screen.getByPlaceholderText(/organization name/i);
    await user.type(orgNameInput, 'Test Org');
    
    const orgTypeSelect = screen.getByLabelText(/Organization Type/i);
    await user.selectOptions(orgTypeSelect, 'corporate');
    
    const countryInput = screen.getByPlaceholderText(/country/i);
    await user.type(countryInput, 'Ghana');
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Contact Person Details/i)).toBeInTheDocument();
    });
    
    // Go back
    const backButton = screen.getByRole('button', { name: /back/i });
    await user.click(backButton);
    
    // Should be back on step 1
    expect(screen.getByText(/Organization Information/i)).toBeInTheDocument();
  });
});
