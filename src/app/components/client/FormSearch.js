import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getClient, getClients } from "./clientSlice";

export default function FormSearch(props) {
  const { setActivedButton, id, document_type_id, setId, setDocumentType } = props;
  const dispatch = useDispatch();
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Cliente(s) obtenido(s) correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const errorFunction = (error) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
    });
  };
  const onClickAll = (e) => {
    setActivedButton("all");
    e.preventDefault();
    dispatch(getClients(okFunction, errorFunction));
  };
  const onClickSearch = (e) => {
    setActivedButton("search");
    e.preventDefault();
    dispatch(getClient(document_type_id, id, okFunction, errorFunction));
  };
  return (
    <div className="mt-4">
      <form className="d-flex justify-content-center align-items-center">
        <div className="mb-3 mx-2">
          <label htmlFor="document_type_id" className="form-label">
            Tipo de documento
          </label>
          <select
            id="document_type_id"
            className="form-select"
            value={document_type_id}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="1">Cedula</option>
            <option value="2">Pasaporte</option>
            <option value="3">NIT</option>
          </select>
        </div>
        <div className="mb-3 mx-2">
          <label htmlFor="id" className="form-label">
            # Identificación
          </label>
          <input
            type="number"
            className="form-control"
            id="id"
            placeholder="Escriba su número de identificación"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mx-2"
          onClick={onClickSearch}
        >
          Buscar
        </button>
        <button
          type="button"
          className="btn btn-secondary mx-2"
          onClick={onClickAll}
        >
          Todos
        </button>
      </form>
    </div>
  );
}
