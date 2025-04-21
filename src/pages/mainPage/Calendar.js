const Calendar = () => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();
  const currentDay = today.getDate(); // Get today's date

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar">
      <h3>{month} {year}</h3>
      <div className="calendar-grid">
        {days.map((day) => (
          <div 
            key={day} 
            className={`calendar-day ${day === currentDay ? "today" : ""}`} // Add "today" class for current date
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
