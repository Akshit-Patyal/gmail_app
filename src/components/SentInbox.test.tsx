import { render, screen } from '@testing-library/react';
import SentInbox from './SentInbox';

describe('Sent Mails', () => {
    test('renders Sent Mails', async () => {
    
      render(<SentInbox />);
  
      const listItemElements = await screen.findAllByRole('SentMails')
      expect(listItemElements).not.toHaveLength(0);
    });
  });