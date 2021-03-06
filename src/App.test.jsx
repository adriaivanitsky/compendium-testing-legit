import { render, screen } from '@testing-library/react';
import App from './App';

test('should render a header', async () => {
  render(<App />);
  const header = await screen.findByRole('heading', { name: /us holidays/i });
  expect(header).toBeInTheDocument();
});
