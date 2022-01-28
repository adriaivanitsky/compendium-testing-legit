import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

test('should render a header', async () => {
  render(<App />);
  const header = await screen.findByRole('heading', { name: /us holidays/i });
  expect(header).toBeInTheDocument();
});

//behavorial test suite here

//setup server and msw
const mockResponse = [
  {
    date: '2021-12-31',
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: 'US',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2022-01-17',
    localName: 'Martin Luther King, Jr. Day',
    name: 'Martin Luther King, Jr. Day',
    countryCode: 'US',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2022-02-21',
    localName: 'Presidents Day',
    name: "Washington's Birthday",
    countryCode: 'US',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2022-04-15',
    localName: 'Good Friday',
    name: 'Good Friday',
    countryCode: 'US',
    fixed: false,
    global: false,
    counties: [
      'US-CT',
      'US-DE',
      'US-HI',
      'US-IN',
      'US-KY',
      'US-LA',
      'US-NC',
      'US-ND',
      'US-NJ',
      'US-TN',
    ],
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2022-04-15',
    localName: 'Good Friday',
    name: 'Good Friday',
    countryCode: 'US',
    fixed: false,
    global: false,
    counties: ['US-TX'],
    launchYear: null,
    types: ['Optional'],
  },
  {
    date: '2022-05-30',
    localName: 'Memorial Day',
    name: 'Memorial Day',
    countryCode: 'US',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2022-06-20',
    localName: 'Juneteenth',
    name: 'Juneteenth',
    countryCode: 'US',
    fixed: false,
    global: true,
    counties: null,
    launchYear: 2021,
    types: ['Public'],
  },
  {
    date: '2022-07-04',
    localName: 'Independence Day',
    name: 'Independence Day',
    countryCode: 'US',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2022-09-05',
    localName: 'Labor Day',
    name: 'Labour Day',
    countryCode: 'US',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2022-10-10',
    localName: 'Columbus Day',
    name: 'Columbus Day',
    countryCode: 'US',
    fixed: false,
    global: false,
    counties: [
      'US-AL',
      'US-AZ',
      'US-CO',
      'US-CT',
      'US-DC',
      'US-GA',
      'US-ID',
      'US-IL',
      'US-IN',
      'US-IA',
      'US-KS',
      'US-KY',
      'US-LA',
      'US-ME',
      'US-MD',
      'US-MA',
      'US-MS',
      'US-MO',
      'US-MT',
      'US-NE',
      'US-NH',
      'US-NJ',
      'US-NM',
      'US-NY',
      'US-NC',
      'US-OH',
      'US-OK',
      'US-PA',
      'US-RI',
      'US-SC',
      'US-TN',
      'US-UT',
      'US-VA',
      'US-WV',
    ],
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2022-11-11',
    localName: 'Veterans Day',
    name: 'Veterans Day',
    countryCode: 'US',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2022-11-24',
    localName: 'Thanksgiving Day',
    name: 'Thanksgiving Day',
    countryCode: 'US',
    fixed: false,
    global: true,
    counties: null,
    launchYear: 1863,
    types: ['Public'],
  },
  {
    date: '2022-12-26',
    localName: 'Christmas Day',
    name: 'Christmas Day',
    countryCode: 'US',
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
];

const server = setupServer(
  rest.get(
    'https://date.nager.at/api/v3/PublicHolidays/2022/US',
    (req, res, ctx) => {
      return res(ctx.json(mockResponse));
    }
  )
);

beforeAll(() => server.listen());

afterAll(() => server.close());

jest.setTimeout(7000);
test('should display user search returning one matching item correctly', async () => {
  render(<App />);
  const search = await screen.findByRole('textbox');
  const button = await screen.findByRole('button');
  userEvent.type(search, `New Year's Day`);
  userEvent.click(button);
  await waitFor(() => expect(screen.getAllByRole('heading')).toHaveLength(4), {
    timeout: 5000,
  });
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
