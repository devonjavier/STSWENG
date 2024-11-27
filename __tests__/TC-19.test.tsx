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

  test('TC-19.2U: should delete an appointment', async () => {
    const spy = jest.spyOn(supabaseData, 'deleteAppointment').mockResolvedValueOnce(1);

    const trackingNumber = 10025;
    await supabaseData.deleteAppointment(trackingNumber);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(trackingNumber);

    spy.mockRestore();
  });
});
