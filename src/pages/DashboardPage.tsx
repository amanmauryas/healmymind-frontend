import React from 'react';
import { useAuth } from '../context/AuthContext';
import HealthHistory from '../components/HealthHistory';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl text-white">Welcome, {user?.username}</h1>
      <HealthHistory />
    </div>
  );
};

export default DashboardPage;
