import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const [priority, setPriority] = useState("Low");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (editTodo) {
      setInput(editTodo.title);
      setPriority(editTodo.priority || "Low");
    } else {
      setInput("");
      setPriority("Low");
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [setInput, editTodo, todos]);

  const updateTodo = (title, id, completed, priority) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed, priority } : todo
    );
    setTodos(sortTodos(newTodo));
    setEditTodo("");
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onPriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!editTodo) {
      const newTodos = [
        ...todos,
        { id: uuidv4(), title: trimmedInput, completed: false, priority, timestamp: Date.now() },
      ];
      setTodos(sortTodos(newTodos));
      setInput("");
      setPriority("Low");
    } else {
      updateTodo(trimmedInput, editTodo.id, editTodo.completed, priority);
    }
  };

  const sortTodos = (tasks) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return tasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  // Calculate progress
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const progressPercentage = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
    

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="Enter a Todo..."
          className="task-input"
          value={input}
          required
          onChange={onInputChange}
          ref={inputRef}
        />
        <select
          className="priority-select"
          value={priority}
          onChange={onPriorityChange}
          required
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className="button-add" type="submit">
          {editTodo ? "OK" : "Add"}
        </button>
      </form>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
          {/* {progressPercentage > 0 && `${progressPercentage}%`} */}
        </div>
      </div>
      <p className="progress-text">
        {completedTasks} of {totalTasks} tasks completed
      </p>
    </>
  );
};

export default Form;
