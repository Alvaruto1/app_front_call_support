import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ActionsCRUD from "./ActionsCRUD";
import { current_employee, deleteEmployee } from "./employeeSlice";

export default function EmployeesTable() {
  const employees = useSelector((state) => state.employee.employee.users);
  const dispatch = useDispatch();
  const okFunction = () => {
    Swal.fire({
      icon: "success",
      title: "Employeee borrado correctamente",
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
    dispatch(deleteEmployee(document_type, id, okFunction, errorFunction));
  };
  const onClikEdit = (employee) => {
      dispatch(current_employee(employee));
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
        {employees.map((employee, index) => (
          <tr key={index}>
            <th scope="row">{employee.id}</th>
            <th scope="row">{employee.document_type_id.name}</th>
            <td>{employee.name}</td>
            <td>{employee.surname}</td>
            <td>{employee.email}</td>
            <td>{employee.telephone}</td>
            <td>
              <ActionsCRUD
                delete_object={() =>
                  onClickDelete(employee.document_type_id.id, employee.id)
                }
                edit_object={() => onClikEdit(employee)}
              ></ActionsCRUD>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
