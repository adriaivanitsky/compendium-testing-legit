import React from 'react';
import { useEffect, useState } from 'react';
import { fetchHolidays } from '../services/holidays';

export default function useHolidays() {
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [filterHolidays, setFilterHolidays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHolidays();
      data.map((item, index) => (item.id = `${item.name}-${index}`));
      setHolidays(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    loading,
    holidays,
    userInput,
    setUserInput,
    filterHolidays,
    setFilterHolidays,
  };
}
