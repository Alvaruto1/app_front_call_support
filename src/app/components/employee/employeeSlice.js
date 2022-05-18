import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: {
    users: [],
    current_employee: {},
  },
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    get_employees: (state, action) => {
      state.employee = { ...state.employee, ...action.payload };
    },
    delete_employee: (state, action) => {
      state.employee.users = state.employee.users.filter(
        (employee) =>
          employee.id !== action.payload.employee_id &&
          employee.document_type_id !== action.payload.document_type
      );
    },
    edit_employee: (state, action) => {
      state.employee.users = state.employee.users.map((employee) =>
        employee.id === action.payload.user.id && employee.document_type_id.id === action.payload.user.document_type_id.id
          ? { ...employee, ...action.payload.user }
          : employee
      );
    },
    get_employee: (state, action) => {
      state.employee.users = [];
      state.employee.users.push(action.payload.user);
    },
    current_employee: (state, action) => {
      state.employee.current_employee = action.payload;
    },
  },
});

export const { get_employees, get_employee, delete_employee, current_employee, edit_employee } =
  employeeSlice.actions;

export function getEmployees(okFunction, errorFunction) {
  const url = "http://localhost:5000/users/employee";
  const request = fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === 500) {
            throw new Error(data.message);
          } else {
            dispatch(get_employees(data));
            okFunction();
            resolve(true);
          }
        })
        .catch((error) => {
          errorFunction(error);
          reject(error);
        });
    });
  };
}

export function getEmployee(document_type, employee_id, okFunction, errorFunction) {
  const url = `http://localhost:5000/users/search/${document_type}/${employee_id}`;
  const request = fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === 500) {
            throw new Error(data.message);
          } else {
            dispatch(get_employee(data));
            okFunction();
            resolve(true);
          }
        })
        .catch((error) => {
          errorFunction(error);
          reject(error);
        });
    });
  };
}

export function deleteEmployee(
  document_type,
  employee_id,
  okFunction,
  errorFunction
) {
  const url = `http://localhost:5000/users/${document_type}/${employee_id}`;
  const request = fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === 500) {
            throw new Error(data.message);
          } else {
            dispatch(delete_employee({ document_type, employee_id }));
            okFunction();
            resolve(true);
          }
        })
        .catch((error) => {
          errorFunction(error);
          reject(error);
        });
    });
  };
}

export function editEmployee(
  document_type,
  employee_id,
  user,
  okFunction,
  errorFunction
) {
  const url = `http://localhost:5000/users/${document_type}/${employee_id}`;
  const request = fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === 500) {
            throw new Error(data.message);
          } else {
            dispatch(edit_employee(data));
            okFunction();
            resolve(true);
          }
        })
        .catch((error) => {
          errorFunction(error);
          reject(error);
        });
    });
  };
}

export default employeeSlice.reducer;
