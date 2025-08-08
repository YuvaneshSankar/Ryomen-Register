// App.js
import React, { useState } from 'react';
import axios from 'axios';

// Create Axios instance with base URL for backend
const API = axios.create({ baseURL: 'http://localhost:8000' });

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('profile'); // 'profile' or 'users'
  const [pageTransition, setPageTransition] = useState(false);

  const navigateToPage = (page) => {
    setPageTransition(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageTransition(false);
    }, 300);
  };

  return (
    <div className="App" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className={`transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
        {currentPage === 'profile' ? (
          <ProfileForm navigateToPage={navigateToPage} />
        ) : (
          <UserList navigateToPage={navigateToPage} />
        )}
      </div>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.8);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        * {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', system-ui, sans-serif;
          background: #000;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

// ProfileForm Component (Page 1)
const ProfileForm = ({ navigateToPage }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    age: '',
    fathername: ''
  });
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.fathername) {
      setIsAnimating(true);
      try {
        // POST user to backend endpoint /register
        await API.post('/register', formData);
        setTimeout(() => {
          setFormData({ name: '', age: '', fathername: '' });
          setIsAnimating(false);
          navigateToPage('users');
        }, 1200);
      } catch (error) {
        alert('Error registering sorcerer. Please try again.');
        setIsAnimating(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-red-900 relative overflow-hidden">
      {/* Background Character Image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'hue-rotate(280deg) saturate(1.5) contrast(1.2)'
        }}
      />
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-60"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: `linear-gradient(45deg, #60a5fa, #a855f7, #ef4444)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent mb-4 font-mono tracking-wider animate-glow">
              呪術廻戦
            </h1>
            <h2 className="text-3xl text-white font-bold tracking-wide opacity-90 animate-float">
              SORCERER REGISTRY
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>
          {/* Form Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-lg animate-glow"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/40 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-blue-300 font-semibold tracking-wide flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                    Sorcerer Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/70 border border-blue-500/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 hover:border-blue-400/70"
                    placeholder="Enter your name..."
                    required
                    autoComplete="off"
                  />
                </div>
                {/* Age Input */}
                <div className="space-y-2">
                  <label className="text-purple-300 font-semibold tracking-wide flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/70 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300 hover:border-purple-400/70"
                    placeholder="Enter your age..."
                    required
                    autoComplete="off"
                    min="1"
                  />
                </div>
                {/* Father's Name Input */}
                <div className="space-y-2">
                  <label className="text-red-300 font-semibold tracking-wide flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                    Bloodline Holder
                  </label>
                  <input
                    type="text"
                    name="fathername"
                    value={formData.fathername}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/70 border border-red-500/50 rounded-lg text-white placeholder-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 focus:outline-none transition-all duration-300 hover:border-red-400/70"
                    placeholder="Enter Bloodline Holder..."
                    required
                    autoComplete="off"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isAnimating}
                  className={`w-full py-4 mt-8 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white font-bold text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 focus:outline-none focus:ring-4 focus:ring-purple-500/30 relative overflow-hidden ${
                    isAnimating ? 'scale-110 animate-pulse' : ''
                  }`}
                >
                  {isAnimating && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
                  )}
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {isAnimating ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>REGISTERING SORCERER...</span>
                      </>
                    ) : (
                      <span>⚡ REGISTER SORCERER ⚡</span>
                    )}
                  </div>
                </button>

                {/* Link to Users */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => navigateToPage('users')}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline font-semibold"
                  >
                    🔍 View All Registered Sorcerers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// UserList Component (Page 2)
const UserList = ({ navigateToPage }) => {
  const [visibleCards, setVisibleCards] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await API.get('/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    }
    fetchUsers();
  }, []);

  React.useEffect(() => {
    setVisibleCards([]);
    users.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
      }, index * 200);
    });
  }, [users]);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-indigo-900 via-black to-purple-900 relative">
      {/* Background Character Image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1621570180008-de3b5cecbc40?w=1200&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'hue-rotate(240deg) saturate(1.2) contrast(1.1)'
        }}
      />
      {/* Floating cursed energy orbs */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-70"
            style={{
              width: `${Math.random() * 12 + 6}px`,
              height: `${Math.random() * 12 + 6}px`,
              background: `linear-gradient(${Math.random() * 360}deg, #8b5cf6, #3b82f6, #6366f1)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4 font-mono tracking-wider animate-glow">
            呪術師名簿
          </h1>
          <h2 className="text-3xl text-white font-bold tracking-wide opacity-90 mb-6 animate-float">
            REGISTERED SORCERERS DATABASE
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <button
            onClick={() => navigateToPage('profile')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/30"
          >
            ✨ Add New Sorcerer ✨
          </button>
        </div>

        {/* User Cards */}
        {users.length === 0 ? (
          <div className="text-center animate-fade-in">
            <div className="bg-black/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 max-w-lg mx-auto animate-float">
              <div className="text-8xl mb-6">👻</div>
              <h3 className="text-2xl text-white mb-4 font-bold">No Sorcerers Registered</h3>
              <p className="text-gray-400 text-lg">
                The registry is empty. Be the first to register and join the ranks of jujutsu sorcerers!
              </p>
              <div className="mt-6">
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`transform transition-all duration-700 ${
                  visibleCards.includes(index)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/40 rounded-2xl p-6 hover:border-purple-400/70 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/30">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                        <h3 className="text-lg font-bold text-white tracking-wide">SORCERER PROFILE</h3>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-blue-500/20">
                        <span className="text-blue-300 font-semibold flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                          Name:
                        </span>
                        <span className="text-white font-bold text-lg">{user.name}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-purple-500/20">
                        <span className="text-purple-300 font-semibold flex items-center">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                          Age:
                        </span>
                        <span className="text-white font-bold text-lg">{user.age}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-red-500/20">
                        <span className="text-red-300 font-semibold flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                          Father:
                        </span>
                        <span className="text-white font-bold text-lg">{user.fathername}</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600/30 to-blue-600/30 border border-green-500/40 rounded-full text-green-300 text-sm font-bold">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          ACTIVE SORCERER
                        </span>
                        <div className="text-2xl">⚔️</div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                        RANK {Math.floor(Math.random() * 4) + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {users.length > 0 && (
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 backdrop-blur-lg border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{users.length}</div>
                <div className="text-white font-semibold">Total Sorcerers</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {users.length > 0
                    ? Math.round(users.reduce((sum, user) => sum + parseInt(user.age), 0) / users.length)
                    : 0}
                </div>
                <div className="text-white font-semibold">Average Age</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg border border-red-500/30 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
                <div className="text-white font-semibold">Active Rate</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
