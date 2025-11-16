import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Menu, X, LogOut, LogIn, UserPlus, Moon, Sun, ChevronDown } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = user
    ? [
      { to: '/', label: 'Home' },
      { to: '/currency', label: 'Currency' },
    ]
    : [
      { to: '/home/login', label: 'Login', icon: LogIn },
    ];

  const photoUrl = user?.profilePhoto?.data
    ? `data:${user.profilePhoto.contentType};base64,${user.profilePhoto.data}`
    : 'https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg';

  return (
    <header className={`bg-gradient-to-r ${theme === 'dark' ? 'from-slate-900 via-slate-800 to-slate-900' : 'from-gray-100 via-gray-200 to-gray-100'} text-${theme === 'dark' ? 'white' : 'slate-900'} shadow-md border-b border-${theme === 'dark' ? 'slate-700' : 'gray-300'} py-1 sticky top-0 z-50`}>
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center space-x-1 text-lg font-bold tracking-tight hover:text-${theme === 'dark' ? 'cyan-400' : 'cyan-600'} transition-colors duration-300`}
            aria-label="Trustify Home"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Trustify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-0.5 px-2 py-1 rounded-md text-xs transition-all duration-300 ${isActive
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : `${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-slate-700/80' : 'text-gray-700 hover:text-black hover:bg-gray-200'}`
                    }`
                  }
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  <span>{link.label}</span>
                </NavLink>
              );
            })}

            {/* Theme Toggle (Desktop) */}
            <button
              onClick={toggleTheme}
              className={`ml-1 p-1 rounded-md hover:bg-${theme === 'dark' ? 'slate-700/80' : 'gray-200'} transition focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </button>

            {/* Profile Dropdown - Clickable */}
            {user && (
              <div className="relative ml-1" ref={dropdownRef}>
                <button
                  onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                  className={`flex items-center space-x-0.5 px-2 py-1 rounded-md text-xs ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-slate-700/80' : 'text-gray-700 hover:text-black hover:bg-gray-200'} transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1`}
                  aria-label="Open profile menu"
                  aria-expanded={desktopDropdownOpen}
                  aria-haspopup="true"
                >
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover border border-cyan-500"
                  />
                  <ChevronDown className={`w-3 h-3 transition-transform ${desktopDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {desktopDropdownOpen && (
                  <div className={`absolute right-0 mt-1 w-36 bg-${theme === 'dark' ? 'slate-800' : 'white'} rounded-md shadow-xl border border-${theme === 'dark' ? 'slate-700' : 'gray-300'} z-50`}>
                    <div className="py-0.5">
                      <Link
                        to="/myprofile"
                        onClick={() => setDesktopDropdownOpen(false)}
                        className={`flex items-center space-x-1 px-2 py-1.5 text-xs ${theme === 'dark' ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-black'} transition focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1`}
                      >
                        <span>View Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setDesktopDropdownOpen(false);
                        }}
                        className={`flex items-center space-x-1 w-full px-2 py-1.5 text-xs ${theme === 'dark' ? 'text-red-400 hover:bg-slate-700 hover:text-red-300' : 'text-red-500 hover:bg-gray-200 hover:text-red-600'} transition focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1`}
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-0.5 rounded-sm hover:bg-slate-700/80 transition focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-1 pb-1 border-t border-slate-700">
            <div className="flex flex-col space-y-0.5">
              {/* Mobile Profile Section */}
              {user && (
                <div className="flex flex-col items-center py-2 border-b border-slate-700">
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover mb-1 border-2 border-cyan-500"
                  />
                  <span className="text-sm font-semibold">{user.name}</span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
              )}

              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-0.5 px-2 py-1.5 ${theme === 'dark' ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-slate-700 hover:text-white'} rounded-md text-xs transition-all ${isActive
                        ? 'bg-cyan-600 text-white'
                        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                      }`
                    }
                  >
                    {Icon && <Icon className="w-3 h-3" />}
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}

              {/* Mobile Profile Links */}
              {user && (
                <div className="space-y-0.5 mt-1 border-t border-slate-700 pt-0.5">
                  <Link
                    to="/myprofile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full px-2 py-1 text-xs flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-slate-700 hover:text-white'} rounded transition focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1`}

                  >
                    View Profile
                  </Link>
                  <button
                    onClick={toggleTheme}
                    className={`w-full px-2 py-1 text-xs flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-300 hover:bg-slate-700 hover:text-white' : 'text-gray-700 hover:bg-slate-700 hover:text-white'} rounded transition focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1`}
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                    <span>Toggle Theme</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-2 py-1 text-xs rounded text-red-500 hover:bg-slate-700 hover:text-red-400 text-left focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;