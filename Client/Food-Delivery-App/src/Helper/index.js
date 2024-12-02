
import { decodeToken } from "react-jwt";
import toast from "react-hot-toast"; 

export function addTokenToHeader({ headers }) {
    const token = localStorage.getItem("token");
    if (token) {
        headers.Authorization = `Bearer ${token}`;

    }
    return headers;
}

export const fetchWithHandler = async (url, method, data) => {
  try {
      const headers = addTokenToHeader({
          headers: { 'Content-Type': 'application/json' },
      });
      console.log('headers', headers);

      // Only add a body if the method is not GET or HEAD
      const fetchOptions = {
          method,
          headers,
      };

      if (method !== 'GET' && method !== 'HEAD') {
          fetchOptions.body = JSON.stringify(data);
      }

      const response = await fetch(url, fetchOptions);
      console.log('response in helper', response);

      const responseData = await response.json();
      return handleApiResponse({ response, data: responseData });
  } catch (error) {
      toast.error("Network error, please try again");
      throw error;
  }
};


export function handleApiResponse(res) {
  switch (res.response.status) {
    case 401:
      localStorage.removeItem("token");
      toast.error("Session expired. Please log in again.");
      return null;
    case 400:
      toast.error(res.response.data?.message || "Unexpected error occurred. Please try again.");
      return null;
    case 201:
      return res.data;
    case 200:
      return res.data;
    case 500:
      toast.error(res.response.data?.message || "Server error, please try again later");
      return null;
    default:
      toast.error("An unexpected error occurred");
      break;
  }
}

export function isEditable(id) {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    const decoded = decodeToken(token);
    return decoded.id == id;
}
