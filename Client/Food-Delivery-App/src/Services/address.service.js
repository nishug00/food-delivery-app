import toast from "react-hot-toast"; 
const BACKEND_URL = import.meta.env.VITE_BASE_URL;
import { handleApiResponse } from '../Helper/index';

const fetchWithHandler = async (url, method, data = {}) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(data.token && { 'Authorization': `Bearer ${data.token}` }), 
    },
    body: method !== 'GET' ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(url, config);
    const responseData = await response.json();
    return handleApiResponse({ response: { status: response.status }, data: responseData });
  } catch (error) {
    toast.error("Network error or server not reachable");
    throw error;
  }
};

export const saveAddress = async (data, token, userId) => {
  try {
    const response = await fetchWithHandler(
      `${BACKEND_URL}/api/addresses/add`,
      'POST',
      { token, userId, ...data }
    );
    if (response) toast.success("Address added successfully!");
    return response;
  } catch (error) {
    toast.error("Failed to add address");
    throw error;
  }
};

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
    return await response.json();
  } catch (error) {
    toast.error("Unable to fetch addresses");
    throw error;
  }
};

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
