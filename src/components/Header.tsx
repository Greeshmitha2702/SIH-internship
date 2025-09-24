import React from 'react';
import { User, ShoppingCart, FileText, Home, Search, LogOut } from 'lucide-react';
import { User as UserType } from '../types';

type Page = 'home' | 'internships' | 'cart' | 'resume' | 'profile';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  user: UserType | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, cartCount, user, onLogout }) => {
  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'internships' as Page, label: 'Internships', icon: Search },
    { id: 'resume' as Page, label: 'Resume', icon: FileText },
    { id: 'cart' as Page, label: 'Saved', icon: ShoppingCart, count: cartCount },
    { id: 'profile' as Page, label: 'Profile', icon: User }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InternAI
            </h1>
          </div>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.name || 'User'}
            </span>
            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 flex items-center space-x-1"
              title="Logout"
            >
              <LogOut size={16} />
              <span className="text-sm">Logout</span>
            </button>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  currentPage === id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
                {count !== undefined && count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex space-x-2">
            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
            {navItems.map(({ id, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`relative p-2 rounded-lg transition-all duration-200 ${
                  currentPage === id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {count !== undefined && count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;