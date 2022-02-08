import Controls from '../components/Controls';
import HolidayList from '../components/HolidayList';
import useHolidays from '../context/HolidayContext';
export default function Compendium() {
  const {
    loading,
    holidays,
    userInput,
    setUserInput,
    filterHolidays,
    setFilterHolidays,
  } = useHolidays();
  const handleSearch = () => {
    let filter = holidays.filter((holiday) =>
      holiday.name.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilterHolidays(filter);
  };

  if (loading) return <p>loading...</p>;
  return (
    <>
      <div>
        <Controls {...{ userInput, setUserInput, handleSearch }} />
        <HolidayList {...{ holidays, filterHolidays }} />
      </div>
    </>
  );
}
