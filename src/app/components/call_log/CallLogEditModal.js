import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "../Modal";

export default function ClientEditModal(props) {
  const dispatch = useDispatch();
  const {action_function, title, modal_id} = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [id, setId] = useState("");
  const [document_type_id, setDocumentType] = useState("");
  const current_client = useSelector((state) => state.client.client.current_client);

  useEffect(() => {
    if (current_client && current_client.document_type_id) {
      setEmail(current_client.email);
      setPassword(current_client.password);
      setName(current_client.name);
      setSurname(current_client.surname);
      setTelephone(current_client.telephone);
      setId(current_client.id);
      setDocumentType(current_client.document_type_id.id);
    }
  }, [current_client]);
  
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setSurname("");
    setTelephone("");
    setId("");
    setDocumentType("");
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
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
    </div>,
    <div className="mb-3">
      <label htmlFor="document_type_id" className="form-label">
        Tipo de documento
      </label>
      <select
        id="document_type_id"
        className="form-select"
        value={document_type_id}
        onChange={(e) => setDocumentType(e.target.value)}
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
        value={id}
        onChange={(e) => setId(e.target.value)}
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
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
            document_type_id,
            id,
            {name, surname, telephone, email, password, id, document_type_id},
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
