import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Bell, Ambulance, Hospital, User } from 'lucide-react';
import Button from './ui/Button';
import Avatar from './ui/Avatar';

const routes = [
  { label: "Book Ambulance", icon: Ambulance, path: "/ambulance" },
  { label: "Hospital Finder", icon: Hospital, path: "/hospitals" },
  { label: "Update Profile", icon: User, path: "/profile" },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-red-600">Sanjeevani</span>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Bell className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = location.pathname === route.path;

            return (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-600 text-white font-medium'
                      : 'text-red-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? 'text-white' : 'text-red-600'
                    }`}
                  />
                  <span>{route.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <img src="/placeholder-user.jpg" alt="User" />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-red-600">John Doe</span>
            <span className="text-xs text-red-600">john@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
