



"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
// );

const CheckoutButton: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.products.cart);

  const handleCheckout = async () => {
    // const stripe = await stripePromise;

    const response = await fetch("api/create-checkout-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    const session = await response.json();

    if (session.error) {
      console.error("Server error:", session.error);
      alert("❌ Failed to create checkout session");
      return;
    }

    
    window.location.href = session.url;
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
    >
      Place Order
    </button>
  );
};

export default CheckoutButton;
