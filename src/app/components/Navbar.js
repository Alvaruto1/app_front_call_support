import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo_app.png";

export default function Navbar() {
  const user = useSelector((state) => {
    if (state.user.user.user) {
      return state.user.user.user.email;
    }
    return "";
  });
  const [tab_clients, setTabClients] = useState(true);
  const [tab_call_logs, setTabCallLogs] = useState(false);
  const [tab_employees, setTabEmployees] = useState(false);
  const changeTab = (tab) => {
    switch (tab) {
      case "clients":
        setTabClients(true);
        setTabCallLogs(false);
        setTabEmployees(false);
        break;
      case "call_logs":
        setTabClients(false);
        setTabCallLogs(true);
        setTabEmployees(false);
        break;
      case "employees":
        setTabClients(false);
        setTabCallLogs(false);
        setTabEmployees(true);
        break;
      default:
        break;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="" height="50" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className={`nav-link ${tab_clients ? "active" : ""}`}
              to="clients"
              onClick={() => changeTab("clients")}
            >
              Clientes
            </Link>
            <Link
              className={`nav-link ${tab_employees ? "active" : ""}`}
              to="employees"
              onClick={() => changeTab("employees")}
            >
              Empleados
            </Link>
            <Link
              className={`nav-link ${tab_call_logs ? "active" : ""}`}
              to="call_logs"
              onClick={() => changeTab("call_logs")}
            >
              Registro de llamadas
            </Link>
            <div className="nav-link">{user}</div>
          </div>
          <div className="navbar-nav d-flex flex-fill flex-row-reverse">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
