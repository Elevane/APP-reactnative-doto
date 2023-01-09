import React, { useState } from "react";
import Todo from "./TodoList";
import useLocalJson from "../Hooks/useLocalJson";
import useLocalStorage from "../Hooks/useLocalStorage";
import HistoryTodo from "./HistoryTodo";

export default function ProjectList({ props, tags, history }) {
  const [closed, setClosed] = useState(false);
  const [tag, setTag] = useState(tags);
  const [data, setData] = useState(props);
  const [name, setName] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (data.some((p) => p.name === name && p.tag === tag)) {
        alert("A porject with same name already exist");
      return;
    }
    const newItem = {
      name: name,
      tag: tag,
      color: useLocalJson.getColor(tag),
      childs: [],
      active : true,
    };
    setData([...data, newItem]);
    useLocalStorage.AddProject(newItem);
    setName("")
  };

  const ShowHide = () => {
    setClosed(!closed);
  };

  const handleDelete = (name) => {
    useLocalStorage.DeleteProject(name);
    let projet = data.filter(x => x.name === name && x.active=== true)[0]
    let index = data.indexOf(projet)
    projet.active = false;
    data.splice(index, 1)
    setData([...data, projet]) 
  }
  return (
    <>
    <ul onClick={ShowHide} className="project">
      {data.filter(x => x.active).map((elm, index) => (
        elm.active &&
        <li key={index}>
          <Todo
            style={closed ? { display: "none" } : { display: "block" }}
            props={elm} handleDelete={handleDelete}
          />
        </li>
      ))}   
      <li>
        <ul key={props.key} className="child" style={{ height: "35px" }}>
          <li>
            <h5>
              <form onSubmit={(e) => HandleSubmit(e)}>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  id="pet-select"
                >
                  {useLocalJson.GetTags().map((elm, index) => (
                    <option key={index} value={elm.name}>
                      {elm.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <input
                  style={{ backgroundColor: "#9FA6B2", margin: "1px" }}
                  type="submit"
                  value="+"
                ></input>
              </form>
            </h5>
          </li>
        </ul>
      </li>     
    </ul>
    <ul  className="project">
      {console.log(data.filter(x => !x.active))}
      {history && data.filter(x => !x.active).map((elm, index) => (
          <li key={index} style={{ backgroundColor: "#f7f7f7" }}>
            <HistoryTodo
              props={elm}
            />
          </li>
        ))}
    </ul>
    </>
  );
}
