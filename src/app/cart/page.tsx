"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  loadCart,
} from "@/redux/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CartPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.products.cart);


  useEffect(() => {
 
      dispatch(loadCart());
 
  }, [dispatch]);


  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

 
  if (cartItems.length === 0) {
    return (
      <>
      <Header/>
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          🛒 Your Cart is Empty
        </h2>
        <p className="text-gray-500">Add some products to get started!</p>
      </div>
      <Footer/>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🛍️ Your Shopping Cart
        </h1>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 md:flex-row items-center justify-between border-b border-gray-200 py-4"
            >
          
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-green-600 font-medium">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full"
                >
                  −
                </button>
                <span className="text-gray-800 font-semibold w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full transition"
              >
                Remove
              </button>
            </div>
          ))}

       
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Total:</h2>
            <p className="text-xl font-bold text-green-600">
              ${total.toFixed(2)}
            </p>
          </div>

          {/* 🧾 Checkout Button */}
          <div className="flex justify-end gap-6 items-center mt-6">
            <button
              onClick={() => router.push("/checkout")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
