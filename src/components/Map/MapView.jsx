// src/components/Map/MapView.jsx

import React, { useEffect, useRef, useState } from 'react';

const MapView = ({ incidents }) => {
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 4.142, lng: -73.626 }); // Valor inicial Villavicencio

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error('Error obteniendo la ubicación:', error)
      );
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: currentLocation,
        zoom: 13,
        disableDefaultUI: true, // Desactiva la UI de Google Maps
      });

      // Añadir marcadores de incidencias al mapa
      incidents.forEach((incident) => {
        if (incident.location?.latitude && incident.location?.longitude) {
          const position = new window.google.maps.LatLng(
            incident.location.latitude,
            incident.location.longitude
          );

          let icon;

          // Definir íconos para los diferentes tipos de incidencias
          switch (incident.type) {
            case 'Evento':
              icon = 'https://img.icons8.com/color/48/000000/event.png';
              break;
            case 'Accidente/Emergencia':
              icon = 'https://img.icons8.com/color/48/000000/car-crash.png';
              break;
            case 'Obras/Mantenimiento':
              icon = 'https://img.icons8.com/color/48/000000/road-worker.png';
              break;
            case 'Restricción':
              icon = 'https://img.icons8.com/color/48/000000/no-entry.png';
              break;
            default:
              icon = undefined;
          }

          new window.google.maps.Marker({
            position,
            map,
            title: incident.type,
            icon,
          });
        }
      });
    } else {
      console.error('Google Maps no está disponible.');
    }
  }, [currentLocation, incidents]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100vh' }}
      className="absolute top-0 left-0"
    ></div>
  );
};

export default MapView;
