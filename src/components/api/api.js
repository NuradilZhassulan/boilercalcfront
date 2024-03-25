import axios from "axios";
import API_BASE_URL from "../../config";

export const fetchValues = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/values`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
};

export const fetchPrice = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prices`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
};

export const fetchCountExits = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/countExit`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
};

export const fetchExtraServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/extraservices`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
};

export const fetchSystemDescriptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/systemDescription`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
};
