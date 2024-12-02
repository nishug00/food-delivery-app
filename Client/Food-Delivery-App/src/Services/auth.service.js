const BACKEND_URL = import.meta.env.VITE_BASE_URL;
import { fetchWithHandler } from '../Helper/index';



export const register = async (data) => {
    try {
        return await fetchWithHandler(`${BACKEND_URL}/api/user/signup`, 'POST', data);
    } catch (error) {
        console.error("Registration Error:", error.message);
        throw error;
    }
};

export const login = async (data) => {
    try {
        return await fetchWithHandler(`${BACKEND_URL}/api/user/signin`, 'POST', data);
    } catch (error) {
        console.error("Login Error:", error.message);
        throw error;
    }
};

export const handleSaveClick = async (updatedData, token) => {
    return await fetchWithHandler(`${BACKEND_URL}/api/user/update`, 'PUT', updatedData, token);
};


export const fetchUserDetails =async()=>{
    return await fetchWithHandler(`${BACKEND_URL}/api/user/getUserDetails`, 'GET');
}
