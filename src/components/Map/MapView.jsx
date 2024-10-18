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
        zoom: 15,
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
              icon = 'data:image/png;base64,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';
              break;
            case 'Accidente':
              icon = 'data:image/png;base64,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';
              break;
            case 'Obras':
              icon = 'data:image/png;base64,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';
              break;
            case 'Restricción':
              icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAANHUlEQVR4nO2de3QTdRbHb8tSSKUgysM+obrLWY7uH7CKPGpp8YWPc1hcQXZ9LrqKArXKxvrAFlragq5bCy5SwNXW+kIslSPQmRRQKAW0L1Ap7ZFSDrSltEnmN5VXKb17fiEJSTOTTJJJJlNzz7nn9GQyt/f7+/x+8/tl5s4MQICbDuD6MoCpZQDzGYCVLMAWBmA/A3CYATjGAhhYgItmN9DPzNv2swAldB+6L41BYymtR3W2G+AGFmAOC1DAAjSxACizt7IAmxiAZ3cCjFFab0AaCzCeAchlABp9AMCpMwANDEB2GcAf4bdsuwFGMAApDMAP/obAivtBHcBimhv0BzMajRMJIcsJIbsJIfU8z/9Knf5NCNlFtx0vLLyfBchnAc4GAAAU8Qv0kHm8uPg+V3qoZggkQ8SQrq6uOTzPH+V5HqV4e1UVVs2ahWxIiNINjw4eEoLVs2dje3W1JC3UzbD+SttCURgcx93I8/wBqYn39dbycvxuzBjlIcAV/27sWGzdtcsjLWavNBqN8YrA4Hl+GiGk3YvkTa5vbsaDiYmKw9g/eTLqjx3zSgt1juMMXV1dyf6GMZ0QctHb5C1u7OzEPQkJisE4kJCAXGcnyqbHaLxUX19/r19gGI3GsYSQM2LJ7Pm2FnMyi/DROZl4b/ISk9O/czOLcM+3NaIizpw4gdtuusn/h6m4ONQ3NaHcevR6PV9UVHS7T2HQSUtszjh6pAkXPvsfTJqS4tQXPZeHR+uPC4po2LkTNw8Y4D8gISGic4Ycepqamhri4+NH+wxIV1fXXKF/XFlxCB+8O81l8han392/77CgiE0PP4xb/bT6qn7oIfS1ng0bNrw1cuTIIb4aHQ1CPck2+fuTX0LdxuVoLF+EF9i5Jqd/sx8sN22zirgnDRuONjsIaK6uwncHD/LL6DhT43jIkVtPS8upU7GxkXfLDoTjuFuFeoDtsH5mXhry5QvwYtksQSflz5u+Y/n+4gV5gr1q3aTb8HMfH7r2TZiA/tLz8supr0ZFRcXKCoQQkiU04dn2JGfJ24q4LznVut/e72odBOjS0/HtwYN9CuTI0qXoLz0sy26Ojo5+QG4gu/v+I7r6sCRCh7U1UeYv2FO7CHuPL8Pe4xmmv+lnlu3MxmXW/XKzPnYQ8NO2bzArXIOloaE+A3Jq2zb0l57GxoYfY2Ii/xYXFzdcNiA8zzf2/Ud/n5NpTcRYvtCaIE0YT2bbuUmEebuxfLF1v8fmZjkIOFFbYwLy4cCBPgNyptaxJ/tKT0vLqVYKJCYm5hY5gXT1/Uczk/9lTYROdpYEaU/qK4D2LMt2+l3LfjRG37j6tjYTkPxBvpvcubY29Jceg8FwngKJjo6e4Q2ABELI54SQVkLIZaHJynY1Yi8gw1FAk40A3Ty71YlQbF4B96UeQkhvR0eHgRDypVunVhDxd4SQ96QIeOaJVW4M8avbDeWLrPv988lVioPgFdBDCNmAiGFSRsYaqQJsJ8Ed6zMEJsEMwUlwR0H61Ukws0hxELxCelpbWz9xCoMQMoUOLakBq6vq7ZaJROd6mcjpFuBMm2ViTXW94iB4BfUUFha+AAChYqPjY3dFpCx415rM04+kIcc6+SG1bT4+PfcV6/dTns9XHALvSo8TKKT0ca/1HD58+GBMTMwkMSDH++6w7r0teGfC1R7gymcmLsajOU9j96Z5eHHbbJN3f/GI6TO6TWqcpADxmdNTZNEzY1oq5v37CwcgHR0dhK7A4uNHOZ6EJIScc7YUlOpp96ciarV2Tj9TunGTPHS59FAoHMfZtS+dIsaN+/1jsbGRCUJAHC463ZV49QSaFH/gjhdx7/wlDgLoZ3Sb0o2b5KbLrcegNzqMkptvHv94dHT0Q24DubTEPqmgayW1wV3TXAOhhy0AsC+SCALRKg3EfrUVBKJVOZDXXnPtr74qnuwrr0iL8ZrK4igGRIp99pl4stXV0mKoLY5cQDiDoUdWIOfPI77+unCib76J2N0tTfx5lcWRC4ixs7NXViCVleI9p6REmng1xpEDCL0lQKhYzCsg+fniiZ88Kb0B8lUWx00g9944VusAhN6fISuQtjbxpN95R7r4NhXGcRNIyuiRpUJAGmUF8vXX4onv3Su9Ab5WYRw3gSwbfm2LHZBygGjTZU25gPT0IC5bJpw0XS7++qs08T0qjeMmkJxrh+Gk0SMXWoHoAJ6QFUhdnXgvKi6WJl7NcTwA8ujwYe9ZgbAAH8oKZP168cQbG6U3wHqVxvEASGrEkN1WIAzACdmAcBxiWppw0itWIF6+LE08p+I4HgB5M1xzxgSE3uBoLY2RAwjLivciuk2qsSqO4wEQWvb0Cb3ZlAGYJhuQ3l7E3Fzx80R6vTTxvSqP4yGQbwCmAn3KgWxA6HFUrBfR469Ua1R5HM+BPEUn9FWyAaErDbHE6QpFqhWrPI6HQHYA5FIgW2QBcvbsldPSQklnZCBeuiRN/Nl+EMdzICVgfkiL90AqKsR7UWmpNPH9JY6HQMoAKugI+VEWIHl54om3tEhvgLx+EMdzIIfoCGn2GojAGU6r0zOjUu1kP4njOZAmOkL0XgMRuAZgdXrtQKqV9JM4ngPpAPODvzwHQie19HThpOlkeO6cNPH9KY7WMyAMwAXvgdTUiPeiTz+VJr6/xdF6B8S7Q9a6deKJ//KL9AboT3G0XhyyvJrU6SkDeupAKGl6qoGecpBi/S2O1rtJ3fNlb1mZeC8qL0fJ1t/iaL1b9nr+wzA7Wzhp2ruMRmniaW/rb3G03v0w9PzUiZjT6wZvvCHNxU5LaFUcx8tTJytlBxJ09ATIdoAcOkL+EQSiDRQgT9LrIVODQLQBAWQrwBQK5DqpQDzx5Kkv4qKUdfjxlioHf2nJRpwxLXDuqkr2Q64uL+GaixxMv0W49naU4x5DIaFFJT84iLw7cYniEJL8mKvQPYY8IZg9NOJqkYNtGVDHTz85ACn4b6nXo4R64ebvHUTOcOPu3iQ/ui9ypXcyr8770qF9Tzc1mUZHasSQXQ6Fck0FBQ47eOO2II+092CDAe38TpvtQkOZ96MrlWt1cbEJiLlQ7so9hixAFAWyb+JE0xBSu0heRbl+dM89mBmu6Z00evR8u3tDWICjFEpDTo7qRfIqybVizRrT6Fh6TfipuLjIaX2B5FAgugED8OeVK2UZKUEgvGjb7M3Px+xhQ01AFgyN+MrhSQ46gHG2D/gqmXw7fv+/D7Clvh45vT4IJNG7EcIZDKa2/KHwI9w4PdEEwuJzrrvuYTsYNveIfG8BwgDgxrCBdjs6c/q4cLlHSI55fS63B1KuqwcNOiz6NCD6MpO+j8IrCQ3FtWFhuEozGLNVIjIrgIGsCNeY2vL9QWH4VWgo6gCeBxdvvTnn0TMMfSiSkft5i4GT61mXLypjAFarXCSqJVcGIA9c2XaAGNvCB7WJZNWT6wV6K6FLIOZRskGlIlEtuTIA74NU2wlwEwNwSW0iWZXkygB0MwDuvRqJHt/UJJJVUa4MwNvgrpUCRDAAp9QiklUPkNbtAEPdBmIeJfNUIhLVAoQBEP5V7gaU8kAXyaoHCAPeWhlALAPQGcAiUSVADDsAxnoNxAzlQQagNwBFohqA0LbTAcwCOc3VqisIZJizzvMWyG2bAMJYgANBICnujpB9VQADwRe2HWCk5cpicITwLoEwAL+UA/juPYbUdAA30rV0EAjvCkir27/GvYDyJwbAGJxDeDEgRAcwAfxpDEAiA8AFJ3XeDkgZAKcDcHywvp+g3GI5veJtGWogLXuTPMw1PVxj3AowUREYNlDiGYAGb8pQnZVYZvkCiA9yXTZsaPsdo0akil4f96fRlURnQ8MFT8pQXZVYZvkAiKcls6K5Njf3TLhh1HOCD0NWyniOK+qbqBwlllk+ACJ3yeyhurqDV14cKfDKCaWM47jb3HmhmJQSy6xwDa7UaGSF4YuS2dzc3BXmN3nOhkAynuffkbPEMitcg2sHhckORM6S2QMHDugso8OhHFRpQ8QBbW1ta70ZKXttSiypbx7gmxcUy1EyW1lZyY4fP+4xCxDBF3sFghUUrH28trZmT3t7e4fRaHR444LUEsuCMN+MDk9LZo1G4+XTp093HjpUV5GevjTDAsJ8uLoNAthC4uIiJ9omPGX0iJSUiCE7lodruqVU+K0PC5N9MhdyZyWzmeGaSy9HXLNn+qgRL9k3vr3HxsbeGjCrK2cWFRV1fVRU1JTY2MhZsbFRj9Dk/3zDqAUvDB2yNTNcc8FZiSXrBxhiJbNZ4ZruFyOG7KSP/xaGEDWPaoqLi5oaGRl55b5AtRstoWQAFjo7pc/62elTLRiAF+iNsPBbNvOtEFkMwBEFIPzMACxnAf6gdDsEpDEAo1iAOSxAAQNwzAcQ6KWDTQzAs7ReQGm9qrOyK/fRT2YAnqIvnWEAvqJX4ViAOjMw+rwvWotMXW/+rI4FqDB/N4cBeJLG+AZguNJ6XNn/Afd7i0EUrWozAAAAAElFTkSuQmCC';
              break;
            default:
              icon = 'data:image/png;base64,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';
          }

          new window.google.maps.Marker({
            position,
            map,
            title: incident.type,
            icon: {
              url: icon,
              scaledSize: new window.google.maps.Size(30, 30), // Ajustar el tamaño del icono a 20x20 px
            },
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
      style={{ width: '100%', height: '100%' }}
      className="w-full h-50vh lg:h-screen lg:w-full"
    ></div>
  );
};

export default MapView;