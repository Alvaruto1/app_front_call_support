import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ActionsCRUD from "./ActionsCRUD";
import { current_call_log, deleteCallLog } from "./callLogSlice";

export default function CallLogsTable() {
  const call_logs = useSelector((state) => state.call_log.call_log.call_logs);
  const dispatch = useDispatch();
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Registro de llamada borrado correctamente",
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
  const onClickDelete = (document_type, id) => {
    dispatch(deleteCallLog(document_type, id, okFunction, errorFunction));
  };
  const onClikEdit = (call_log) => {
      dispatch(current_call_log(call_log));
    }
  return (
    <table className="table container mt-5">
      <thead>
        <tr>
          <th scope="col">Ticket</th>
          <th scope="col">td cliente</th>
          <th scope="col">id cliente</th>
          <th scope="col">Correo cliente</th>
          <th scope="col">td empleado</th>
          <th scope="col">id empleado</th>
          <th scope="col">Correo empleado</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Categoria</th>
          <th scope="col">Hora incio</th>
          <th scope="col">Hora fin</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {call_logs.map((call_log, index) => (
          <tr key={index}>
            <th scope="row">{call_log.ticket}</th>
            <td>{call_log.employee.document_type_id.name}</td>
            <td>{call_log.employee.id}</td>
            <td>{call_log.employee.email}</td>
            <td>{call_log.client.document_type_id.name}</td>
            <td>{call_log.client.id}</td>
            <td>{call_log.client.email}</td>
            <td>{call_log.description}</td>
            <td>{call_log.category.name}</td>
            <td>{call_log.start_date_time}</td>
            <td>{call_log.end_date_time}</td>
            <td>
              <ActionsCRUD
                delete_object={() =>
                  onClickDelete(call_log.ticket)
                }
                edit_object={() => onClikEdit(call_log)}
              ></ActionsCRUD>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
