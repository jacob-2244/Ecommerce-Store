"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";
import WishList from "./WishList";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
       
        <div className="h-20 aspect-square w-28 relative">
          <Image src="/images/logo.png" alt="Logo" fill />
        </div>

       
        <nav className="hidden md:flex gap-6 text-xl">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">
            Cars
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">
            Contact
          </Link>
        </nav>

        <WishList/>

        <AddToCart />
      </div>
    </header>
  );
};

export default Header;
