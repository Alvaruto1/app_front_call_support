import React, { useState } from "react";
import { createCallLog } from "./callLogSlice";
import CallLogsTable from "./CallLogsTable";
import FormSearch from "./FormSearch";
import CallLogModal from "./CallLogModal";
import CallLogEditModal from "./CallLogEditModal";
import { editCallLog } from "./callLogSlice";

export default function CallLogPage() {
  const [id_s, setIdS] = useState("");
  const [document_type_id_s, setDocumentTypeS] = useState("1");
  const [actived_button, setActivedButton] = useState("");
  const [user_type, setUserType] = useState("client");
  const [url_download, setUrlDownload] = useState("");

  
  const [client, setClient] = useState("");
    const [category_id, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [start_date_time, setStartDateTime] = useState("");
  const [end_date_time, setEndDateTime] = useState("");
  
  const call_log = {
    client,
    description,
    start_date_time,
    end_date_time,
    category_id
  };

  const call_log_functions = {
    setClient,
    setDescription,
    setStartDateTime,
    setEndDateTime,
    setCategoryId
  };

  const onClickDownload = () => {
    if (actived_button === "search") {
      setUrlDownload(
        `http://localhost:5000/call_logs/download/${document_type_id_s}/${id_s}`
      );
    } else if (actived_button === "all") {
      setUrlDownload(`http://localhost:5000/call_logs/download/all`);
    }
  };
  return (
    <>
      <h2 className="text-center">Registro de llamadas</h2>
      <FormSearch
        setActivedButton={setActivedButton}
        id={id_s}
        document_type_id={document_type_id_s}
        setId={setIdS}
        setDocumentType={setDocumentTypeS}
        user_type={user_type}
        setUserType={setUserType}
      ></FormSearch>
      <CallLogsTable></CallLogsTable>
      <div className="d-flex justify-content-center align-items-center">
        <button
          className="btn btn-success mx-2"
          data-bs-target="#call_log_modal_create"
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
      <CallLogModal
        title="Crear registro de llamada"
        modal_id="call_log_modal_create"
        call_log={call_log}
        call_log_functions={call_log_functions}
        action_function={createCallLog}
      ></CallLogModal>
      <CallLogEditModal
        title="Editar registro de llamada"
        modal_id="call_log_modal_edit"
        action_function={editCallLog}
      ></CallLogEditModal>
    </>
  );
}
