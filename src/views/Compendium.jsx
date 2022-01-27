import { useEffect, useState } from 'react';
import Controls from '../components/Controls';
import { fetchHolidays } from './services/holidays';

export default function Compendium() {
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState('');
  const [userInput, setUserInput] = useState('');
  const [filterHolidays, setFilterHolidays] = useState('');

  const handleSearch = () => {
    let filter = holidays.filter((holiday) =>
      holiday.name.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilterHolidays(filter);
  };

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
        <Controls {...{ userInput, setUserInput, handleSearch }} />

        {filterHolidays.length === 0
          ? holidays.map((holiday) => (
              <div key={holiday.id}>
                <h1>{holiday.name}</h1>
                <h2>{holiday.date}</h2>
                <h3>{holiday.countryCode}</h3>
              </div>
            ))
          : filterHolidays.map((holiday) => (
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
