import React from "react";
import { Download, Filter, BarChart2, CheckCircle, XCircle } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function Transactions() {
  const transactionSummary = [
    { title: "Total Transactions", count: "1,245", icon: <BarChart2 className="h-6 w-6" />, color: "bg-blue-100 text-blue-600" },
    { title: "Successful", count: "1,198", icon: <CheckCircle className="h-6 w-6" />, color: "bg-green-100 text-green-600" },
    { title: "Failed", count: "47", icon: <XCircle className="h-6 w-6" />, color: "bg-red-100 text-red-600" },
  ];

  const transactions = [
    { hash: "0x1a2b...3c4d", type: "Will Creation", time: "2 minutes ago", status: "Success", statusColor: "text-green-600 bg-green-100", block: "14,325,678" },
    { hash: "0x4e5f...6g7h", type: "Asset Update", time: "1 hour ago", status: "Failed", statusColor: "text-red-600 bg-red-100", block: "14,325,677" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <div className="flex space-x-2">
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export History
          </Button>
          <Button>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transactionSummary.map((item, index) => (
          <Card key={index} className="flex items-center p-4">
            <div className={`h-12 w-12 flex items-center justify-center rounded-full ${item.color}`}>
              {item.icon}
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-2xl font-bold">{item.count}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Transactions Table */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search transactions..."
                className="border rounded-lg px-3 py-2 text-sm w-56"
              />
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>All time</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Transaction Hash</th>
                  <th className="p-4 text-left">Type</th>
                  <th className="p-4 text-left">Time</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Block</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">{transaction.hash}</td>
                    <td className="p-4">{transaction.type}</td>
                    <td className="p-4">{transaction.time}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-sm rounded-lg ${transaction.statusColor}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="p-4">{transaction.block}</td>
                    <td className="p-4 text-blue-500 hover:underline cursor-pointer">
                      View Details
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">Showing 2 of 1,245 transactions</p>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                Previous
              </button>
              <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Transactions;