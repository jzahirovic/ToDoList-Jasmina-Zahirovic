import React, { useEffect, useState } from "react";
import "./App.css";
import { createTodo, deleteTodo, loadTodos } from "./lib";
import { Todo } from "./domain";
import TodoCard from "./components/TodoCard";

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");

  // state[0].map()  get
  // state[1](todo)  set
  const test = async () => {
    // createTodo("Test 1234")
    const todos = await loadTodos();
    setTodos(todos);
  };

  useEffect(() => {
    test();
  }, []);

  const onNewTodoKeyDown = (e: any) => {
    if (!newTodoTitle || e.key !== "Enter") return;

    createTodo(newTodoTitle);
    test();
    setNewTodoTitle("");
  };

  const onDeleteTodoButtonClick = (todo: Todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    deleteTodo(todo.id);
  };

  const onChangeStatusButtonClick = (todo: Todo) => {
    setTodos(
      todos.map((t) => {
        if (t.id === todo.id) {
          t.completed = !t.completed;
        }
        return t;
      })
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add Todo"
        value={newTodoTitle}
        onChange={({ target: { value } }) => setNewTodoTitle(value)}
        onKeyDown={onNewTodoKeyDown}
      />
      {todos.map((todo, index) => (
        <TodoCard
          todo={todo}
          index={index + 1}
          key={todo.id}
          onDeleteTodoButtonClick={onDeleteTodoButtonClick}
          onChangeStatusButtonClick={onChangeStatusButtonClick}
        />
      ))}
    </div>
  );
}

export default App;
