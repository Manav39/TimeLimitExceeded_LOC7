import React, { useState } from "react";
import { Ambulance as AmbulanceIcon, MapPin, PhoneCall } from "lucide-react";

const ambulanceData = [
  {
    driver_name: "Rajesh Kumar",
    driver_phone: "+91 9876543210",
    is_ambulance_private: false,
    category: "Normal",
  },
  {
    driver_name: "Amit Sharma",
    driver_phone: "+91 8765432109",
    is_ambulance_private: true,
    category: "Oxygen",
  },
  {
    driver_name: "Suresh Yadav",
    driver_phone: "+91 7654321098",
    is_ambulance_private: false,
    category: "ICU",
  },
  {
    driver_name: "Vikram Singh",
    driver_phone: "+91 6543210987",
    is_ambulance_private: true,
    category: "Dead Body",
  },
  {
    driver_name: "Anil Verma",
    driver_phone: "+91 5432109876",
    is_ambulance_private: false,
    category: "Normal",
  },
  {
    driver_name: "Manoj Tiwari",
    driver_phone: "+91 4321098765",
    is_ambulance_private: true,
    category: "Oxygen",
  },
  {
    driver_name: "Pankaj Mehta",
    driver_phone: "+91 3210987654",
    is_ambulance_private: false,
    category: "ICU",
  },
  {
    driver_name: "Ravi Patel",
    driver_phone: "+91 2109876543",
    is_ambulance_private: true,
    category: "Dead Body",
  },
  {
    driver_name: "Dinesh Gupta",
    driver_phone: "+91 1098765432",
    is_ambulance_private: false,
    category: "Normal",
  },
  {
    driver_name: "Suraj Nair",
    driver_phone: "+91 9087654321",
    is_ambulance_private: true,
    category: "Oxygen",
  },
];

const AmbulanceCard = ({ driver_name, driver_phone, is_ambulance_private, category }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <AmbulanceIcon className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h3 className="font-semibold text-lg">{driver_name}</h3>
            <p className="text-sm text-gray-500">
              {is_ambulance_private ? "Private Ambulance" : "Government Ambulance"}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium text-gray-700">Category:</span> {category}
        </p>
        <p className="text-sm flex items-center">
          <PhoneCall className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-blue-600">{driver_phone}</span>
        </p>
      </div>
    </div>
  );
};

const Ambulances = () => {
  const [selectedType, setSelectedType] = useState(""); // Private/Gov
  const [selectedCategory, setSelectedCategory] = useState(""); // Normal, ICU, Oxygen, Dead Body

  // Filtered ambulances based on dropdown selections
  const filteredAmbulances = ambulanceData.filter((ambulance) => {
    return (
      (selectedType === "" || ambulance.is_ambulance_private.toString() === selectedType) &&
      (selectedCategory === "" || ambulance.category === selectedCategory)
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Book an Ambulance</h1>

      {/* Google Map Placeholder */}
      <div className="h-64 w-full bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Google Map Display Here</p>
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Select Ambulance Type */}
        <select
          className="p-2 border rounded-lg shadow-sm text-gray-700"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="true">Private</option>
          <option value="false">Government</option>
        </select>

        {/* Select Ambulance Category */}
        <select
          className="p-2 border rounded-lg shadow-sm text-gray-700"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Normal">Normal</option>
          <option value="Oxygen">Oxygen</option>
          <option value="ICU">ICU</option>
          <option value="Dead Body">Dead Body</option>
        </select>
      </div>

      {/* Ambulance List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredAmbulances.length > 0 ? (
          filteredAmbulances.map((ambulance, index) => (
            <AmbulanceCard key={index} {...ambulance} />
          ))
        ) : (
          <p className="text-gray-500">No ambulances available for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Ambulances;
