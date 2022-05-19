import React from "react";

export default function ActionsCRUD(props) {
  const { delete_object } = props;
  return (
    <div className="flex-d">
      <button onClick={delete_object} className="btn btn-outline-danger mx-2">
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}
