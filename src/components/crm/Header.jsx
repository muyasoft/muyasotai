import React from 'react';
import { Bell, User, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

const Header = ({ title, subtitle }) => {
  return (
    <header className="bg-[rgb(26,28,30)] border-b border-[rgba(255,255,255,0.1)] px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-sm text-[rgb(161,161,170)] mt-1">{subtitle}</p>}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(161,161,170)]" size={18} />
            <Input
              placeholder="Ara..."
              className="pl-10 w-64 bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="w-10 h-10 rounded-lg bg-[rgb(38,40,42)] flex items-center justify-center text-[rgb(161,161,170)] hover:text-white transition-colors duration-200">
              <Bell size={20} />
            </button>
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs border-2 border-[rgb(26,28,30)]">
              3
            </Badge>
          </div>

          {/* User Profile */}
          <button className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-[rgb(38,40,42)] hover:bg-[rgb(63,63,63)] transition-colors duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-white">Admin User</div>
              <div className="text-xs text-[rgb(161,161,170)]">admin@muyasoft.com</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;