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

export const handleSaveClick = async (updatedData) => {
    return await fetchWithHandler(`${BACKEND_URL}/api/user/update`, 'PUT', updatedData);
};

export const fetchUserDetails =async()=>{
    console.log('Fetching user details in service...');
    return await fetchWithHandler(`${BACKEND_URL}/api/user/getUserDetails`, 'GET');
}
