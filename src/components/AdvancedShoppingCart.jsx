import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { PRODUCTS } from '../data/data';


// 2. REDUCER ACTIONS
const ActionTypes = {
  // Product actions
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_CATEGORY_FILTER: 'SET_CATEGORY_FILTER',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SORT_BY: 'SET_SORT_BY',
  
  // Cart actions
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  
  // UI actions
  TOGGLE_CART_SIDEBAR: 'TOGGLE_CART_SIDEBAR',
  SET_VIEW_MODE: 'SET_VIEW_MODE'
};

// 3. INITIAL STATE
const initialState = {
  // Product state
  products: PRODUCTS,
  categoryFilter: 'All',
  searchTerm: '',
  sortBy: 'name',
  
  // Cart state
  cart: [],
  
  // UI state
  isCartOpen: false,
  viewMode: 'grid' // 'grid' or 'list'
};

// 4. REDUCER FUNCTION
function shopReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
      
    case ActionTypes.SET_CATEGORY_FILTER:
      return { ...state, categoryFilter: action.payload };
      
    case ActionTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
      
    case ActionTypes.SET_SORT_BY:
      return { ...state, sortBy: action.payload };
      
    case ActionTypes.ADD_TO_CART: {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        // Add new item to cart
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }
    }
    
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
      
    case ActionTypes.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== id)
        };
      }
      
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }
    
    case ActionTypes.CLEAR_CART:
      return { ...state, cart: [] };
      
    case ActionTypes.TOGGLE_CART_SIDEBAR:
      return { ...state, isCartOpen: !state.isCartOpen };
      
    case ActionTypes.SET_VIEW_MODE:
      return { ...state, viewMode: action.payload };
      
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// 5. CONTEXT CREATION
const ShopContext = createContext();

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}

// 6. CONTEXT PROVIDER
export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        cart.forEach(item => {
          dispatch({ type: ActionTypes.ADD_TO_CART, payload: item });
        });
      } catch (error) {
        console.warn('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Action creators
  const actions = {
    // Product actions
    setCategoryFilter: (category) => 
      dispatch({ type: ActionTypes.SET_CATEGORY_FILTER, payload: category }),
      
    setSearchTerm: (term) => 
      dispatch({ type: ActionTypes.SET_SEARCH_TERM, payload: term }),
      
    setSortBy: (sortBy) => 
      dispatch({ type: ActionTypes.SET_SORT_BY, payload: sortBy }),
      
    // Cart actions
    addToCart: (product) => 
      dispatch({ type: ActionTypes.ADD_TO_CART, payload: product }),
      
    removeFromCart: (productId) => 
      dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: productId }),
      
    updateQuantity: (productId, quantity) => 
      dispatch({ type: ActionTypes.UPDATE_QUANTITY, payload: { id: productId, quantity } }),
      
    clearCart: () => 
      dispatch({ type: ActionTypes.CLEAR_CART }),
      
    // UI actions
    toggleCartSidebar: () => 
      dispatch({ type: ActionTypes.TOGGLE_CART_SIDEBAR }),
      
    setViewMode: (mode) => 
      dispatch({ type: ActionTypes.SET_VIEW_MODE, payload: mode })
  };

  // Computed values (derived state)
  const computed = {
    // Get unique categories from products
    categories: ['All', ...new Set(state.products.map(p => p.category))],
    
    // Filter and sort products
    filteredProducts: state.products
      .filter(product => {
        // Category filter
        if (state.categoryFilter !== 'All' && product.category !== state.categoryFilter) {
          return false;
        }
        
        // Search filter
        if (state.searchTerm) {
          return product.name.toLowerCase().includes(state.searchTerm.toLowerCase());
        }
        
        return true;
      })
      .sort((a, b) => {
        switch (state.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      }),
    
    // Cart calculations
    cartTotal: state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    cartItemCount: state.cart.reduce((count, item) => count + item.quantity, 0),
    cartIsEmpty: state.cart.length === 0
  };

  const value = {
    // State
    ...state,
    // Actions
    ...actions,
    // Computed values
    ...computed
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

// 7. COMPONENTS
function Header() {
  const { cartItemCount, toggleCartSidebar } = useShop();

  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">🏪 Advanced Shopping Cart</h1>
        <button
          onClick={toggleCartSidebar}
          className="relative bg-slate-600 hover:bg-slate-500 px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
        >
          Cart ({cartItemCount})
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

function ProductFilters() {
  const { 
    categories, 
    categoryFilter, 
    searchTerm, 
    sortBy, 
    viewMode,
    setCategoryFilter, 
    setSearchTerm, 
    setSortBy, 
    setViewMode 
  } = useShop();

  return (
    <div className="bg-slate-50 border-2 border-slate-200 p-6 shadow-lg mb-8 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Products
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full border-2 border-slate-300 focus:border-slate-500 focus:ring-slate-500 focus:ring-2 rounded-lg px-3 py-2 transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border-2 border-slate-300 focus:border-slate-500 focus:ring-slate-500 focus:ring-2 rounded-lg px-3 py-2 transition-all duration-200"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border-2 border-slate-300 focus:border-slate-500 focus:ring-slate-500 focus:ring-2 rounded-lg px-3 py-2 transition-all duration-200"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* View Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              View
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { addToCart, cart } = useShop();
  
  const cartItem = cart.find(item => item.id === product.id);
  const inCart = !!cartItem;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="text-center mb-3">
        <div className="text-4xl mb-2">{product.image}</div>
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-slate-700">${product.price}</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      </div>
      
      <button
        onClick={() => addToCart(product)}
        disabled={product.stock === 0}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
          product.stock === 0
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
            : inCart
            ? 'bg-slate-600 hover:bg-slate-700 text-white shadow-md hover:shadow-lg'
            : 'bg-slate-700 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transform hover:scale-105'
        }`}
      >
        {product.stock === 0 ? 'Out of Stock' : inCart ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
      </button>
    </div>
  );
}

function ProductGrid() {
  const { filteredProducts, viewMode } = useShop();

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
        : 'grid-cols-1'
    }`}>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function CartSidebar() {
  const { 
    cart, 
    cartTotal, 
    cartIsEmpty, 
    isCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    toggleCartSidebar 
  } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-5"
        onClick={toggleCartSidebar}
      />
      
      {/* Sidebar */}
      <div className="absolute right-4 top-20 w-96 max-h-[calc(100vh-6rem)] bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="flex flex-col max-h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b flex-shrink-0 rounded-t-2xl">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              onClick={toggleCartSidebar}
              className="text-slate-500 hover:text-slate-700 transition-colors duration-200"
            >
              ✕
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartIsEmpty ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🛒</div>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded">
                    <div className="text-2xl">{item.image}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded bg-slate-200 hover:bg-slate-300 transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded bg-slate-200 hover:bg-slate-300 transition-colors duration-200"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {!cartIsEmpty && (
            <div className="border-t p-4 space-y-3 flex-shrink-0 rounded-b-2xl">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <button className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-slate-300 hover:bg-slate-400 text-slate-700 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 8. MAIN APP COMPONENT
export default function ShoppingApp() {
  const { filteredProducts } = useShop();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ProductFilters />
      
      <main className="max-w-6xl mx-auto px-4 pb-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Products ({filteredProducts.length})
          </h2>
        </div>
        <ProductGrid />
      </main>
      
      <CartSidebar />
    </div>
  );
}
