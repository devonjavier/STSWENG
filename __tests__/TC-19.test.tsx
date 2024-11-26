import { render, screen, fireEvent } from '@testing-library/react';
import DisplayPage from '@/app/(home)/Checkstatus/page';  
import { createClient } from '@supabase/supabase-js';


jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: [], 
          error: null, 
        })),
      })),
    })),
  })),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('TC-19 Appointment Cancellation: ', () => {
  test('TC-19.1I: should not display password prompt for invalid reference number.', () => {
    render(<DisplayPage />);

    const inputElement = screen.getByPlaceholderText(/Input reference number/i); 
    fireEvent.change(inputElement, { target: { value: 'invalidNumber' } });

    const checkButton = screen.getByText(/Check status/); 
    fireEvent.click(checkButton);

    const newTextbox = screen.queryByPlaceholderText(/Enter Password/i);  
    const submitButton = screen.queryByText(/Submit/i);  

    expect(newTextbox).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
  });
});
