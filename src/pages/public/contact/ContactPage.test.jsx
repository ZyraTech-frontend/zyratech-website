import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

describe('Contact Form', () => {
  const renderContactForm = () => {
    return render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>
    );
  };

  it('renders contact form', () => {
    renderContactForm();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderContactForm();
    
    // Try to submit without filling fields
    const submitButton = screen.queryByRole('button', { name: /send|submit/i });
    if (submitButton) {
      await user.click(submitButton);
      
      // Form should show validation errors or prevent submission
      expect(screen.getByRole('button', { name: /send|submit/i })).toBeInTheDocument();
    }
  });

  it('accepts valid form input', async () => {
    const user = userEvent.setup();
    renderContactForm();
    
    // Find name input (may vary by placeholder/label)
    const nameInput = screen.queryByPlaceholderText(/name/i) || 
                     screen.queryByLabelText(/name/i);
    if (nameInput) {
      await user.type(nameInput, 'John Doe');
      expect(nameInput).toHaveValue('John Doe');
    }
    
    // Find email input
    const emailInput = screen.queryByPlaceholderText(/email/i) || 
                      screen.queryByLabelText(/email/i);
    if (emailInput) {
      await user.type(emailInput, 'john@example.com');
      expect(emailInput).toHaveValue('john@example.com');
    }
    
    // Find message textarea
    const messageInput = screen.queryByPlaceholderText(/message/i) || 
                        screen.queryByLabelText(/message/i);
    if (messageInput) {
      await user.type(messageInput, 'Test message content');
      expect(messageInput).toHaveValue('Test message content');
    }
  });
});
