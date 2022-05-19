import React, { useState } from "react";
import { signUp } from "../user/userSlice";
import EmployeesTable from "./EmployeesTable";
import FormSearch from "./FormSearch";
import EmployeeModal from "./EmployeeModal";
import EmployeeEditModal from "./EmployeeEditModal";
import { editEmployee } from "./employeeSlice";

export default function EmployeePage() {
  const [id_s, setIdS] = useState("");
  const [document_type_id_s, setDocumentTypeS] = useState("1");
  const [actived_button, setActivedButton] = useState("");
  const [url_download, setUrlDownload] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [id, setId] = useState("");
  const [document_type_id, setDocumentType] = useState("");
  const role_name = "Empleado";  
  const user = {
    email,
    password,
    id,
    document_type_id,
    name,
    surname,
    telephone,
    role_name
  };

  const user_functions = {
    setEmail,
    setPassword,
    setName,
    setSurname,
    setTelephone,
    setId,
    setDocumentType,
  };

  const onClickDownload = () => {
    if (actived_button === "search") {
      setUrlDownload(
        `http://localhost:5000/users/download/${document_type_id_s}/${id_s}`
      );
    } else if (actived_button === "all") {
      setUrlDownload(`http://localhost:5000/users/download/employee`);
    }
  };
  return (
    <>
      <h2 className="text-center">Empleados</h2>
      <FormSearch
        setActivedButton={setActivedButton}
        id={id_s}
        document_type_id={document_type_id_s}
        setId={setIdS}
        setDocumentType={setDocumentTypeS}
      ></FormSearch>
      <EmployeesTable></EmployeesTable>
      <div className="d-flex justify-content-center align-items-center">
        <button
          className="btn btn-success mx-2"
          data-bs-target="#employee_modal_create"
          data-bs-toggle="modal"
          data-bs-whatever="@mdo"
        >
          Adicionar
        </button>
        <a
          href={url_download}
          className="btn btn-secondary mx-2"
          hidden={actived_button === ""}
          onClick={() => {
            onClickDownload();
          }}
        >
          Descargar csv
        </a>
      </div>
      <EmployeeModal
        title="Crear empleado"
        modal_id="employee_modal_create"
        user={user}
        user_functions={user_functions}
        action_function={signUp}
      ></EmployeeModal>
      <EmployeeEditModal
        title="Editar empleado"
        modal_id="employee_modal_edit"
        action_function={editEmployee}
      ></EmployeeEditModal>
    </>
  );
}
