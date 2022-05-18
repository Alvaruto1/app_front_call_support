import React from "react";
import { useDispatch } from "react-redux";

export default function Modal(props) {
  const { title, list_inputs, funct, modal } = props;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    funct();
  };
  return (
    <div
      className="modal fade"
      id={modal}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>{list_inputs.map((input, index) => input)}</form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              onClick={handleSubmit}
              data-bs-dismiss="modal"
              type="button"
              className="btn btn-primary"
            >
             Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
