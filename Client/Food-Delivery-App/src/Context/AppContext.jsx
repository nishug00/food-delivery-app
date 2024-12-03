
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
const [targetRef, setTargetRef] = useState(null);
  const handleAddItem = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        const updatedCart = prevCart.map(item =>
          item._id === product._id ? { ...item, count: item.count + 1 } : item
        );
        toast.success(`${existingItem.count + 1} products added to cart `);
        return updatedCart;
      } else {
  
        toast.success('1 Product added to cart.');
        return [...prevCart, { ...product, count: 1 }];
      }
    });
  };
  
  

  const handleRemoveItem = (productId) => {
    console.log('Removing item with ID:', productId);
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(prevState => !prevState);
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',    
      });
    }
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
