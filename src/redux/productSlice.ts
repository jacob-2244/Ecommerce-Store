import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
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
  wishlist: Product[];
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

const loadWishlistFromLocalStorage = (): Product[] => {
  try {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error);
    return [];
  }
};

// Function to save the wishlist to local storage
const saveWishlistToLocalStorage = (wishlist: Product[]) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  } catch (error) {
    console.error("Error saving wishlist to localStorage:", error);
  }
};

const initialState: ProductState = {
  items: [],
  cart: [],
  wishlist: loadWishlistFromLocalStorage(), // Initialize wishlist from local storage
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

    // New: Add an item to the wishlist
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const existingItem = state.wishlist.find(
        (wishlistItem) => wishlistItem.id === item.id
      );

      if (!existingItem) {
        state.wishlist.push(item);
        saveWishlistToLocalStorage(state.wishlist);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      saveWishlistToLocalStorage(state.wishlist);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.cart);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find(
        (cartItem) => cartItem.id === action.payload
      );
      if (item) item.quantity += 1;
      saveCartToLocalStorage(state.cart);
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find(
        (cartItem) => cartItem.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage(state.cart);
      }
    },

    loadCart: (state) => {
      state.cart = loadCartFromLocalStorage();
    },

    clearCart: (state) => {
      state.cart = [];
      saveCartToLocalStorage(state.cart);
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
  addToWishlist,
  removeFromWishlist,
  clearCart,
} = productSlice.actions;

export default productSlice.reducer;
