import React, {  useState } from "react";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
export default function Project({ props }) {

  const [closed, setClosed] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [childs, setChilds] = useState(props.childs)
  const ShowHide = (e) => {
    setClosed(!closed);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
   console.log(e)
    if(childs.filter(p => p.name === props.name).length > 0){
      alert("A porject with same name already exist")
       return 0;
    }
    let user = useLocalStorage.GetUser();
    let project = JSON.parse(user.todo).projects.filter(p => p.name == props.name)[0]
    project.childs.push({"desc" : newItem})
    let otherProjects =  JSON.parse(user.todo).projects.filter(p => p.name != props.name)
    otherProjects.push(project)
   
    user.todo = JSON.stringify({ "projects" : (Object.values(otherProjects)) })
   
   
    console.log(user)
    localStorage.setItem("user", JSON.stringify({user: user }))
    setChilds(project.childs) 
  };


  return (
    <ul
    key={props.key}
      className="child"
      style={closed ? { height: "35px" } : { height: "150px" }}
    >
      <li>
        <h5 onClick={(e) => ShowHide(e)}>
          <span className="tag" style={{ backgroundColor:props.color }}>
            {props.tag}
          </span>
          {props.name}{" "}
        </h5>
        <ul
          className="child_body"
          style={closed ? { display: "none", height: "35px" } : { display: "block",  height: "90px" }}
        >
         
          {childs.map((elm, index) => (
            <li key={index}>{elm.desc}</li>
          ))}
           <li>
            <form onSubmit={(e) => HandleSubmit(e)}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              ></input>
              <input style={{backgroundColor:"#9FA6B2", margin:"1px"}}type="submit" value="+"></input>
            </form>
          </li>
        </ul>
      </li>
    </ul>
  );
}
