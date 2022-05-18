import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ActionsCRUD from "./ActionsCRUD";
import { current_client, deleteClient } from "./clientSlice";

export default function ClientsTable() {
  const clients = useSelector((state) => state.client.client.users);
  const dispatch = useDispatch();
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Cliente borrado correctamente",
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
    dispatch(deleteClient(document_type, id, okFunction, errorFunction));
  };
  const onClikEdit = (client) => {
      dispatch(current_client(client));
    }
  return (
    <table className="table container mt-5">
      <thead>
        <tr>
          <th scope="col"># Identificación</th>
          <th scope="col">Tipo documento</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Correo</th>
          <th scope="col">Telefono</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client, index) => (
          <tr key={index}>
            <th scope="row">{client.id}</th>
            <th scope="row">{client.document_type_id.name}</th>
            <td>{client.name}</td>
            <td>{client.surname}</td>
            <td>{client.email}</td>
            <td>{client.telephone}</td>
            <td>
              <ActionsCRUD
                delete_object={() =>
                  onClickDelete(client.document_type_id.id, client.id)
                }
                edit_object={() => onClikEdit(client)}
              ></ActionsCRUD>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
