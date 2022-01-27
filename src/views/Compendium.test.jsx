import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Compendium from './Compendium';

test('should render a loading state', async () => {
  render(<Compendium />);
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  await waitForElementToBeRemoved(loading);
});
