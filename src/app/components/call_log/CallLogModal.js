import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getClients } from "../client/clientSlice";

export default function ClientModal(props) {
  const { call_log, call_log_functions, action_function, title, modal_id } =
    props;

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.client.users);
  const current_user = useSelector((state) => state.user.user.user);
  const clearForm = () => {
    call_log_functions.setCategoryId("");
    call_log_functions.setDescription("");
    call_log_functions.setStartDateTime("");
    call_log_functions.setEndDateTime("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const [document_type_id, id] = call_log.client.split(" ");
    delete call_log.client;
    call_log["client_id"] = id;
    call_log["dt_client_id"] = document_type_id;
    call_log["employee_id"] = current_user.id;
    call_log["dt_employee_id"] = current_user.document_type_id.id;   
    let [start_date, start_time] = call_log.start_date_time.split("T");
    start_date = start_date.split("-").reverse().join("/");
    start_time = start_time + ":00";
    call_log.start_date_time = start_date + " " + start_time;
    let [end_date, end_time] = call_log.end_date_time.split("T");
    end_date = end_date.split("-").reverse().join("/");
    end_time = end_time + ":00";
    call_log.end_date_time = end_date + " " + end_time;
    dispatch(action_function(call_log, okFunction, errorFunction)).then(() => {
      clearForm();
    })
  };
  useEffect(() => {
    dispatch(getClients(()=>{},()=>{}));
  }, [dispatch]);
  return (
    <div
      className="modal fade"
      id={modal_id}
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
            <form className="row">
              <div className="mb-3">
                <label htmlFor="document_type_id" className="form-label">
                  Clientes
                </label>
                <select
                  id="document_type_id"
                  className="form-select"
                  value={call_log.client}
                  onChange={(e) => call_log_functions.setClient(e.target.value)}
                >
                  <option selected>Seleccione cliente</option>
                  {clients.map((client) => (
                    <option
                      key={client.email}
                      value={`${client.document_type_id.id} ${client.id}`}
                    >
                      {client.name} {client.surname} ({client.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="category_id" className="form-label">
                  Categorias
                </label>
                <select
                  id="category_id"
                  className="form-select"
                  value={call_log.category_id}
                  onChange={(e) =>
                    call_log_functions.setCategoryId(e.target.value)
                  }
                >
                  <option selected>Seleccione una categoria</option>
                  <option value="1">PQRs</option>
                  <option value="2">Soporte</option>
                  <option value="3">Otros</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="start_datetime" className="form-label">
                  Fecha y hora inicial
                </label>
                <input
                  type="datetime-local"
                  id="start_datetime"
                  name="start_datetime"
                  className="form-control"                  
                  value={call_log.start_datetime}
                  onChange={(e) =>
                    call_log_functions.setStartDateTime(e.target.value)
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end_datetime" className="form-label">
                  Fecha y hora final
                </label>
                <input
                  type="datetime-local"
                  id="end_datetime"
                  name="end_datetime"
                  className="form-control"
                  value={call_log.end_datetime}
                  onChange={(e) =>
                    call_log_functions.setEndDateTime(e.target.value)
                  }
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  Descripcion
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  value={call_log.description}
                  onChange={(e) =>
                    call_log_functions.setDescription(e.target.value)
                  }
                ></textarea>
              </div>
            </form>
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
