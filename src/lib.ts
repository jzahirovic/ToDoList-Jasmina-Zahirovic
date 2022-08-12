import { Todo } from "./domain";
import { fetchTodos } from "./api";

const USER_ID = 736745980734590867983457869037409;
const LOCALSTORAGE_KEY = "todos";

const generateId = (): number => Math.floor(Math.random() * 10000000);

const getTodosFromLocalStorage = (): Array<Todo> => {
  const storedTodos = localStorage.getItem(LOCALSTORAGE_KEY);

  if (storedTodos) {
    return JSON.parse(storedTodos);
  }

  return [];
};

const storeTodo = (todo: Todo) => {
  const storedTodos = localStorage.getItem(LOCALSTORAGE_KEY);

  if (storedTodos) {
    const parsedTodos: Array<Todo> = JSON.parse(storedTodos);
    const updatedTodos = [...parsedTodos, todo];
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedTodos));
  } else {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([todo]));
  }
};

export const loadTodos = async (id?: number) => {
  const todosFromAPI = await fetchTodos(id);
  const todosFromLocalStorage = getTodosFromLocalStorage();

  return [...todosFromAPI, ...todosFromLocalStorage];
};

export const createTodo = (title: string) => {
  const todo: Todo = {
    id: generateId(),
    userId: USER_ID,
    title,
    completed: false,
  };

  storeTodo(todo);
};

export const deleteTodo = (id: number) => {
  const storedTodos = getTodosFromLocalStorage();
  const updatedTodos = storedTodos.filter((todo) => todo.id !== id);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedTodos));
};
