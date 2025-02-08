import React, { useState, useEffect } from "react";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payment history from backend (Replace with API call)
    const mockPayments = [
      { id: "TXN123456", date: "2024-02-05", type: "UPI", amount: 500 },
      { id: "TXN654321", date: "2024-02-04", type: "Credit Card", amount: 700 },
      { id: "TXN987654", date: "2024-02-03", type: "Cash", amount: 600 },
    ];
    setPayments(mockPayments);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">💳 Payment History</h1>
      {payments.length === 0 ? (
        <p className="text-gray-500">No payment records found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payments.map((payment) => (
            <div key={payment.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">📅 {payment.date}</h3>
              <p className="text-sm text-gray-600">🆔 {payment.id}</p>
              <p className="text-sm text-gray-600">💳 {payment.type}</p>
              <p className="text-sm font-bold mt-2">💰 ₹{payment.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
