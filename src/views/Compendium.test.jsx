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

test('default list of holidays renders on page', async () => {
  render(<Compendium />);
  const loading = screen.getByText(/loading/i);
  await waitForElementToBeRemoved(loading);
  const headings = await screen.findAllByRole('heading');
  expect(headings).toHaveLength(39);
});

test('should render a search bar', async () => {
  render(<Compendium />);
  const searchBar = await screen.findByRole('textbox');
  expect(searchBar).toBeInTheDocument();
});

test('should render a button', async () => {
  render(<Compendium />);

  const button = await screen.findByRole('button');
  expect(button).toBeInTheDocument();
});
