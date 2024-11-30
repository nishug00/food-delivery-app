import React, { createContext, useState, useContext, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);


  // Add item to the cart
  const handleAddItem = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, count: 1 }];
      }
    });
  };

  // Remove item from the cart
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const storedId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (storedName && storedId && storedToken) {
        setUser({ name: storedName, id: storedId, token: storedToken });
    }
}, []);


  return (
    <AppContext.Provider value={{
      user,
      setUser,
      cart,
      setCart,
      handleAddItem,
      handleRemoveItem, 
      showCart,
      setShowCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
