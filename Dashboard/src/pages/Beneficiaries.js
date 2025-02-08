import React from "react";
import { UserPlus, MoreVertical } from "lucide-react";

const BeneficiaryCard = ({ name, type, relationship, allocation, status }) => {
  const statusStyles = {
    Verified: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src="https://avatar.iran.liara.run/public"
            alt={name}
            className="h-12 w-12 rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-gray-500">{type}</p>
          </div>
        </div>
        <MoreVertical className="cursor-pointer text-gray-500" />
      </div>

      {/* Details */}
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium text-gray-700">Relationship:</span>{" "}
          {relationship}
        </p>
        <p className="text-sm">
          <span className="font-medium text-gray-700">Allocation:</span> {allocation}%
        </p>
        <p className="text-sm flex items-center">
          <span className="font-medium text-gray-700">Status:</span>{" "}
          <span
            className={`ml-2 px-2 py-1 text-xs rounded-full ${statusStyles[status]}`}
          >
            {status}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        <button className="text-blue-600 text-sm border border-blue-600 rounded px-3 py-1">
          Edit Details
        </button>
        <button className="text-red-600 text-sm border border-red-600 rounded px-3 py-1">
          Remove
        </button>
      </div>
    </div>
  );
};

const Beneficiaries = () => {
  const beneficiaries = [
    {
      name: "Sarah Johnson",
      type: "Primary Beneficiary",
      relationship: "Daughter",
      allocation: 40,
      status: "Verified",
    },
    {
      name: "Michael Smith",
      type: "Secondary Beneficiary",
      relationship: "Son",
      allocation: 35,
      status: "Pending",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Beneficiary Management</h1>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded shadow">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Beneficiary
        </button>
      </div>

      {/* Beneficiaries List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {beneficiaries.map((b, i) => (
          <BeneficiaryCard key={i} {...b} />
        ))}

        {/* Add New Beneficiary Card */}
        <button className="p-4 border-dashed border-2 rounded-lg text-center flex flex-col items-center justify-center text-gray-500 hover:bg-blue-100 transition-all">
          <div className="bg-gray-200 p-3 rounded-full">
            <UserPlus className="h-8 w-8 text-gray-600" />
          </div>
          <h3 className="font-medium mt-2">Add New Beneficiary</h3>
          <p className="text-sm">Click to add a new beneficiary</p>
        </button>
      </div>

      {/* Allocation Summary */}
      <div className="p-4 border rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold">Allocation Summary</h2>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Allocated</span>
            <span className="text-sm text-gray-600">75%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div className="bg-blue-600 h-2 rounded" style={{ width: "75%" }}></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Remaining</span>
            <span className="text-sm text-gray-600">25%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div className="bg-gray-400 h-2 rounded" style={{ width: "25%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beneficiaries;
