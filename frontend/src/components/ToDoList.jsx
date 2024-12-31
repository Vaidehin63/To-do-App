import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:5000/api/todos");
    setTodos(data);
  };

  const addTodo = async () => {
    if (!title) return;
    await axios.post("http://localhost:5000/api/todos", { title });
    setTitle("");
    fetchTodos();
  };

  const toggleCompletion = async (id, completed) => {
    await axios.patch(`http://localhost:5000/api/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              onClick={() => toggleCompletion(todo._id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
