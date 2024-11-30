import toast from "react-hot-toast";  // Ensure toast is imported
const BACKEND_URL = import.meta.env.VITE_BASE_URL;
import { handleApiResponse } from '../Helper/index';

// Fetch helper function
const fetchWithHandler = async (url, method, data = {}) => {
  console.log('data', data);
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(data.token && { 'Authorization': `Bearer ${data.token}` }),  // Add token if available
    },
    body: method !== 'GET' ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(url, config);
    const responseData = await response.json();
    console.log('responseData', responseData);
    return handleApiResponse({ response: { status: response.status }, data: responseData });
  } catch (error) {
    console.error("API Request Error:", error);
    toast.error("Network error or server not reachable");
    throw error;
  }
};

// Save address
export const saveAddress = async (data, token) => {
  console.log('data', data);
  try {
    console.log('going to save address');
    const response = await fetchWithHandler(`${BACKEND_URL}/api/addresses/add`, 'POST', { token, ...data });
    if (response) toast.success("Address added successfully!");
    return response;
  } catch (error) {
    toast.error("Failed to add address");
    throw error;
  }
};

// Fetch user addresses
export const fetchUserAddresses = async (token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/addresses/user-addresses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
    if (!response.ok) throw new Error("Failed to fetch addresses");
    const addresses = await response.json();
    return addresses;
  } catch (error) {
    toast.error("Unable to fetch addresses");
    throw error;
  }
};

// Delete address
export const deleteAddress = async (addressId, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/addresses/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete address');
    toast.success("Address deleted successfully!");
    return await response.json();
  } catch (error) {
    toast.error("Failed to delete address");
    throw error;
  }
};

// Update address
export const updateAddress = async (addressData, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/addresses/${addressData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressData),
    });
    if (!response.ok) throw new Error('Failed to update address');
    return await response.json();
  } catch (error) {
    toast.error("Failed to update address");
    throw error;
  }
};