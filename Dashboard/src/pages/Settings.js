import React from 'react';
import { Save } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Under Construction</h2>
          <p className="text-gray-600">
            We're currently developing the Settings and preferences feature. 
            This page will soon allow you to customize your account settings and manage your preferences for the will management system.
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Expected features:</p>
            <ul className="list-disc list-inside text-sm text-gray-500 mt-2">
              <li>Account information management</li>
              <li>Security settings (2FA, password change)</li>
              <li>Notification preferences</li>
              <li>Language and regional settings</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Settings;

