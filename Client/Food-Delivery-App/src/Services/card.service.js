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
