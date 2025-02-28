import React, { useEffect, useState } from 'react';
import * as authService from '../services/auth';

const HealthHistory: React.FC = () => {
  const [history, setHistory] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    const fetchHealthHistory = async () => {
      try {
        const data = await authService.getUserProfile(); // Adjust this to your health history endpoint
        setHistory(data.healthHistory || []);
      } catch (error) {
        console.error('Error fetching health history:', error);
      }
    };

    fetchHealthHistory();
  }, []);

  const handleAddEntry = async () => {
    if (newEntry) {
      try {
        // Call the API to add the new entry
        await authService.updateUserProfile({ healthHistory: [...history, newEntry] });
        setHistory([...history, newEntry]);
        setNewEntry('');
      } catch (error) {
        console.error('Error adding health history entry:', error);
      }
    }
  };

  return (
    <div>
      <h2>Your Health History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Add new entry"
      />
      <button onClick={handleAddEntry}>Add Entry</button>
    </div>
  );
};

export default HealthHistory;
