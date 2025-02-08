import React from 'react';
import Card from './ui/Card';

function StatCard({ title, value, icon: Icon, variant = "default", className }) {
  const variantStyles = {
    default: "bg-blue-100",
    success: "bg-green-100",
    warning: "bg-yellow-100",
    danger: "bg-red-100"
  };

  return (
    <Card className={className}>
      <div className="flex items-center gap-4 p-6">
        <div className={`rounded-lg p-2 ${variantStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </Card>
  );
}

export default StatCard;

