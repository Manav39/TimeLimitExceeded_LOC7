import React from 'react';
import { FileText } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

function Contracts() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Smart Contracts</h1>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Create Contract
        </Button>
      </div>
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Under Construction</h2>
          <p className="text-gray-600">
            We're currently developing the Smart Contracts management feature. 
            This page will soon allow you to create, view, and manage smart contracts related to your wills and estate planning.
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Expected features:</p>
            <ul className="list-disc list-inside text-sm text-gray-500 mt-2">
              <li>Create and deploy smart contracts on the blockchain</li>
              <li>View contract details and status</li>
              <li>Execute contract functions</li>
              <li>Monitor contract events and transactions</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Contracts;

