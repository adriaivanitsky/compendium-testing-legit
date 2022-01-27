export default function HolidayList({ holidays, filterHolidays }) {
  return (
    <div>
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
  );
}
