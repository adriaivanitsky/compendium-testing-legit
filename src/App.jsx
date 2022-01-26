import { useEffect } from 'react';
import { fetchHolidays } from './services/holidays';

export default function App() {
  useEffect(async () => {
    await fetchHolidays();
    console.log(await fetchHolidays());
  });

  return <h1>Hello World</h1>;
}
