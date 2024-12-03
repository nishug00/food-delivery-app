import toast from "react-hot-toast"; 
const BACKEND_URL = import.meta.env.VITE_BASE_URL;
import { handleApiResponse } from '../Helper/index';

const fetchWithHandler = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${body.token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchWithHandler:', error);
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
    return response;
  } catch (error) {
    console.error('Error saving address:', error);
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
    const responseData = await response.json();

    if (!response.ok) {
      console.error('Update failed:', responseData);
      throw new Error('Failed to update address');
    }
    return responseData;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

