const BACKEND_URL = import.meta.env.VITE_BASE_URL;
import { fetchWithHandler } from '../Helper/index';

export const saveCardDetails = async (cardData) => {
    try {
      const response = await fetchWithHandler(`${BACKEND_URL}/api/card/save-card`, 'POST', cardData);
      return response;
    } catch (error) {
      console.error("Save Card Error:", error.message);
      throw error;
    }
};

// export const getCards = async (token) => {
//   try {
//       console.log('Fetching cards with token:', token);  // Log the token used in the request
//       const response = await fetchWithHandler(`${BACKEND_URL}/api/card/get-cards`, 'GET', token);
//       console.log('Response:', response); // Log the response object

//       const data = await response.json();  // Assuming the response is JSON
//       console.log('Response Data:', data);  // Log the actual data

//       return data; // Return the parsed data, not the raw response
//   } catch (error) {
//       console.error("Get Cards Error:", error.message); // Log the error if fetching fails
//       throw error;
//   }
// };
export const getCards =async()=>{
  return await fetchWithHandler(`${BACKEND_URL}/api/card/get-cards`, 'GET');
}

export const deleteCard = async (cardId) => {
    try {
      const response = await fetchWithHandler(`${BACKEND_URL}/api/card/delete-card/${cardId}`, 'DELETE');
      return response;
    } catch (error) {
      console.error("Delete Card Error:", error.message);
      throw error;
    }
};

export const updateCardDetails = async (cardId, cardData) => {
    try {
      const response = await fetchWithHandler(`${BACKEND_URL}/api/card/edit-card/${cardId}`, 'PUT', cardData);
      return response;
    } catch (error) {
      console.error("Update Card Error:", error.message);
      throw error;
    }
};
