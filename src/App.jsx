// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ReportIncident from './pages/ReportIncident';
import CitizenView from './pages/CitizenView';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ruta de Login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta Pública para Ver la Página de Ciudadanos */}
          <Route path="/mapa" element={<CitizenView />} />

          {/* Ruta Privada para Reportar una Incidencia */}
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <ReportIncident />
              </PrivateRoute>
            }
          />

          {/* Ruta Pública para la Página Principal */}
          <Route path="/" element={<Home />} />

          {/* Redirección para Rutas Desconocidas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
