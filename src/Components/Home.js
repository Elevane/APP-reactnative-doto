import React from "react";
import NestedTodo from "./NestedTodo";
import useLocalStorage from "./auth/Hooks/useLocalStorage";
export default function Home() {

  const user = useLocalStorage.GetUser();
  const HandleSubmit = (e) => {
    e.preventDefault();
    return fetch(process.env.REACT_APP_DBHOST_TODO  , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization" : user.token,
        Accept: "*/*",
      },
      body: JSON.stringify(user.todo),
    }).then((data) => data.json()).then((value) => {
      if(value === null || value=== undefined)
        alert("Return value can't be read")
      else if (!value.isSuccess) {
        alert(value.errorMessage);
      }
      else if (value.result === undefined) {
        alert("result is undifiend",);
      }
      else{
        localStorage.setItem(
          "user",
          JSON.stringify({ user: value.result })
        );
        window.location.href = "/"
      }
    }).catch(function() {
      alert("Failed to fetch api");
  });;
  }
  return (
    <div style={{display:"flex",flexDirection : "column", "justifyContent": "center",alignItems:"center", "marginTop" :"100px"}}>
      <h1>{user.username} <button style={{padding: "2px  5px 2px 5px", border : "none", backgroundColor: "red", borderRadius: "2px", color :"white"}} onClick={(e) => window.location.href="/logout" }> X </button></h1>
      <NestedTodo props={user.todo} />
      <form onSubmit={(e) => HandleSubmit(e)}>
        <input type="submit" value="Save"/>
      </form>
    </div>
  );
}
