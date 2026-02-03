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
    const orgNameInput = screen.getByPlaceholderText(/Your Organization Name/i);
    await user.type(orgNameInput, 'Test Organization');
    
    // Fill organization type
    const orgTypeSelect = screen.getByLabelText(/Organization Type/i);
    await user.selectOptions(orgTypeSelect, 'Corporate');
    
    // Fill country
    const countryInput = screen.getByPlaceholderText(/Ghana/i);
    await user.type(countryInput, 'Ghana');
    
    // Fill website
    const websiteInput = screen.getByPlaceholderText(/https:\/\/yourwebsite.com/i);
    await user.type(websiteInput, 'https://test.com');
    
    // Fill description
    const descriptionTextarea = screen.getByPlaceholderText(/Brief description/i);
    await user.type(descriptionTextarea, 'Test description for our organization');
    
    // Click next
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
    
    // Should move to step 2
    await waitFor(() => {
      expect(screen.getByText(/Contact Person Details/i)).toBeInTheDocument();
    });
  });

  it('displays progress indicators', () => {
    renderForm();
    
    // Check for step indicators
    expect(screen.getByText(/Organization/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Goals/i)).toBeInTheDocument();
    expect(screen.getByText(/Review/i)).toBeInTheDocument();
  });

  it('allows going back to previous steps', async () => {
    const user = userEvent.setup();
    renderForm();
    
    // Fill and move to step 2 (simplified)
    const orgNameInput = screen.getByPlaceholderText(/Your Organization Name/i);
    await user.type(orgNameInput, 'Test Org');
    
    const orgTypeSelect = screen.getByLabelText(/Organization Type/i);
    await user.selectOptions(orgTypeSelect, 'Corporate');
    
    const countryInput = screen.getByPlaceholderText(/Ghana/i);
    await user.type(countryInput, 'Ghana');
    
    const websiteInput = screen.getByPlaceholderText(/https:\/\/yourwebsite.com/i);
    await user.type(websiteInput, 'https://test.com');
    
    const descriptionTextarea = screen.getByPlaceholderText(/Brief description/i);
    await user.type(descriptionTextarea, 'Test description');
    
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
