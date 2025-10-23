"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CancelPage = () => {
  const router = useRouter();

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold text-red-500">❌ Payment Cancelled</h1>
      <p className="mt-2 text-gray-600">
        Your payment was cancelled. Please try again.
      </p>

      <button
        onClick={() => router.push("/cart")} 
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default CancelPage;
