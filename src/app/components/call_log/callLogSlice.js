import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  call_log: {
    users: [],
    call_logs:[],
    current_call_log: {},
  },
};

export const call_logSlice = createSlice({
  name: "call_log",
  initialState,
  reducers: {
    get_call_logs_user_type: (state, action) => {
      state.call_log = { ...state.call_log, ...action.payload };
    },
    get_call_logs: (state, action) => {
      state.call_log = { ...state.call_log, ...action.payload };
    },
    delete_call_log: (state, action) => {
      state.call_log.call_logs = state.call_log.call_logs.filter(
        (call_log) =>
          call_log.id !== action.payload.call_log_id &&
          call_log.document_type_id !== action.payload.document_type
      );
    },
    edit_call_log: (state, action) => {
      state.call_log.call_logs = state.call_log.call_logs.map((call_log) =>
        call_log.id === action.payload.user.id &&
        call_log.document_type_id.id === action.payload.user.document_type_id.id
          ? { ...call_log, ...action.payload.user }
          : call_log
      );
    },
    current_call_log: (state, action) => {
      state.call_log.current_call_log = action.payload;
    },
  },
});

export const {
  get_call_logs,
  get_call_logs_user_type,
  delete_call_log,
  current_call_log,
  edit_call_log,
} = call_logSlice.actions;

export function getCallLogsUserType(user_type, okFunction, errorFunction) {
  const url = `http://localhost:5000/call_logs/${user_type}`;
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
            dispatch(get_call_logs_user_type(data));
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

export function getCallLogs(user_type, document_type, id, okFunction, errorFunction) {
  const url = `http://localhost:5000/call_logs/${user_type}/${document_type}/${id}`;
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
            dispatch(get_call_logs(data));
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

export function deleteCallLog(
  document_type,
  call_log_id,
  okFunction,
  errorFunction
) {
  const url = `http://localhost:5000/users/${document_type}/${call_log_id}`;
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
            dispatch(delete_call_log({ document_type, call_log_id }));
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

export function editCallLog(
  document_type,
  call_log_id,
  user,
  okFunction,
  errorFunction
) {
  const url = `http://localhost:5000/users/${document_type}/${call_log_id}`;
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
            dispatch(edit_call_log(data));
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

export default call_logSlice.reducer;
