// src/pages/ReportIncident.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { incidentsCollection } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MdEvent, MdReportProblem, MdConstruction, MdBlock, MdGpsFixed } from 'react-icons/md';

const ReportIncident = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedIncident, setSelectedIncident] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 4.142, lng: -73.626 });
  const [address, setAddress] = useState('');

  // Cargar la API de Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Obtener la ubicación actual del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);
        },
        (error) => console.error('Error obteniendo la ubicación:', error)
      );
    }
  }, []);

  // Obtener la dirección a partir de la latitud y longitud
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
    }
  };

  // Manejar clic en el mapa para colocar el marcador
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    fetchAddress(lat, lng);
  };

  // Usar GPS para actualizar la ubicación
  const handleGpsClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);
        },
        (error) => console.error('Error obteniendo la ubicación:', error)
      );
    }
  };

  // Enviar el reporte de incidencia
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedIncident || !markerPosition) {
      alert('Por favor selecciona un tipo de incidencia y una ubicación en el mapa.');
      return;
    }
    try {
      await addDoc(incidentsCollection, {
        type: selectedIncident,
        location: {
          latitude: markerPosition.lat,
          longitude: markerPosition.lng,
        },
        address,
        user: currentUser?.email || 'Anónimo',
        severity: 1, // Default severity, puede actualizarse si es necesario
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      navigate('/');
    } catch (error) {
      console.error('Error al reportar la incidencia:', error);
    }
  };

  // Mostrar mapa cargando
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-6">
      {/* Header */}
      <header className="w-full max-w-lg rounded-md shadow-md p-4 flex items-center justify-center mb-6 bg-primary">
        <h1 className="text-2xl font-semibold text-white">Reportar Incidencia</h1>
      </header>

      {/* Tipo de Incidencia */}
      <div className="w-full max-w-lg bg-white rounded-md shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-primary mb-4">Selecciona el tipo de incidencia</h2>
        <div className="flex justify-around space-x-2">
          {[
            { type: 'Evento', icon: <MdEvent size={42} /> },
            { type: 'Accidente/Emergencia', icon: <MdReportProblem size={42} /> },
            { type: 'Obras/Mantenimiento', icon: <MdConstruction size={42} /> },
            { type: 'Restricción', icon: <MdBlock size={42} /> },
          ].map(({ type, icon }) => (
            <button
              key={type}
              className={`p-4 w-1/4 rounded-lg ${
                selectedIncident === type ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
              onClick={() => setSelectedIncident(type)}
            >
              {icon}
              <p>{type}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Mapa */}
      <div className="w-full max-w-lg h-80 mb-6">
        <GoogleMap
          center={currentLocation}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onClick={handleMapClick}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </div>

      {/* Dirección */}
      <div className="w-full max-w-lg bg-white rounded-md shadow-md p-6 mb-6 flex justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary mb-2">Dirección seleccionada</h2>
          <p className="text-secondary mb-4">{address}</p>
        </div>
        <button
          onClick={handleGpsClick}
          className="flex items-center space-x-2 w-16 h-16 border-primary bg-gray-200 text-primary rounded-md p-2 font-bold hover:bg-primary transition duration-200 hover:text-gray-200"
        >
          <MdGpsFixed size={32} className="m-auto" />
        </button>
      </div>

      {/* Botón de Enviar */}
      <button
        onClick={handleSubmit}
        className="w-full max-w-lg bg-secondary text-white rounded-md p-4 font-bold hover:bg-secondary-dark transition duration-200"
      >
        Reportar Incidencia
      </button>
    </div>
  );
};

export default ReportIncident;