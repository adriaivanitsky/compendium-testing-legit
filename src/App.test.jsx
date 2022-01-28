import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

//component test
test('should render a header', async () => {
  render(<App />);
  const header = await screen.findByRole('heading', { name: /us holidays/i });
  expect(header).toBeInTheDocument();
});

//behavioral test

test('should display user search returning one matching item correctly', async () => {
  render(<App />);
  const search = await screen.findByRole('textbox');
  const button = await screen.findByRole('button');
  userEvent.type(search, `New Year's Day`);
  userEvent.click(button);
  await waitFor(() => expect(screen.getAllByRole('heading')).toHaveLength(4));
});

test('should display multiples if matches user search', async () => {
  render(<App />);
  const search = await screen.findByRole('textbox');
  const button = await screen.findByRole('button');
  userEvent.type(search, `in`);
  userEvent.click(button);
  await waitFor(() => expect(screen.getAllByRole('heading')).toHaveLength(13), {
    timeout: 5000,
  });
});

test('should display all holidays when button is clicked with no user input', async () => {
  render(<App />);
  const button = await screen.findByRole('button');
  userEvent.click(button);
  await waitFor(() => expect(screen.getAllByRole('heading')).toHaveLength(40));
});

test('should display nothing when user input doesnt match any data', async () => {
  render(<App />);
  const button = await screen.findByRole('button');
  userEvent.click(button);
  await waitFor(() => expect(screen.getAllByRole('heading')).toHaveLength(0));
});
