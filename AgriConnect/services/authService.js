import axios from 'axios';

const API_URL = 'https://your-api-url.com';

export const signUp = async (name, phone, farmSize) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      phone,
      farmSize,
    });
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};
