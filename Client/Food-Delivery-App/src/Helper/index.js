
import { decodeToken } from "react-jwt";
import toast from "react-hot-toast"; 

export function addTokenToHeader({ headers }) {
    const token = localStorage.getItem("token");
    console.log('token in helper', token);
    if (token) {
        headers.Authorization = `Bearer ${token}`;

    }
    console.log('headers', headers);
    return headers;
}

export const fetchWithHandler = async (url, method, data) => {
    try {
        const headers = addTokenToHeader({
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(data),
        });
        console.log('response', response);

        const responseData = await response.json();
        return handleApiResponse({ response, data: responseData });
    } catch (error) {
        console.error("API Error:", error.message);
        toast.error("Network error, please try again");
        throw error;
    }
};

export function handleApiResponse(res) {
    switch (res.response.status) {
      case 401:
        localStorage.removeItem("token");
        // toast.error("You're logged out");
        // window.location.href = "/";
        return null;
      case 400:
        toast.error("Invalid input");
        return null;
      case 201:
        return res.data;
      case 200:
        return res.data;
      case 500:
        toast.error("Server error, please try again later");
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
