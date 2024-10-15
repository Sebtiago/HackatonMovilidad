// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ReportIncident from './pages/ReportIncident';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Ruta pública para iniciar sesión */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta protegida para la página principal */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        
        {/* Ruta protegida para registrar incidencias */}
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <ReportIncident />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;