export default function Controls({ userInput, setUserInput, handleSearch }) {
  return (
    <div>
      <input
        value={userInput}
        type="text"
        placeholder="new year's day"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleSearch}>search</button>;
    </div>
  );
}
