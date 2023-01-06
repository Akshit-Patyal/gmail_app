import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

test('Composing a new mail', () => {
        render(<Header />);
      
      const buttonElement = screen.getByText('Compose');
                  expect(userEvent.click(buttonElement));
      });