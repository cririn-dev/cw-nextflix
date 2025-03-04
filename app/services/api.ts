import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "https://cw-nextflix-api-production.up.railway.app"; // Fallback temporary fix

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
