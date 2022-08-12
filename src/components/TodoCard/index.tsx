import "./styles.css";
import React from "react";
import { Todo } from "../../domain";

type Props = {
  todo: Todo;
  index: number;
  onDeleteTodoButtonClick: (todo: Todo) => void;
  onChangeStatusButtonClick: (todo: Todo) => void;
};

export default function TodoCard(props: Props) {
  return (
    <div className="todo-card">
      <p className="todo-card-title">
        {props.index}. {props.todo.title}
      </p>
      <p className="todo-card-complete">
        Status: {props.todo.completed ? "Complete" : "Incomplete"}
      </p>
      <button className="todo-card-button-status" onClick={() => props.onChangeStatusButtonClick(props.todo)}>
        Change Status
      </button>
      <button className="todo-card-button-delete" onClick={() => props.onDeleteTodoButtonClick(props.todo)}>
        Delete
      </button>
    </div>
  );
}
