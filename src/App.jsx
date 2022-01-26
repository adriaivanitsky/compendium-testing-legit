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
      console.log(data);
    };
    fetchData();
  }, []);
  if (loading) return <h1>loading...</h1>;
  return (
    <>
      <h1>{holiday[0].name}</h1>
      <h2>{holiday[0].date}</h2>
      <h3>{holiday[0].countryCode}</h3>
      {holiday[0].global ? (
        <p>This is a global holiday!</p>
      ) : (
        <p>This is a local holiday</p>
      )}
    </>
  );
}
