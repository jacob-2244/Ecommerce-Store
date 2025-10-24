// src/pages/WishList.tsx

"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { RootState } from "@/redux/store";
import {
  removeFromWishlist,
  addToCart,
} from "../../redux/productSlice"
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import  {Product}  from "../../redux/productSlice"

const WishList: React.FC = () => {
  const router = useRouter();

  const wishlistItems = useSelector((state: RootState) => state.products.wishlist);
  const dispatch = useDispatch();

  
  const handleMoveToCart = (item: Product) => {
    dispatch(addToCart(item));
    // dispatch(removeFromWishlist(item.id)); 
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center h-screen text-gray-700">
          <h2 className="text-xl  md:text-2xl font-semibold mb-4">
            ❤️ Your Wishlist is Empty
          </h2>
          <p className="text-gray-500">Add some products to get started!</p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Start Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          ❤️ Your Wishlist
        </h1>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 ">
          {wishlistItems.map((item) => (
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
                  onClick={() => handleMoveToCart(item)}
                  className="text-sm text-white bg-blue-500 hover:bg-blue-700 px-4 py-1.5 rounded-full transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
