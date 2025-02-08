import React from "react";
import { FileUp, Download, Trash, CheckCircle, Loader } from "lucide-react";

function Documents() {
  const documents = [
    {
      name: "Last Will and Testament.pdf",
      date: "Jan 15, 2024",
      status: "Verified",
      statusClass: "bg-green-100 text-green-600",
    },
    {
      name: "Asset Inventory.xlsx",
      date: "Jan 14, 2024",
      status: "Processing",
      statusClass: "bg-yellow-100 text-yellow-600",
    },
  ];

  const categories = [
    { name: "Legal Documents", count: 12, iconClass: "text-blue-600 bg-blue-100" },
    { name: "Financial Records", count: 8, iconClass: "text-green-600 bg-green-100" },
    { name: "Certificates", count: 5, iconClass: "text-purple-600 bg-purple-100" },
    { name: "Other", count: 3, iconClass: "text-yellow-600 bg-yellow-100" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Document Vault</h1>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <FileUp className="h-5 w-5 mr-2" />
          Upload Document
        </button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer"
          >
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-lg ${category.iconClass}`}
            >
              <FileUp className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <p className="text-gray-500">{category.count} files</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Documents */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
        <div className="bg-white rounded-lg shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-gray-600">Document Name</th>
                <th className="p-4 text-gray-600">Date Added</th>
                <th className="p-4 text-gray-600">Status</th>
                <th className="p-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">{doc.name}</td>
                  <td className="p-4 text-gray-500">Added on {doc.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${doc.statusClass}`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-3">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-red-500">
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Documents;