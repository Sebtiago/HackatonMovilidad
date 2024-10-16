// src/pages/Home.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
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

  const getIconByType = (type) => {
    switch (type) {
      case 'Evento':
        return 'https://img.icons8.com/?size=100&id=yHeF9urVx2aM&format=png&color=000000'; // Icono de evento más relacionado con festivales
      case 'Accidente/Emergencia':
        return 'https://img.icons8.com/?size=100&id=SLx9kZV_N4bX&format=png&color=000000'; // Icono mejorado para accidente
      case 'Obras/Mantenimiento':
        return 'https://img.icons8.com/?size=100&id=IehwIxC2RfhW&format=png&color=000000';
      case 'Restricción':
        return 'https://img.icons8.com/?size=100&id=bVi0CgNVrmmc&format=png&color=000000';
      default:
        return 'https://img.icons8.com/?size=100&id=Ju3Ck2nsKKej&format=png&color=000000';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-start px-4 py-6 relative">
      {/* Contenedor izquierdo: Mensaje de bienvenida, botón de reporte y lista de incidencias */}
      <div className="w-full lg:w-1/5 flex flex-col items-center space-y-6 lg:space-y-4 lg:mr-4">
        {/* Header */}
        <header className="w-full bg-white rounded-md shadow-md p-4 flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-primary">MovilInfo</h1>
          <button onClick={handleLogout} className="text-error hover:text-red-600 transition duration-200">
            <MdLogout size={24} />
          </button>
        </header>

        {/* Welcome Message */}
        <div className="w-full bg-white rounded-md shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Hola, {currentUser?.email}</h2>
          <p className="text-secondary">
            Bienvenido a MovilInfo. Aquí podrás ver y gestionar las incidencias de tráfico en tu ciudad.
          </p>
        </div>

        {/* Card: Reportar Incidencia */}
        <div
          className="w-full bg-primary text-white rounded-md shadow-md p-4 flex items-center cursor-pointer hover:bg-primary-dark transition duration-200"
          onClick={handleReportIncidentClick}
        >
          <img
            src="https://img.icons8.com/?size=100&id=j1rPetruM5Fl&format=png&color=000000"
            alt="Reportar"
            className="mr-4 w-10"
          />
          <div>
            <h3 className="text-xl font-bold">Reportar Incidencia</h3>
            <p className="text-sm">Registra un incidente de tráfico en tiempo real.</p>
          </div>
        </div>

        {/* Lista de Incidencias */}
        <div className="w-full bg-white rounded-md shadow-md p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Últimas Incidencias Reportadas</h2>
          {loading ? (
            <p>Cargando incidencias...</p>
          ) : (
            <div className="space-y-4">
              {incidents.slice(0, 4).map((incident) => (
                <div key={incident.id} className="flex items-center p-4 bg-gray-100 rounded-lg">
                  <img
                    src={getIconByType(incident.type)}
                    alt={incident.type}
                    className="w-8 h-8 mr-4 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-primary mb-1">{incident.type}</h3>
                    <p className="text-sm text-secondary mb-1">{incident.address || 'Dirección no especificada'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contenedor derecho: Mapa */}
      <div className="w-full lg:w-4/5 h-full lg:h-screen lg:sticky top-0">
        <MapView incidents={incidents} />
      </div>
    </div>
  );
};

export default Home;
