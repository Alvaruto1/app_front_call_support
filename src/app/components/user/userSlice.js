import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    sign_up: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    log_in: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    is_log_in: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    log_out: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { sign_up, log_in, log_out, is_log_in } = userSlice.actions;

export function signUp(user, okFunction, errorFunction) {
  const url = "http://localhost:5000/signup";
  const request = fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
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
            dispatch(sign_up(data));
            okFunction();
            localStorage.setItem("jwt-token", data.token);
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

export function logIn(user, okFunction, errorFunction) {
  const url = "http://localhost:5000/login";
  const request = fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === 401 || data.status === 422) {
            throw new Error(data.message);
          } else {
            localStorage.setItem("jwt-token", data.token);
            dispatch(log_in(data));
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

export function isLogIn() {
  const url = "http://localhost:5000/logged_in";
  const request = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`,
    },
  });
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request
        .then((response) => {
          if (response.status === 401 || response.status === 422) {
            dispatch(is_log_in({ is_logged_in: false }));
            localStorage.setItem("jwt-token", "");
            reject(response.message);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          dispatch(is_log_in({ is_logged_in: data.is_logged_in }));
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function logOut() {
  return (dispatch) => {
      return new Promise((resolve, reject) => {
        localStorage.setItem("jwt-token", "");
        dispatch(log_out());
        setTimeout(() => {resolve(true);}, 200)        
      })    
  };
}

export default userSlice.reducer;
