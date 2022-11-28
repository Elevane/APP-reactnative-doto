import React, {  useState } from "react";
import useLocalJson from "../Hooks/useLocalJson";
export default function Project({ props }) {

  const [closed, setClosed] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [childs, setChilds] = useState(props.childs)
  const ShowHide = (e) => {
    setClosed(!closed);
  };


  const HandleSubmit = (e) => {
    e.preventDefault();
    //update de la redondance
    useLocalJson.updateJson(newItem, props.name);
    setChilds(newItem)


  };


  return (
    <ul
    key={props.key}
      className="child"
      style={closed ? { height: "35px" } : { height: "150px" }}
    >
      <li>
        <h5 onClick={(e) => ShowHide(e)}>
          <span className="tag" style={{ backgroundColor: props.color }}>
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
