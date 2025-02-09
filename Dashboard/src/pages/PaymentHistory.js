import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, query, where, getDocs } from "firebase/firestore";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const driverEmail = localStorage.getItem("driverEmail"); // Fetch driver email from localStorage

  useEffect(() => {
    const fetchPayments = async () => {
      if (!driverEmail) return;

      try {
        const q = query(
          collection(db, "payments"),
          where("driverEmail", "==", driverEmail)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const paymentRecords = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPayments(paymentRecords);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPayments();
  }, [driverEmail]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">💳 Payment History</h1>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payment records found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payments.map((payment) => (
            <div key={payment.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">
                📅{" "}
                {new Date(
                  payment.timestamp?.seconds * 1000
                ).toLocaleDateString()}
              </h3>
              <p className="text-sm text-gray-600">🆔 {payment.paymentId}</p>
              <p className="text-sm text-gray-600">💳 {payment.currency}</p>
              <p className="text-sm font-bold mt-2">💰 ₹{payment.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
