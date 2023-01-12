import React from "react";

export default function Todo({ todo, setActive }) {
  return (
    <li
      onClick={() => setActive(todo.desc, !todo.active)}
      className={todo.active ? "todo" : "todo inactive_task"}
    >
      {todo.desc}
    </li>
  );
}
