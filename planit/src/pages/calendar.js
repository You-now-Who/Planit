import React, { useState } from "react";
import Navbar from "@/components/Navbar";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderCalendar = (date) => {
    const monthYear = `${monthName(date.getMonth())} ${date.getFullYear()}`;
    const numDays = daysInMonth(date.getMonth(), date.getFullYear());
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const days = [];

    // Push empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Render days
    for (let i = 1; i <= numDays; i++) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);
      const isSelected = selectedDate.getDate() === i;
      days.push(
        <div
          key={`day-${i}`}
          className={`h-24 px-2 flex items-center justify-center rounded-full ${
            isSelected ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleDateClick(day)}
        >
          {i}
        </div>
      );
    }

    return (
      <>


        <div className="flex items-center justify-between mb-4">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => handlePrevMonthClick()}
          >
            Previous
          </button>
          <h2 className="text-xl font-bold">{monthYear}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => handleNextMonthClick()}
          >
            Next
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          <div className="text-center text-gray-500 font-medium text-sm">Sun</div>
          <div className="text-center text-gray-500 font-medium text-sm">Mon</div>
          <div className="text-center text-gray-500 font-medium text-sm">Tue</div>
          <div className="text-center text-gray-500 font-medium text-sm">Wed</div>
          <div className="text-center text-gray-500 font-medium text-sm">Thu</div>
          <div className="text-center text-gray-500 font-medium text-sm">Fri</div>
          <div className="text-center text-gray-500 font-medium text-sm">Sat</div>
          {days}
        </div>
      </>
    );
  };

  const monthName = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log(date)
  };

  const handlePrevMonthClick = () => {
    setSelectedDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1)));
  };

  const handleNextMonthClick = () => {
    setSelectedDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1)));
  };

  return (
    <>
    <Navbar/>
    <div className="flex my-5 h-full mx-5 justify-end">
        <div className="bg-white rounded-lg w-1/2 shadow p-4">{renderCalendar(selectedDate)}</div>
    </div>
    </>
    );
};

export default Calendar;