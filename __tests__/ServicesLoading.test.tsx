import { render, screen, waitFor } from '@testing-library/react';
import DisplayPage from '../app/(home)/Services/page';
import { fetchServices, fetchImage } from '../utils/supabase/data';
jest.mock('../utils/supabase/data', () => ({
  fetchServices: jest.fn(),
  fetchImage: jest.fn(),
}));

describe('DisplayPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading message while loading services screen', async () => {
    (fetchServices as jest.Mock).mockResolvedValueOnce([]);
    render(<DisplayPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(fetchServices).toHaveBeenCalled());
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('displays booking appointment text.', async () => {
    (fetchServices as jest.Mock).mockResolvedValueOnce([]);
    render(<DisplayPage />);

    await waitFor(() => expect(fetchServices).toHaveBeenCalled());
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Book an Appointment')).toBeInTheDocument();
  })
});
