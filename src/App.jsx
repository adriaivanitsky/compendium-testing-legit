import { useEffect } from 'react';
import { fetchHolidays } from './services/holidays';
import { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHolidays();
      let addId = 0;
      data.forEach((item) => {
        item.id = addId;
        addId++;
      });
      setHolidays(data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);
  if (loading) return <h1>loading...</h1>;
  return (
    <>
      <div>
        {holidays.map((holiday) => (
          <div key={holiday.id}>
            <h1>{holiday.name}</h1>
            <h2>{holiday.date}</h2>
            <h3>{holiday.countryCode}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
