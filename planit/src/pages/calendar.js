import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
const { v4: uuidv4 } = require('uuid');
import { Client, Databases, Query } from "appwrite";

const client = new Client()
    .setEndpoint('http://127.0.0.1/v1')
    .setProject('641f366aecda205350ba');

const databases = new Databases(client);


const fetch_tasks = async () => {
  
    const response = await databases.listDocuments('641f793fd8555c8ac5c3', '6420158e369287597086');
    
    return response;
  }

  

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
        <a href="#"><div
          key={`day-${i}`}
          className={`h-24 px-2 flex items-center justify-center rounded-full ${
            isSelected ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleDateClick(day)}
        >
          {i}
        </div></a>
          
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


  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const response = await fetch_tasks();
    const tasks = response.documents;
    
    let c = [];

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            const date1 = new Date(task.dueDate);
            const date2 = new Date(selectedDate);
            if (date1.getDate() === date2.getDate()) {
                c.push(task);
            }
        }


    setTasks(c);
    console.log(tasks)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
        fetchTasks();
    }, 1500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <Navbar/>
    <div className="flex my-5 h-full mx-5 justify-end">
        <div className="bg-white rounded-lg w-1/2 shadow p-4"> 

        <h1 className="text text-2xl font-bold">Tasks on the Day</h1>
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <div class="flex justify-center flex-col">

                        {
                            
                            tasks.map((task) => {
                                const timestamp = task.dueDate;
                                const date = new Date(timestamp);

                                const year = date.getFullYear();
                                const month = date.getMonth() + 1;
                                const day = date.getDate();
                                const hours = date.getHours();
                                const minutes = date.getMinutes();
                                const seconds = date.getSeconds();

                                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                                return(
                                    <div class="max-w-sm rounded overflow-hidden my-5 shadow-lg">
                                    <div class="px-6 py-4">
                                        <div class="font-bold text-xl mb-2">{task.title}</div>
                                        <p class="text-gray-400 text-base">
                                            {formattedDate}
                                        </p>
                                        <p className="font-bold">{task.priority}</p>
                                    </div>
                                    
                                </div>
                                )
                            })

                        }



                    </div>
                </div>
            </div>
        </div>
            
        </div>

        <div className="bg-white rounded-lg w-1/2 shadow p-4">{renderCalendar(selectedDate)}</div>
    </div>
    </>
    );
};

export default Calendar;