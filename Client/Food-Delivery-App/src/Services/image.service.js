const BACKEND_URL = import.meta.env.VITE_BASE_URL;

export const fetchImagesfromBackend = async () => {
    try {
        const token = localStorage.getItem("token"); 

        const response = await fetch(`${BACKEND_URL}/api/food-images`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            }
        });

        console.log("Backend response status:", response.status); // Log the status for debugging

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching images from backend:", error);
        throw error;
    }
};


export const fetchRestaurantImagesService = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BACKEND_URL}/api/restaurant-images`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Include the token in the header
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error(`Error response status: ${response.status}`);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching restaurant images from backend:", error); 
        throw error;  
    }
};
export const fetchBurgerMenuFromService = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BACKEND_URL}/api/burgers-menu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error(`Error response status: ${response.status}`);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching burgers menu from backend:", error); 
        throw error;  
    }
};
export const fetchFriesMenuFromService = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BACKEND_URL}/api/fries-menu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error(`Error response status: ${response.status}`);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching fries menu from backend:", error); 
        throw error;  
    }
};
export const fetchDrinksMenuFromService = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BACKEND_URL}/api/drinks-menu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error(`Error response status: ${response.status}`);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching drinks menu from backend:", error); 
        throw error;  
    }
};

export const fetchProductsByRestaurant = async (restaurantId) => {
    try {
        console.log("Restaurant ID:", restaurantId);
      const response = await fetch(`${BACKEND_URL}/products/${restaurantId}`);
  console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Data:", data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };