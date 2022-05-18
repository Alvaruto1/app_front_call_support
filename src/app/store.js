import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/user/userSlice';
import clientReducer from './components/client/clientSlice';
import employeeReducer from "./components/employee/employeeSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    client: clientReducer,
    employee: employeeReducer,
  },
});
