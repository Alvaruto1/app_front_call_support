import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Modal from "../Modal";

export default function ClientModal(props) {
  const {user, user_functions, action_function, title, modal_id} = props;
  const dispatch = useDispatch();
  const clearForm = () => {
    user_functions.setEmail("");
    user_functions.setPassword("");
    user_functions.setName("");
    user_functions.setSurname("");
    user_functions.setTelephone("");
    user_functions.setId("");
    user_functions.setDocumentType("");
  };
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Usuario guardado correctamente",
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

  const list_inputs = [
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Nombre
      </label>
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Escriba su nombre"
        value={user.name}
        onChange={(e) => user_functions.setName(e.target.value)}
      />
    </div>,
    <div className="mb-3">
      <label htmlFor="surname" className="form-label">
        Apellido
      </label>
      <input
        type="text"
        className="form-control"
        id="surname"
        placeholder="Escriba su apellido"
        value={user.surname}
        onChange={(e) => user_functions.setSurname(e.target.value)}
      />
    </div>,
    <div className="mb-3">
      <label htmlFor="document_type_id" className="form-label">
        Tipo de documento
      </label>
      <select
        id="document_type_id"
        className="form-select"
        value={user.document_type_id}
        onChange={(e) => user_functions.setDocumentType(e.target.value)}
      >
        <option selected>Tipo de documento</option>
        <option value="1">Cedula</option>
        <option value="2">Pasaporte</option>
        <option value="3">NIT</option>
      </select>
    </div>,
    <div className="mb-3">
      <label htmlFor="id" className="form-label">
        # Identificación
      </label>
      <input
        type="number"
        className="form-control"
        id="id"
        placeholder="Escriba su número de identificación"
        value={user.id}
        onChange={(e) => user_functions.setId(e.target.value)}
      />
    </div>,
    <div className="mb-3">
      <label htmlFor="telephone" className="form-label">
        Telefono
      </label>
      <input
        type="text"
        className="form-control"
        id="telephone"
        placeholder="Escriba su telefono"
        value={user.telephone}
        onChange={(e) => user_functions.setTelephone(e.target.value)}
      />
    </div>,
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Dirección de correo
      </label>
      <input
        type="email"
        className="form-control"
        id="email"
        placeholder="Escriba un correo valido"
        value={user.email}
        onChange={(e) => user_functions.setEmail(e.target.value)}
      />
    </div>,
    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Contraseña
      </label>
      <input
        type="password"
        className="form-control"
        id="password"
        value={user.password}
        onChange={(e) => user_functions.setPassword(e.target.value)}
      />
    </div>,
  ];
  return (
    <Modal
      modal={modal_id}
      title={title}
      list_inputs={list_inputs}
      funct={() =>
        dispatch(
          action_function(
            user,
            okFunction,
            errorFunction
          )
        ).then(() => {
          clearForm();
        })
      }
    />
  );
}
