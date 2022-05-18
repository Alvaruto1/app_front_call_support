import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signUp } from "./userSlice";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [id, setId] = useState("");
  const [document_type_id, setDocumentType] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Signed up successfully",
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
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUp(
        { email, password, id, document_type_id, name, surname, telephone, role_name: "Empleado" },
        okFunction,
        errorFunction
      )
    ).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <form
          className="shadow-sm pt-5 px-5 pb-2 bg-body rounded"
          onSubmit={onSubmit}
        >
          <div className="fs-1 text-center m-2">Registrarse</div>
          <div className="fs-6 text-center fw-light fst-italic text-primary mb-5">
            App Call Support
          </div>
          <div className="row">
            <div className="mb-3 col-6">
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
            </div>
            <div className="mb-3 col-6">
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
            </div>
            <div className="mb-3 col-3">
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
            </div>
            <div className="mb-3 col-9">
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
            <div className="mb-3 col-6">
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
            </div>
            <div className="mb-3 col-6">
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
            </div>
            <div className="mb-3 offset-md-3 col-6">
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
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>
            <div className="col m-3 d-flex justify-content-center">
              <Link to="/login">Ya esta registrado?</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
