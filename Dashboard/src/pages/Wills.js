import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';

const wills = [
  {
    id: "#W-2024-001",
    created: "Jan 15, 2024",
    status: "Active",
    beneficiaries: 3,
    lastModified: "2 hours ago",
  },
  {
    id: "#W-2024-002",
    created: "Jan 14, 2024",
    status: "Pending",
    beneficiaries: 2,
    lastModified: "1 day ago",
  },
];

function Wills() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Will Management</h1>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Will
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search wills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[180px]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </Select>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-[180px]"
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest</option>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <thead className="bg-gray-100 text-gray-700 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">WILL ID</th>
              <th className="px-4 py-3 text-left font-semibold">CREATED DATE</th>
              <th className="px-4 py-3 text-left font-semibold">STATUS</th>
              <th className="px-4 py-3 text-left font-semibold">BENEFICIARIES</th>
              <th className="px-4 py-3 text-left font-semibold">LAST MODIFIED</th>
              <th className="px-4 py-3 text-left font-semibold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {wills.map((will) => (
              <tr key={will.id} className="even:bg-gray-50">
                <td className="px-4 py-2 font-medium">{will.id}</td>
                <td className="px-4 py-2">{will.created}</td>
                <td className="px-4 py-2">
                  <Badge variant={will.status === "Active" ? "success" : "warning"}>
                    {will.status}
                  </Badge>
                </td>
                <td className="px-4 py-2">{will.beneficiaries}</td>
                <td className="px-4 py-2">{will.lastModified}</td>
                <td className="px-4 py-2">
                  <Button variant="link" className="mr-2">View</Button>
                  <Button variant="link">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Wills;
