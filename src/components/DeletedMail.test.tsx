import { render, screen } from '@testing-library/react';
import DeletedMail from './DeletedMail';

describe('Deleted Mails', () => {
    test('renders Deleted Mails', async () => {
    
      render(<DeletedMail />);
  
      const listItemElements = await screen.findAllByRole('DeletedMails')
      expect(listItemElements).not.toHaveLength(0);
    });
  });