import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface Test {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive';
  questions: Question[];
  lastModified: string;
}

interface TestManagementProps {
  tests: Test[];
  onAddTest: (test: Test) => void;
  onDeleteTest: (id: string) => void;
  onUpdateTest: (test: Test) => void;
}

const TestManagement: React.FC<TestManagementProps> = ({
  tests,
  onAddTest,
  onDeleteTest,
  onUpdateTest
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTest, setNewTest] = useState<Partial<Test>>({
    name: '',
    category: '',
    description: '',
    questions: []
  });
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    text: '',
    options: ['', '', '', '']
  });

  const handleAddQuestion = () => {
    if (currentQuestion.text && currentQuestion.options?.every(opt => opt.trim())) {
      setNewTest(prev => ({
        ...prev,
        questions: [
          ...(prev.questions || []),
          {
            id: Math.random().toString(36).substr(2, 9),
            text: currentQuestion.text!,
            options: currentQuestion.options!
          }
        ]
      }));
      setCurrentQuestion({ text: '', options: ['', '', '', ''] });
    }
  };

  const handleSubmit = () => {
    if (newTest.name && newTest.category && newTest.questions?.length) {
      onAddTest({
        ...newTest,
        id: Math.random().toString(36).substr(2, 9),
        status: 'active',
        lastModified: new Date().toISOString().split('T')[0],
      } as Test);
      setNewTest({ name: '', category: '', description: '', questions: [] });
      setShowAddModal(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-white">Test Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
        >
          <Plus size={18} className="mr-2" />
          Add Test
        </button>
      </div>

      {/* Tests Table */}
      <div className="bg-gray-800 shadow-sm rounded-lg border border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {tests.map((test) => (
                <tr key={test.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {test.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {test.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {test.questions.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      test.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => onUpdateTest(test)}
                      className="text-purple-400 hover:text-purple-300 mr-3"
                      title="Edit test"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDeleteTest(test.id)}
                      className="text-red-400 hover:text-red-300"
                      title="Delete test"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Test Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Add New Test</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Test Name
                  </label>
                  <input
                    type="text"
                    value={newTest.name}
                    onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newTest.category}
                    onChange={(e) => setNewTest({ ...newTest, category: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newTest.description}
                  onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-md font-medium text-white mb-4">Questions</h4>
                {newTest.questions?.map((q, idx) => (
                  <div key={q.id} className="mb-4 p-4 bg-gray-700 rounded-lg">
                    <p className="text-white mb-2">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="ml-4">
                      {q.options.map((opt, i) => (
                        <p key={i} className="text-gray-300">
                          {String.fromCharCode(65 + i)}. {opt}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Question Text
                    </label>
                    <input
                      type="text"
                      value={currentQuestion.text}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                      className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    {currentQuestion.options?.map((opt, idx) => (
                      <div key={idx}>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Option {String.fromCharCode(65 + idx)}
                        </label>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOptions = [...currentQuestion.options!];
                            newOptions[idx] = e.target.value;
                            setCurrentQuestion({ ...currentQuestion, options: newOptions });
                          }}
                          className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleAddQuestion}
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                  >
                    <Plus size={18} className="mr-2" />
                    Add Question
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                >
                  <Save size={18} className="mr-2" />
                  Save Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestManagement;
