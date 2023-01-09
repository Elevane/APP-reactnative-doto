import React from "react";

export default function HistoryTodo({ props }) {
  return (
    <ul
      key={props.key}
      className="child"
      style={ { height: "35px", disabled:"true"} }
        disabled
    >
      <li>
        <h5 >
          <span className="tag" style={{ backgroundColor: props.color }}>
            {props.tag}
          </span>
          {props.name}
          
        </h5>
        <ul
          className="child_body"
          style={{ display: "none", height: "35px" }}
        ></ul>
      </li>
    </ul>
  );
}
