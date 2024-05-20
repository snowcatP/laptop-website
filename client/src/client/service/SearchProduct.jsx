import axios from "axios";

const URL = "http://localhost:8080";

export const searchProducts = async (searchParams) => {
  try {
    if (!searchParams || Object.keys(searchParams).length === 0) {
      throw new Error('Empty search parameters');
    }

    const response = await axios.get(`${URL}/product/search`, {
      params: searchParams,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
