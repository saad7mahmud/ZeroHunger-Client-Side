import { useState } from "react";
const DateSortingComponent = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [sortedDates, setSortedDates] = useState([]);

  const handleSortDates = () => {
    // Convert the input strings to Date objects and then to milliseconds, and sort them.
    const parsedDate1 = new Date(date1).getTime();
    const parsedDate2 = new Date(date2).getTime();
    console.log(parsedDate1);
    console.log(parsedDate2);
    const sorted = [parsedDate1, parsedDate2].sort((a, b) => a - b);
    console.log(sorted);

    setSortedDates(sorted);
  };

  return (
    <div>
      <h2>Sort Two Dates as Milliseconds</h2>
      <input
        type="date"
        value={date1}
        onChange={(e) => setDate1(e.target.value)}
      />
      <input
        type="date"
        value={date2}
        onChange={(e) => setDate2(e.target.value)}
      />
      <button onClick={handleSortDates}>Sort Dates</button>
      <div>
        <h3>Sorted Dates (in Milliseconds):</h3>
        <ul>
          {sortedDates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DateSortingComponent;
