import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Menu, X, User, LogOut, LogIn, UserPlus } from 'lucide-react'; // Optional: lucide icons

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = user
    ? [
      { to: '/', label: 'Home' },
      { to: '/currency', label: 'Currency' },
      { to: '/myprofile', label: 'Profile', icon: User },
    ]
    : [
      { to: '/home/login', label: 'Login', icon: LogIn },
    ];

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl md:text-3xl font-bold tracking-tight hover:text-cyan-400 transition-colors duration-300"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Trustify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return link.to.startsWith('/myprofile') ? (
                <div key={link.to} className="relative group">
                  <Link
                    to={link.to}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/80 transition-all duration-300"
                  >
                    {Icon && <Icon className="w-8 h-8" />}
                  </Link>

                  {/* Dropdown on hover (for profile) */}
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-700">
                    <div className="py-2">
                      <Link
                        to="/myprofile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition"
                      >
                        <User className="w-4 h-4" />
                        <span>View Profile</span>
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/80'
                    }`
                  }
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-700/80 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return link.to.startsWith('/myprofile') ? (
                  <div key={link.to} className="space-y-1">
                    <Link
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700 hover:text-white transition"
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      <span>{link.label}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-slate-700 hover:text-red-300 transition"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${isActive
                        ? 'bg-cyan-600 text-white'
                        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                      }`
                    }
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;