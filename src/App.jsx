import { useEffect } from 'react';
import { fetchHolidays } from './services/holidays';
import { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [holiday, setHoliday] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHolidays();
      setHoliday(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) return <h1>loading...</h1>;
  return <h1>Hello World</h1>;
}
