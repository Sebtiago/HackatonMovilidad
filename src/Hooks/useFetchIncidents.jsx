// src/Hooks/useFetchIncidents.jsx

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

// Utiliza un named export para que podamos importar correctamente
export const useFetchIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'incidents'));
        const incidentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIncidents(incidentsData);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  return { incidents, loading };
};