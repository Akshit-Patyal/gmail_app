import { render, screen } from '@testing-library/react';
import Inbox from './Inbox';

describe('Inbox component', () => {
    test('renders Inbox if request succeeds', async () => {
    //   window.fetch = jest.fn();
    //   window.fetch.mockResolvedValueOnce({
    //     json: async () => [{ from: 'from', description: 'description' }],
    //   });
      render(<Inbox />);
  
      const listItemElements = await screen.findAllByRole('inboxItem')
      expect(listItemElements).not.toHaveLength(0);
    });
  });