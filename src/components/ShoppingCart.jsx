import React from 'react'

function ShoppingCart({initialItems}) {
  const [cartItems, setCartItems] = React.useState([...initialItems]);
  const [nextId, setNextId] = React.useState(initialItems.length + 1);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddItem = (e) => {
    e.preventDefault();
    const itemToAdd = {
      id: nextId,
      name: e.target[0].value.trim(),
      price: parseFloat(e.target[1].value),
      quantity: parseInt(e.target[2].value)
    };
    
    if(!itemToAdd.name || isNaN(itemToAdd.price) || isNaN(itemToAdd.quantity)) {
      alert("Please fill out all fields correctly");
      return;
    }

    if(cartItems.some(item => item.name.toLowerCase() === itemToAdd.name.toLowerCase())) {
      alert("Item already in cart");
      return;
    }

    setCartItems([...cartItems,itemToAdd]);
    setNextId(nextId + 1);
    e.target.reset();
  }

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className='text-3xl font-bold mb-8 text-slate-800 text-center'>🛒 Shopping Cart</h2>
      
      <div className='mb-8 bg-slate-50 rounded-2xl p-6 border border-slate-200'>
        <h3 className='text-lg font-semibold text-slate-700 mb-4 flex items-center'>
          <span className='mr-2'>📦</span> Cart Items
        </h3>
        {cartItems.length === 0 ? (
          <p className='text-slate-500 text-center py-4'>Your cart is empty</p>
        ) : (
          <ul className='space-y-3'>
            {cartItems.map(item => (
              <li key={item.id} className='flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200'>
                <div className="flex-1">
                  <span className="font-semibold text-slate-800 text-lg">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-slate-600 font-medium">💲{item.price}</span>
                    <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">x {item.quantity}</span>
                    <span className="text-sm font-semibold text-slate-700">💰 ${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <span>❌</span> Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
       
      <div className='flex items-center justify-between mb-8 p-6 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl text-white shadow-lg'>
        <h3 className='text-2xl font-bold'>Total: 💰 ${totalPrice.toFixed(2)}</h3>
        <button 
          className="bg-white text-slate-700 hover:bg-slate-100 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          onClick={handleClearCart}
          disabled={cartItems.length === 0}
        >
          <span>🧹</span> Clear Cart
        </button>
      </div>

      <form className="bg-white border-2 border-slate-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200" onSubmit={handleAddItem}>
        <h3 className='text-xl font-bold mb-6 text-slate-800 flex items-center'>
          <span className='mr-2'>➕</span> Add New Item
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            className="border-2 border-slate-300 focus:border-slate-500 focus:ring-slate-500 focus:ring-2 p-3 rounded-xl w-full transition-all duration-200 font-medium" 
            type="text" 
            placeholder="Item Name" 
          />
          <input 
            className="border-2 border-slate-300 focus:border-slate-500 focus:ring-slate-500 focus:ring-2 p-3 rounded-xl w-full transition-all duration-200 font-medium" 
            type="number" 
            step="0.01" 
            placeholder="Price" 
          />
          <input 
            className="border-2 border-slate-300 focus:border-slate-500 focus:ring-slate-500 focus:ring-2 p-3 rounded-xl w-full transition-all duration-200 font-medium" 
            type="number" 
            placeholder="Quantity" 
          />
          <button 
            className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold flex items-center justify-center gap-2" 
            type="submit"
          >
            <span>🛒</span> Add Item
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShoppingCart
