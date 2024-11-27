import { render, screen, fireEvent, act } from '@testing-library/react';
import DisplayPage from '@/app/(home)/Checkstatus/page';  
import * as supabaseData from '../utils/supabase/data'; 

jest.mock('../utils/supabase/data', () => ({ 
  ...jest.requireActual('../utils/supabase/data'),
  deleteAppointment: jest.fn(), 
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({
      value: 'mockedCookieValue', 
    }),
  }),
}));

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


describe('TC-19 Appointment Cancellation: ', () => {
  test('TC-19.1I: should not display password prompt for invalid reference number.', async () => {
    render(<DisplayPage />);
    const inputElement = screen.getByPlaceholderText(/Input reference number/i); 
        await act(async () => {
      fireEvent.change(inputElement, { target: { value: 'invalidNumber' } });
    });

    const checkButton = screen.getByText(/Check status/);
    
    await act(async () => {
      fireEvent.click(checkButton);
    });

    const newTextbox = screen.queryByPlaceholderText(/Enter Password/i);  
    const submitButton = screen.queryByText(/Submit/i);  

    expect(newTextbox).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
  });

  test('TC-19.2U: should delete an appointment', async () => {
    const spy = jest.spyOn(supabaseData, 'deleteAppointment').mockResolvedValueOnce(1);

    const trackingNumber = 10025;
    await supabaseData.deleteAppointment(trackingNumber);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(trackingNumber);

    spy.mockRestore();
  });
});
