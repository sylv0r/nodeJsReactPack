import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './component/home/Home';
import LoginAndRegister from './component/login/Login';
import Navbar from './component/navbar/Navbar';
import AdminPanel from './component/adminPage/AdminPanel';
import AddData from './component/data/addData/AddData'
import './index.css'
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginAndRegister />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/data' element={<AddData />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);