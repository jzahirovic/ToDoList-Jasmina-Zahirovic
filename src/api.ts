import { Todo } from "./domain";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos/1"; //first one
//const BASE_URL = "https://jsonplaceholder.typicode.com/todos"; all todos

export const fetchTodos = (id?: number): Promise<Array<Todo>> => {
  return fetch(`${BASE_URL}${id ? `/${id}` : ""}`)
    .then((response) => response.json())
    .then((json: Todo | Array<Todo>) => {
      if (Array.isArray(json)) {
        return json;
      } else {
        return [json];
      }
    });
};
