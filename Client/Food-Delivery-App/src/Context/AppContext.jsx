import React, { createContext, useState, useContext, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleAddItem = (product) => {
    setCart((prevCart) => {
      console.log('Previous Cart:', prevCart);
      const existingItem = prevCart.find(item => item._id === product._id);
      
      if (existingItem) {
        console.log(`Product already in cart:`, existingItem);
        return prevCart.map(item =>
          item._id === product._id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        console.log('Adding new product to cart:', product);
        return [...prevCart, { ...product, count: 1 }];
      }
    });
  };
  

  const handleRemoveItem = (productId) => {
    console.log('Removing item with ID:', productId);
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
    console.log('Cart after removal:', cart);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(prevState => !prevState);
  };

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const storedId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    const storedAddress = localStorage.getItem('address'); 

    if (storedName && storedId && storedToken) {
        setUser({ name: storedName, id: storedId, token: storedToken  ,  address: storedAddress, });
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
      setShowCart,
      isCartVisible,
      toggleCartVisibility,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
