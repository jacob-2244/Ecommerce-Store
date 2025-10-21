// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { addItem } from "@/redux/slice";
// import {fetchProducts} from '../redux/productSlice'

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
// }

// const Products: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const dispatch = useDispatch();

//   async function getProducts() {
//     setLoading(true);
//     try {
//       const response = await fetch("https://fakestoreapi.com/products");
//       const result = await response.json();
//       setProducts(result);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getProducts();
//   }, []);




//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         🛍️ Our Products
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading products...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-4 flex flex-col border border-gray-100"
//             >
//               {/* 🖼️ Image */}
//               <div className="relative w-full h-52 mb-3 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
//                 <Image
//                   src={product.image}
//                   alt={product.title}
//                   fill
//                   className="object-contain p-4"
//                 />
//               </div>

//               {/* 📄 Product Info */}
//               <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
//                 {product.title}
//               </h2>
//               <p className="text-sm text-gray-500 mb-2 line-clamp-2">
//                 {product.description}
//               </p>
//               <p className="text-xs text-blue-600 font-medium mb-3">
//                 Category: {product.category}
//               </p>

//               {/* 💰 Price + Add Button */}
//               <div className="flex items-center justify-between mt-auto">
//                 <p className="text-lg font-bold text-green-600">
//                   ${product.price.toFixed(2)}
//                 </p>
//                 <button
//                   onClick={() => dispatch(addItem(1))}
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-full text-sm transition-all"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;


