"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const AddToCart: React.FC = () => {
  const router = useRouter();


  const cartItems = useSelector((state: RootState) => state.products.cart);

  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className="relative cursor-pointer hover:scale-105 transition"
      onClick={() => router.push("/cart")}
    >
      <ShoppingCart size={32} className="text-gray-800" />
      
      {totalItems >=0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default AddToCart;
