import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ScrollText, Users, FileText, Shield, Wallet, History, Settings, Bell, Ambulance, Hospital, PhoneCall, User } from 'lucide-react';
import Button from './ui/Button';
import Avatar from './ui/Avatar';

const routes = [
  // { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  // { label: 'Wills', icon: ScrollText, path: '/wills' },
  // { label: 'Beneficiaries', icon: Users, path: '/beneficiaries' },
  // { label: 'Documents', icon: FileText, path: '/documents' },
  // { label: 'Assets', icon: Wallet, path: '/assets' },
  // { label: 'Transactions', icon: History, path: '/transactions' },
  // { label: 'Contracts', icon: Shield, path: '/contracts' },
  // { label: 'Settings', icon: Settings, path: '/settings' },
  { label: "Book Ambulance", icon: Ambulance, path: "/ambulance" },
  { label: "Hospital Finder", icon: Hospital, path: "/hospitals" },
  // { label: "Emergency Helpline", icon: PhoneCall, path: "/emergencyhelpline" },
  { label: "Update Profile", icon: User, path: "/profile" },
];  

function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">Sanjeevani</span>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

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
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                  <span>{route.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <img src="/placeholder-user.jpg" alt="User" />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">john@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;