import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg shadow-md group-hover:shadow-purple-500/30 transition-all duration-300">
            </div>
            <span className="text-xl font-bold gradient-text">neuralytics.ai</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/tests" className="hover:text-purple-400 transition-colors">Tests</Link>
            <Link to="/blog" className="hover:text-purple-400 transition-colors">Blog</Link>
            <Link to="/chat" className="hover:text-purple-400 transition-colors">Chat Support</Link>
            <Link to="/about" className="hover:text-purple-400 transition-colors">About</Link>
            <Link to="/resources" className="hover:text-purple-400 transition-colors">Resources</Link>
            {isAuthenticated && user?.isAdmin && (
              <Link to="/admin" className={`hover:text-purple-400 transition-colors ${
                location.pathname === '/admin' ? 'text-purple-400' : ''
              }`}>Admin</Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center ml-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                aria-label="Logout"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="ml-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-300"
                aria-label="Login"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-3 pb-3">
            <Link 
              to="/" 
              className="hover:bg-gray-800 px-3 py-2 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/tests" 
              className="hover:bg-gray-800 px-3 py-2 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tests
            </Link>
            <Link 
              to="/blog" 
              className="hover:bg-gray-800 px-3 py-2 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/chat" 
              className="hover:bg-gray-800 px-3 py-2 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Chat Support
            </Link>
            <Link 
              to="/about" 
              className="hover:bg-gray-800 px-3 py-2 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/resources" 
              className="hover:bg-gray-800 px-3 py-2 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            {isAuthenticated && user?.isAdmin && (
              <Link 
                to="/admin" 
                className="hover:bg-gray-800 px-3 py-2 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left hover:bg-gray-800 px-3 py-2 rounded transition-colors"
                aria-label="Logout"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
