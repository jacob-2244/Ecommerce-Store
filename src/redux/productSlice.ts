// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// const loadCartFromLocalStorage = () => {
//   try {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : [];
//   } catch (error) {
//     console.error("Error loading cart from localStorage:", error);
//     return [];
//   }
// };


// const saveCartToLocalStorage = (cart: any[]) => {
//   try {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   } catch (error) {
//     console.error("Error saving cart to localStorage:", error);
//   }
// };

// export const fetchProducts = createAsyncThunk("products", async () => {
//   const res = await fetch("https://dummyjson.com/products");
//   const data = await res.json();
//   return data.products;
// });

// interface ProductState {
//   items: any[];
//   cart: any[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: ProductState = {
//   items: [],
//   cart: [], 
//   status: "idle",
//   error: null,
// };

// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.cart.push({ ...item, quantity: 1 });
//       }

//       saveCartToLocalStorage(state.cart); 
//     },

//     removeFromCart: (state, action) => {
//       state.cart = state.cart.filter((item) => item.id !== action.payload);
//       saveCartToLocalStorage(state.cart); 
//     },

//     increaseQuantity: (state, action) => {
//       const item = state.cart.find((cartItem) => cartItem.id === action.payload);
//       if (item) item.quantity += 1;
//       saveCartToLocalStorage(state.cart); 
//     },

//     decreaseQuantity: (state, action) => {
//       const item = state.cart.find((cartItem) => cartItem.id === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//         saveCartToLocalStorage(state.cart); 
//       }
//     },

//     //on app start it loads
//     loadCart: (state) => {
//       state.cart = loadCartFromLocalStorage();
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to load products";
//       });
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
//   loadCart,
// } = productSlice.actions;

// export default productSlice.reducer;






import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: {
    rate: number;
    count: number;
  };
}


interface CartItem extends Product {
  quantity: number;
}


interface ProductState {
  items: Product[];
  cart: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}


const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};


const initialState: ProductState = {
  items: [],
  cart: [],
  status: "idle",
  error: null,
};


export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data.products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
  
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }

      saveCartToLocalStorage(state.cart);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.cart);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((cartItem) => cartItem.id === action.payload);
      if (item) item.quantity += 1;
      saveCartToLocalStorage(state.cart);
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((cartItem) => cartItem.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage(state.cart);
      }
    },

    loadCart: (state) => {
      state.cart = loadCartFromLocalStorage();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  loadCart,
} = productSlice.actions;

export default productSlice.reducer;
