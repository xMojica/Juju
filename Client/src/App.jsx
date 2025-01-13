import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Components/Utils/ProtectedRoute';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import Editar from './Components/Libros/Editar'
import Agregar from './Components/Libros/Agregar'
import Libros from './Components/Libros/Libros';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Libros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editar" element={<ProtectedRoute element={Editar} />} />
        <Route path="/agregar" element={<ProtectedRoute element={Agregar} />} />

      </Routes>
    </Router>
  );
}

export default App;