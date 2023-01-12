import React from "react";
import { BsArchive } from "react-icons/bs";

export default function ProjetHeader({
  isLoading,
  display,
  handleDelete,
  header,
}) {
  return (
    <h5 onClick={() => display()}>
      <span className="tag" style={{ backgroundColor: header.color }}>
        {header.tag}
      </span>
      <p>{header.name}</p>
      <div className="div_btn">
        <button
          disabled={isLoading}
          onClick={() => handleDelete(header.name)}
          className="btn_del_project"
        >
          <BsArchive className="archive" />
        </button>
      </div>
    </h5>
  );
}
