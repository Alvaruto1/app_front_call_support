import React, { useState } from "react";
import { signUp } from "../user/userSlice";
import ClientsTable from "./ClientsTable";
import FormSearch from "./FormSearch";
import ClientModal from "./ClientModal";
import ClientEditModal from "./ClientEditModal";
import { editClient } from "./clientSlice";

export default function ClientPage() {
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
  const role_name = "Cliente";
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
      setUrlDownload(`http://localhost:5000/users/download/client`);
    }
  };
  return (
    <>
      <h2 className="text-center">Clientes</h2>
      <FormSearch
        setActivedButton={setActivedButton}
        id={id_s}
        document_type_id={document_type_id_s}
        setId={setIdS}
        setDocumentType={setDocumentTypeS}
      ></FormSearch>
      <ClientsTable></ClientsTable>
      <div className="d-flex justify-content-center align-items-center">
        <button
          className="btn btn-success mx-2"
          data-bs-target="#client_modal_create"
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
      <ClientModal
        title="Crear cliente"
        modal_id="client_modal_create"
        user={user}
        user_functions={user_functions}
        action_function={signUp}
      ></ClientModal>
      <ClientEditModal
        title="Editar cliente"
        modal_id="client_modal_edit"
        action_function={editClient}
      ></ClientEditModal>
    </>
  );
}
