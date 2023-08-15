import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './mau/home';
import App from './App';
import Login from './mau/na';
import { Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Globalstyle from './mau/Globalstyle';
import reportWebVitals from './reportWebVitals';
import Sidebarstate from './Layout/Header/Sidebarstate';
import AddProductForm from './Layout/Addproduct';
import Productdetail from './Layout/Content/Productdetail';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
        <Route path="/" element={ <Globalstyle>
          <Sidebarstate>
          <Home/>
          </Sidebarstate>

        </Globalstyle>} />
       
        <Route path="/product/:id" element={<Productdetail></Productdetail>} />
        <Route path="/add" element={<AddProductForm/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>
  
  </Router>
  
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
