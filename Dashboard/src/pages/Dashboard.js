import React from 'react';
import { ScrollText, Users, Shield, DollarSign, Plus, Upload, UserPlus } from 'lucide-react';
import StatCard from '../components/StatCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

function Dashboard() {
  const recentActivity = [
    {
      title: "New Will Created",
      description: "A new will was created and stored on blockchain",
      time: "2 hours ago",
      type: "default"
    },
    {
      title: "Smart Contract Executed",
      description: "Assets distributed according to will terms",
      time: "1 day ago",
      type: "success"
    },
    {
      title: "Document Verification Required",
      description: "Additional verification needed for recent changes",
      time: "2 days ago",
      type: "warning"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Wills"
          value="12"
          icon={ScrollText}
          variant="default"
        />
        <StatCard
          title="Beneficiaries"
          value="48"
          icon={Users}
          variant="success"
        />
        <StatCard
          title="Smart Contracts"
          value="24"
          icon={Shield}
          variant="warning"
        />
        <StatCard
          title="Total Assets"
          value="$2.4M"
          icon={DollarSign}
          variant="default"
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3 ml-10">Recent Activity</h2>
          <div className="space-y-2 ml-10">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-start gap-2 my-2">
                  <div
                    className={`rounded-full p-2 ${
                      activity.type === "success"
                        ? "bg-green-100"
                        : activity.type === "warning"
                        ? "bg-yellow-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {activity.type === "success" ? (
                      <Shield className="h-5 w-5" />
                    ) : activity.type === "warning" ? (
                      <Upload className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground leading-tight">
                      {activity.description}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs px-2 py-1 whitespace-nowrap mr-20">
                  {activity.time}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>



      {/* Quick Actions */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex items-center justify-between gap-4">
            <Button className="flex-1 bg-blue-50 border border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-500 justify-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Will
            </Button>
            <Button className="flex-1 bg-green-50 border border-green-300 text-green-700 hover:bg-green-100 hover:border-green-500 justify-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Beneficiary
            </Button>
            <Button className="flex-1 bg-yellow-50 border border-yellow-300 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-500 justify-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Documents
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;