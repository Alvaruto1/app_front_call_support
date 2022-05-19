import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import Login from './app/components/user/Login';
import Signup from './app/components/user/Signup';
import Home from './app/components/Home';
import Logout from './app/components/user/Logout';
import ClientPage from './app/components/client/ClientPage';
import EmployeePage from './app/components/employee/EmployeePage';
import CallLogPage from './app/components/call_log/CallLogPage';

function App() {
  return (
    <div className="App bg-light">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/signup" element={<Signup />} />
          <Route children path="/" element={<Home />}>
            <Route path="clients" element={<ClientPage />} />
            <Route path="employees" element={<EmployeePage />} />
            <Route path="call_logs" element={<CallLogPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
