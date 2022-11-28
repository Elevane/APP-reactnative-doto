import React from "react";
import NestedTodo from "./NestedTodo";
import useLocalJson from "../Hooks/useLocalJson";
export default function Home() {
  const json = useLocalJson.GetJson();
  
  return (
    <div style={{display:"flex", "justifyContent": "center", "marginTop" :"100px"}}>
      <NestedTodo props={json.projects} />
    </div>
  );
}
