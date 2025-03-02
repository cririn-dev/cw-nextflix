import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Backend URL

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
