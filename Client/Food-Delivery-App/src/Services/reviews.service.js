const BACKEND_URL = import.meta.env.VITE_BASE_URL;

export const fetchReviewsFromService = async () => {
    try {
        const token = localStorage.getItem("token"); 
        console.log("Token:", token);  // Log the token value

        const response = await fetch(`${BACKEND_URL}/api/add-review`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            }
        });

        console.log("Backend response status:", response.status);  // Log the response status

        if (response.ok) {
            const responseData = await response.json();
            console.log("Response data:", responseData);  // Log the response data
            return responseData;
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching reviews from backend:", error);  // Log any error encountered
        throw error;
    }
};