import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  // Redirect if not admin
  if (!user?.isAdmin) {
    navigate('/login');
    return null;
  }

  const tabs = [
    { id: 'users', label: 'User Management' },
    { id: 'tests', label: 'Test Management' },
    { id: 'content', label: 'Content Management' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white shadow rounded-lg">
          {/* Admin Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'users' && (
              <div>
                <h2 className="text-lg font-medium mb-4">User Management</h2>
                <div className="bg-white shadow-sm rounded-lg border">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="border rounded-md px-4 py-2 w-64"
                      />
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Add User
                      </button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Sample user row */}
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                admin@example.com
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Admin
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tests' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Test Management</h2>
                <div className="bg-white shadow-sm rounded-lg border">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <input
                        type="text"
                        placeholder="Search tests..."
                        className="border rounded-md px-4 py-2 w-64"
                      />
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Create Test
                      </button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Test Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Sample test row */}
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              Depression Assessment
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Mental Health
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Content Management</h2>
                <div className="bg-white shadow-sm rounded-lg border">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <input
                        type="text"
                        placeholder="Search content..."
                        className="border rounded-md px-4 py-2 w-64"
                      />
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Add Content
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {/* Sample content card */}
                      <div className="bg-white border rounded-lg overflow-hidden">
                        <div className="p-4">
                          <h3 className="text-lg font-medium">Homepage Banner</h3>
                          <p className="text-sm text-gray-500 mt-1">Last updated: 2 days ago</p>
                          <div className="mt-4 flex justify-end space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-lg font-medium mb-4">Settings</h2>
                <div className="bg-white shadow-sm rounded-lg border">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">General Settings</h3>
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Site Name
                            </label>
                            <input
                              type="text"
                              className="mt-1 block w-full border rounded-md px-3 py-2"
                              defaultValue="CerebroQ"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Contact Email
                            </label>
                            <input
                              type="email"
                              className="mt-1 block w-full border rounded-md px-3 py-2"
                              defaultValue="admin@cerebroq.com"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
