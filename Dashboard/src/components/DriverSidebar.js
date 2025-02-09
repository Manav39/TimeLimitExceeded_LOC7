import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Ambulance, History, CreditCard } from "lucide-react";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Avatar from "./ui/Avatar";

// Define routes with appropriate icons
const routes = [
  { label: "Ride Requests", icon: Ambulance, path: "/driver/requests" },
  { label: "Previous Rides", icon: History, path: "/driver/rides-history" },
  {
    label: "Payment History",
    icon: CreditCard,
    path: "/driver/payment-history",
  },
  { label: "Trivia", icon: CreditCard, path: "/driver/quiz" },
];

function DriverSidebar() {
  const location = useLocation();

  // Fetch name and email from localStorage (fallback to default values if not found)
  const name = localStorage.getItem("userName") || "John Doe";
  const email = localStorage.getItem("driverEmail") || "john@example.com";

  // Duty Status: On Duty / Off Duty
  const [isOnDuty, setIsOnDuty] = useState(
    localStorage.getItem("driverStatus") === "on"
  );

  useEffect(() => {
    localStorage.setItem("driverStatus", isOnDuty ? "on" : "off");
  }, [isOnDuty]);

  // Function to toggle duty status and update Firestore
  const toggleDutyStatus = async () => {
    const newStatus = !isOnDuty;
    setIsOnDuty(newStatus);
    localStorage.setItem("driverStatus", newStatus ? "on" : "off");

    if (!email) {
      console.error("User email not found in localStorage");
      return;
    }

    try {
      // Query Firestore to find the driver record by email
      const driversRef = collection(db, "drivers");
      const q = query(driversRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const driverDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "drivers", driverDoc.id), {
          status: newStatus ? "A" : "I",
        });

        console.log(
          `Driver status updated to ${
            newStatus ? "Active (A)" : "Inactive (I)"
          }`
        );
      } else {
        console.warn("No driver found with the given email");
      }
    } catch (error) {
      console.error("Error updating driver status:", error);
    }
  };

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-red-600">Sanjeevani</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <ul className="space-y-2">
            {routes.map((route) => {
              const Icon = route.icon;
              const isActive = location.pathname === route.path;

              return (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-red-600 text-white font-medium"
                        : "text-red-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-colors ${
                        isActive ? "text-white" : "text-red-600"
                      }`}
                    />
                    <span>{route.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Toggle Button for On Duty / Off Duty */}
        <div className="p-4 border-t flex justify-center items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isOnDuty}
              onChange={toggleDutyStatus}
              className="hidden"
            />
            <span
              className={`inline-block w-14 h-7 rounded-full transition ${
                isOnDuty ? "bg-green-500" : "bg-gray-300"
              } relative`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition ${
                  isOnDuty ? "translate-x-7" : ""
                }`}
              ></span>
            </span>
            <span
              className={`text-sm font-medium ${
                isOnDuty ? "text-green-600" : "text-gray-500"
              }`}
            >
              {isOnDuty ? "On Duty" : "Off Duty"}
            </span>
          </label>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <img src="/placeholder-user.jpg" alt="User" />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-red-600">{name}</span>
            <span className="text-xs text-red-600">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverSidebar;
