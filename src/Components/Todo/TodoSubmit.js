import React from "react";
import { MdLibraryAdd } from "react-icons/md";

export default function TodoSubmit({ newItem, setNewItem, HandleSubmit }) {
  return (
    <li style={{ marginBottom: "5px" }}>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        ></input>

        <div className="div_btn">
          <button className="add_todo_button" type="submit" value="+">
            <MdLibraryAdd onClick={(e) => HandleSubmit(e)} />
          </button>
        </div>
      </div>
    </li>
  );
}
