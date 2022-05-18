import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {
    users: [],
    current_client: {},
  },
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    get_clients: (state, action) => {
      state.client = { ...state.client, ...action.payload };
    },
    delete_client: (state, action) => {
      state.client.users = state.client.users.filter(
        (client) =>
          client.id !== action.payload.client_id &&
          client.document_type_id !== action.payload.document_type
      );
    },
    edit_client: (state, action) => {
      state.client.users = state.client.users.map((client) =>
        client.id === action.payload.user.id && client.document_type_id.id === action.payload.user.document_type_id.id
          ? { ...client, ...action.payload.user }
          : client
      );
    },
    get_client: (state, action) => {
      state.client.users = [];
      state.client.users.push(action.payload.user);
    },
    current_client: (state, action) => {
      state.client.current_client = action.payload;
    },
  },
});

export const { get_clients, get_client, delete_client, current_client, edit_client } =
  clientSlice.actions;

export function getClients(okFunction, errorFunction) {
  const url = "http://localhost:5000/users/client";
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
            dispatch(get_clients(data));
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

export function getClient(document_type, client_id, okFunction, errorFunction) {
  const url = `http://localhost:5000/users/search/${document_type}/${client_id}`;
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
            dispatch(get_client(data));
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

export function deleteClient(
  document_type,
  client_id,
  okFunction,
  errorFunction
) {
  const url = `http://localhost:5000/users/${document_type}/${client_id}`;
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
            dispatch(delete_client({ document_type, client_id }));
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

export function editClient(
  document_type,
  client_id,
  user,
  okFunction,
  errorFunction
) {
  const url = `http://localhost:5000/users/${document_type}/${client_id}`;
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
            dispatch(edit_client(data));
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

export default clientSlice.reducer;
