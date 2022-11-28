import React, {useState} from "react";
import Project from "./Project";
export default function NestedTodo({ props }) {
    const [closed, setClosed] = useState(false);
    
    const ShowHide = (e) => {
      setClosed(!closed);
    };
  
    return (
      <ul onClick={(e) => ShowHide(e)} className="project">
       
  
        {props.map((elm, index) => (
          <li key={index}>
            <Project
             
              style={closed ? {display:"none"} : {display: "block"}}
             
              props={elm}
            />
          </li>
        ))}
      </ul>
    );
}
