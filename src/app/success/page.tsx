"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/productSlice";

const SuccessPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ Payment Successful!
      </h1>
      <p className="mt-2 text-gray-600">
        Thank you for your purchase. Your cart has been cleared.
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
      >
        🛍️ Place New Order
      </button>
    </div>
  );
};

export default SuccessPage;
