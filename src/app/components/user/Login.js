import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logIn } from "./userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Logged in successfully",
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
    dispatch(logIn({ email, password }, okFunction, errorFunction)).then(() => {
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
          <div className="fs-1 text-center m-2">Iniciar Sesión</div>
          <div className="fs-6 text-center fw-light fst-italic text-primary mb-5">
            App Call Support
          </div>
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
          </div>
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
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>
          <div className="m-3 d-flex justify-content-center">
            <Link to="/signup">Registrese</Link>
          </div>
        </form>
      </div>
    </>
  );
}
