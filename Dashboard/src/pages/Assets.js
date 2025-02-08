import React from "react";
import { PlusCircle, Edit, Trash, BarChart, Home, LineChart, Box } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function Assets() {
  const assetSummary = [
    { title: "Total Asset Value", value: "$2,450,000", icon: <BarChart className="h-6 w-6" />, color: "bg-green-100 text-green-600" },
    { title: "Real Estate", value: "$1,800,000", icon: <Home className="h-6 w-6" />, color: "bg-blue-100 text-blue-600" },
    { title: "Investments", value: "$450,000", icon: <LineChart className="h-6 w-6" />, color: "bg-purple-100 text-purple-600" },
    { title: "Other Assets", value: "$200,000", icon: <Box className="h-6 w-6" />, color: "bg-yellow-100 text-yellow-600" },
  ];

  const assets = [
    { name: "Primary Residence", category: "Real Estate", value: "$850,000", status: "Verified", statusColor: "text-green-600 bg-green-100", lastUpdated: "Jan 15, 2024" },
    { name: "Stock Portfolio", category: "Investments", value: "$450,000", status: "Pending", statusColor: "text-yellow-600 bg-yellow-100", lastUpdated: "Jan 14, 2024" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Asset Tracker</h1>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Asset
        </button>
      </div>

      {/* Asset Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {assetSummary.map((item, index) => (
          <Card key={index} className="flex items-center p-4">
            <div className={`h-12 w-12 flex items-center justify-center rounded-full ${item.color}`}>
              {item.icon}
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Asset Distribution */}
      <Card>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Asset Distribution</h2>
          <p className="text-gray-500">[Asset Distribution Chart Would Be Rendered Here]</p>
        </div>
      </Card>

      {/* Asset Details */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Asset Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Asset Name</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Value</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Last Updated</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">{asset.name}</td>
                    <td className="p-4">{asset.category}</td>
                    <td className="p-4">{asset.value}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-sm rounded-lg ${asset.statusColor}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="p-4">{asset.lastUpdated}</td>
                    <td className="p-4 space-x-3">
                      <button className="text-blue-500 hover:underline">
                        <Edit className="inline-block h-5 w-5 mr-1" />
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline">
                        <Trash className="inline-block h-5 w-5 mr-1" />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Assets;