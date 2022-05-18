import React from "react";

export default function ActionsCRUD(props) {
  const { delete_object, edit_object } = props;
  return (
    <div className="flex-d">
      <button
        onClick={edit_object}
        data-bs-target="#employee_modal_edit"
        data-bs-toggle="modal"
        data-bs-whatever="@mdo"
        className="btn btn-outline-warning mx-2"
      >
        <i className="bi bi-pencil "></i>
      </button>
      <button onClick={delete_object} className="btn btn-outline-danger mx-2">
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}
