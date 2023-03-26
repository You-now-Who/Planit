import React, { useState } from "react";
import { format } from "date-fns";

const Task = ({ task, index, onDelete, onComplete, type }) => {
  const { title, priority, dueDate } = task;

  const priorityClass = task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-yellow-500" : "text-green-500";

  const formattedDate = format(task.dueDate, "MM/dd/yyyy");

  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div>
        <span className="text-lg">{task.title}</span>
        <span className={`ml-4 ${priorityClass}`}>{priority}</span>
        <span className="ml-4 text-gray-400">{task.formattedDate}</span>
      </div>
      <div className="flex items-center space-x-2">
        
      <button class="flex items-center justify-center p-2 text-gray-600 hover:text-red-600" onClick={() => onDelete(index)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" class="h-7 w-7 text-gray-600 hover:text-red-600">
          <path stroke="currentColor" stroke-width="1.5" d="M6.5 6.5H8.5V14.5H6.5V6.5ZM11.5 6.5H13.5V14.5H11.5V6.5ZM4.5 4.5H15.5V16.5H4.5V4.5ZM8.5 2.5V2C8.5 1.17157 9.17157 0.5 10 0.5C10.8284 0.5 11.5 1.17157 11.5 2V2.5M13.5 2.5V2C13.5 1.17157 12.8284 0.5 12 0.5C11.1716 0.5 10.5 1.17157 10.5 2V2.5M3.5 4.5V3C3.5 2.44772 3.94772 2 4.5 2H15.5C16.0523 2 16.5 2.44772 16.5 3V4.5H3.5Z"/>
        </svg>
      </button>


        {type === "task" ? (
        <button
          className="px-1 py-1 text-white focus:outline-none"
          onClick={() => onComplete(index)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600 hover:text-green-600" fill="none" viewBox="0 2 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>

        </button>
        
        ): (
          <>
              <button
          className="px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none"
          onClick={() => onComplete(index)}
        >
          Mark Incomplete
        </button> 
          </>
        )
        }

      </div>
    </div>
  );
};

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, priority, dueDate });
    setTitle("");
    setPriority("medium");
    setDueDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center py-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="px-3 py-2 mr-4 border rounded-md outline-none"
      />
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        className="px-3 py-2 mr-4 border rounded-md outline-none"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <input
        type="date"
        value={format(dueDate, "yyyy-MM-dd")}
        onChange={(event) => setDueDate(new Date(event.target.value))}
        className="px-3 py-2 mr-4 border rounded-md outline-none"
      />
      <button
        type="submit"
        className="px-2 py-1 text-blue-600 border border-blue-500 rounded hover:bg-blue-600 hover:text-white focus:outline-none"
      >
        Add Task
      </button>
    </form>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    const completedTask = newTasks.splice(index, 1);
    setTasks(newTasks);
    setCompletedTasks([...completedTasks, completedTask[0]]);
  };

  const markIncomplete = (index) => {
    const newCompletedTasks = [...completedTasks];
    const incompleteTask = newCompletedTasks.splice(index, 1);
    setCompletedTasks(newCompletedTasks);
    console.log(incompleteTask)
    setTasks([...tasks, incompleteTask[0]]);
  };


  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center py-8">Tasks</h1>
      <TaskForm onSubmit={addTask} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold my-4">Tasks</h2>
        {
          tasks.length > 0 ? (
            <>
            {tasks.map((task, index) => (
              <Task
                key={index}
                task={task}
                index={index}
                onDelete={deleteTask}
                onComplete={completeTask}
                type={"task"}
              />
            ))}
            </>
          )

        : (
            <div className="text-center text-medium text-gray-400">
              <p className="text-2xl">All caught up! Enjoy the free space!</p>
              {/* <p className="text-lg">Add a task to get started</p> */}
            </div>
          )
        }
        
      </div>
      
      <div className="mt-8">
          {completedTasks.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-20 mb-4">Completed Tasks</h2>
          {completedTasks.map((task, index) => (
            <Task key={index} task={task} index={index} onDelete={deleteTask} onComplete={markIncomplete} type="complete"/>
          ))}
        </>
      )}
      </div>
    </div>
  );
};

export default Tasks;