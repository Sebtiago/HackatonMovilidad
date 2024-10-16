// src/pages/Home.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdLogout, MdEvent, MdReportProblem, MdConstruction, MdBlock } from 'react-icons/md';
import { useFetchIncidents } from '../Hooks/useFetchIncidents';
import MapView from '../components/Map/MapView';

const Home = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { incidents, loading } = useFetchIncidents();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  const handleReportIncidentClick = () => {
    navigate('/report');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-6 relative">
      {/* Mapa de fondo */}
      <MapView incidents={incidents} />

      {/* Contenido sobre el mapa */}
      <div className="absolute top-0 left-0 w-full z-10 flex flex-col items-center px-4 py-6">
        {/* Header */}
        <header className="w-full max-w-lg bg-white rounded-md shadow-md p-4 flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-primary">MovilInfo</h1>
          <button onClick={handleLogout} className="text-error hover:text-red-600 transition duration-200">
            <MdLogout size={24} />
          </button>
        </header>

        {/* Welcome Message */}
        <div className="w-full max-w-lg bg-white rounded-md shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Hola, {currentUser?.email}</h2>
          <p className="text-secondary">Bienvenido a MovilInfo. Aquí podrás ver y gestionar las incidencias de tráfico en tu ciudad.</p>
        </div>

        {/* Card: Reportar Incidencia */}
        <div
          className="w-full max-w-lg bg-primary text-white rounded-md shadow-md p-4 flex items-center cursor-pointer hover:bg-primary-dark transition duration-200 mb-6"
          onClick={handleReportIncidentClick}
        >
          <MdLocationOn size={36} className="mr-4" />
          <div>
            <h3 className="text-xl font-bold">Reportar Incidencia</h3>
            <p className="text-sm">Registra un incidente de tráfico en tiempo real.</p>
          </div>
        </div>

        {/* Lista de Incidencias */}
        <div className="w-full max-w-lg bg-white rounded-md shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-primary mb-4">Incidencias Reportadas</h2>
          {loading ? (
            <p>Cargando incidencias...</p>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="flex items-center p-4 bg-gray-100 rounded-lg">
                  {incident.type === 'Evento' && <MdEvent size={32} className="mr-4 text-primary" />}
                  {incident.type === 'Accidente/Emergencia' && <MdReportProblem size={32} className="mr-4 text-primary" />}
                  {incident.type === 'Obras/Mantenimiento' && <MdConstruction size={32} className="mr-4 text-primary" />}
                  {incident.type === 'Restricción' && <MdBlock size={32} className="mr-4 text-primary" />}
                  <div>
                    <h3 className="font-bold text-lg">{incident.type}</h3>
                    <p className="text-sm text-secondary">{incident.address}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
