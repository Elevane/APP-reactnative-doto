import React, { useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import TodoSubmit from "./Todo/TodoSubmit";
import Todo from "./Todo/Todo";
import ProjetHeader from "./Project/ProjectHeader";
import { toast } from "react-hot-toast";

export default function ListTodos({ props, handleDelete }) {
  const [closed, setClosed] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [childs, setChilds] = useState(props.childs);
  const [isAdding, setIsAdding] = useState(false);
  const display = () => {
    setClosed(!closed);
  };

  const HandleSubmit = () => {
    setIsAdding(true);
    if (
      childs.some(
        (p) => p.desc.toLowerCase() === newItem.toLocaleLowerCase()
      ) ||
      !newItem
    ) {
      toast.error(
        <p>
          Une <span style={{ color: "red" }}>tâche</span> avec le même nom
          existe déjà ou la valeur données est fausse
        </p>
      );
      return;
    }
    useLocalStorage.AddTodo(props.name, newItem);
    setChilds([...childs, { desc: newItem, active: true }]);
    setNewItem("");
    setIsAdding(false);
  };

  const setActive = (descValue, activeValue) => {
    useLocalStorage.SetActive(props.name, descValue, activeValue);
    const toUpdate = childs.filter((x) => x.desc === descValue)[0];
    let index = childs.indexOf(toUpdate);
    toUpdate.active = activeValue;
    childs.splice(index, 1);
    setChilds([...childs, toUpdate]);
  };

  return (
    <>
      {props.active && (
        <ul
          key={props.key}
          className="child"
          style={closed ? { height: "50px" } : { height: "150px" }}
        >
          <li>
            <ProjetHeader
              display={display}
              handleDelete={handleDelete}
              header={props}
            />
            <ul
              className="child_body"
              style={
                closed
                  ? { display: "none", height: "50px" }
                  : { display: "block", height: "90px" }
              }
            >
              {childs
                .filter((x) => x.active)
                .map((elm, index) => (
                  <Todo todo={elm} key={index} setActive={setActive} />
                ))}

              <TodoSubmit
                isLoading={isAdding}
                newItem={newItem}
                setNewItem={setNewItem}
                HandleSubmit={HandleSubmit}
              />
              {childs
                .filter((x) => !x.active)
                .map((elm, index) => (
                  <Todo todo={elm} key={index} setActive={setActive} />
                ))}
            </ul>
          </li>
        </ul>
      )}
    </>
  );
}
