import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/user/userSlice';
import clientReducer from './components/client/clientSlice';
import call_logReducer from "./components/call_log/callLogSlice";
import employeeReducer from "./components/employee/employeeSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    client: clientReducer,
    employee: employeeReducer,
    call_log: call_logReducer,
  },
});
