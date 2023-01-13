import React, { useState } from "react";
import Todo from "./ListTodos";
import useLocalJson from "../Hooks/useLocalJson";
import useLocalStorage from "../Hooks/useLocalStorage";
import HistoryProject from "./Project/HistoryProject";
import { MdAddCircleOutline } from "react-icons/md";
import { toast } from "react-hot-toast";

export default function ListProjects({ props, tags, history }) {
  const [closed, setClosed] = useState(false);
  const [tag, setTag] = useState(tags);
  const [data, setData] = useState(props);
  const [name, setName] = useState("");

  const HandleSubmit = (e) => {
    if (
      data.some(
        (p) => p.name.toLowerCase() === name.toLowerCase() && p.tag === tag
      )
    ) {
      toast.error("A project with same name already exist");
      return;
    }
    const newItem = {
      name: name,
      tag: tag,
      color: useLocalJson.getColor(tag),
      childs: [],
      active: true,
    };
    setData([...data, newItem]);
    useLocalStorage.AddProject(newItem);
    setName("");
  };

  const ShowHide = () => {
    setClosed(!closed);
  };

  const handleDelete = (name) => {
    useLocalStorage.DeleteProject(name);
    let projet = data.filter((x) => x.name === name && x.active === true)[0];
    let index = data.indexOf(projet);
    projet.active = false;
    data.splice(index, 1);
    setData([...data, projet]);
  };

  return (
    <>
      <ul onClick={ShowHide} className="project">
        {data
          .filter((x) => x.active)
          .map(
            (elm, index) =>
              elm.active && (
                <li key={index}>
                  <Todo
                    style={closed ? { display: "none" } : { display: "block" }}
                    props={elm}
                    handleDelete={handleDelete}
                  />
                </li>
              )
          )}
        <li>
          <ul
            key={props.key}
            className="child form_child"
            style={{ height: "50px" }}
          >
            <li>
              <h5>
                <div>
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    id="tag-select"
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
                  <div className="div_btn">
                    <button id="add_task">
                      <MdAddCircleOutline onClick={(e) => HandleSubmit(e)} />
                    </button>
                  </div>
                </div>
              </h5>
            </li>
          </ul>
        </li>
        <li></li>
      </ul>
      {history && <h3> historique</h3>}
      <ul className="project project_history">
        {history &&
          data
            .filter((x) => !x.active)
            .map((elm, index) => (
              <li key={index} style={{ backgroundColor: "#f7f7f7" }}>
                <HistoryProject props={elm} />
              </li>
            ))}
      </ul>
    </>
  );
}
