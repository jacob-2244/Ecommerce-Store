"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts, addToCart, loadCart, addToWishlist, removeFromWishlist,Product } from "../redux/productSlice"; 
import Link from "next/link";



const Products1: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, cart, wishlist, status, error } = useSelector(
    (state: RootState) => state.products
  );


  useEffect(() => {
    dispatch(loadCart());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleToggleWishlist = (product: Product) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);

    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id)); 
    } else {
      dispatch(addToWishlist(product)); 
    }
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🛍️ Our Products
      </h1>

      {status === "loading" && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}

      {status === "succeeded" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => {
            const inCart = cart.some((item) => item.id === product.id);
            const isWishlisted = wishlist.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-4 flex flex-col border border-gray-100"
              >
                <div className="relative w-full h-52 mb-3 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-1 ">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {product.description}
                </p>
                <p className="text-lg text-blue-600 font-semibold mb-3">
                  Category: {product.category}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <p className="text-lg font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </p>
                  
           
                  <button
                    onClick={() => handleToggleWishlist(product)}
                    className={`font-medium px-3 py-1.5 rounded-full text-sm transition-all ${
                      isWishlisted
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-red-400 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>

                  {inCart ? (
                    <Link
                      href="/cart"
                      className="bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1.5 rounded-full text-sm transition-all"
                    >
                      View Cart
                    </Link>
                  ) : (
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-full text-sm transition-all"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products1;
