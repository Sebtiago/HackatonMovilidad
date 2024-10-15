// src/pages/Home.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdLogout } from 'react-icons/md';

const Home = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-6">
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

      {/* Action Cards */}
      <div className="w-full max-w-lg grid grid-cols-1 gap-4">
        {/* Card: Reportar Incidencia */}
        <div className="bg-primary text-white rounded-md shadow-md p-4 flex items-center cursor-pointer hover:bg-primary-dark transition duration-200">
          <MdLocationOn size={36} className="mr-4" />
          <div>
            <h3 className="text-xl font-bold">Reportar Incidencia</h3>
            <p className="text-sm">Registra un incidente de tráfico en tiempo real.</p>
          </div>
        </div>

        {/* Card: Ver Incidencias */}
        <div className="bg-secondary text-white rounded-md shadow-md p-4 flex items-center cursor-pointer hover:bg-secondary-dark transition duration-200">
          <MdLocationOn size={36} className="mr-4" />
          <div>
            <h3 className="text-xl font-bold">Ver Incidencias</h3>
            <p className="text-sm">Explora el mapa y consulta las incidencias activas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;