// src/Hooks/useIncidents.jsx

import { useState, useEffect } from 'react';
import { getDocs } from 'firebase/firestore';
import { incidentsCollection } from '../services/firebaseConfig';

const useIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const snapshot = await getDocs(incidentsCollection);
        const incidentsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIncidents(incidentsList);
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

export default useIncidents;
