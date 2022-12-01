import React, { useState } from "react";
import Project from "./Project";
import Utils from "../Utils/Utils"
import useLocalJson from "../Hooks/useLocalJson";
import useLocalStorage from "./auth/Hooks/useLocalStorage";

export default function NestedTodo({ props }) {
  const [closed, setClosed] = useState(false);

  const [tag, setTag] = useState(useLocalJson.GetTags()[0]);
  const [data , setData] = useState(JSON.parse(props))
  
  const [name, setName] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault(); 
    //console.log(data.projects)
    if(data.projects.filter(p => p.name === name).length > 0){
      alert("A porject with same name already exist")
       return 0;
    }
      
    let newData = data;
     newData.projects.push({
      "name" : name,
      "tag" : tag,
      "color" : useLocalJson.getColor(tag),
      "childs" : []
    })
    setData(newData)
    let user = useLocalStorage.GetUser();
    user.todo = JSON.stringify(data);
    localStorage.setItem("user", JSON.stringify({user: user }))
  };
  
  const ShowHide = (e) => {
    setClosed(!closed);
  };
  
  return (
    <ul onClick={(e) => ShowHide(e)} className="project">
      { data.projects.map((elm, index) => (
        <li key={index}>
          <Project
            style={closed ? { display: "none" } : { display: "block" }}
            props={elm} 
          />
        </li>
      ))}
      <li>
        <ul
          key={props.key}
          className="child"
          style={ { height: "35px" } }
        >
          <li>
            <h5>
              <form onSubmit={(e) => HandleSubmit(e)}>
                <select value={tag} onChange={(e) => setTag(e.target.value)} id="pet-select">
                  {useLocalJson.GetTags().map((elm, index) =><option key={index} value={elm.name}>{elm.name}</option>)}
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
  );
}
