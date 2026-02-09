import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export const getWeather = async (city = 'Bangkok') => {
  try {
    // Visual Crossing format: BASE_URL/city?key=API_KEY
    const response = await axios.get(`${BASE_URL}/${city}`, {
      params: {
        unitGroup: 'metric',
        key: API_KEY,
        contentType: 'json',
      }
    });

    const current = response.data.currentConditions;

    return {
      temp: current.temp,
      condition: current.conditions, // e.g., "Rain, Overcast"
      description: response.data.description, // A nice full sentence summary
      city: response.data.address,
      icon: current.icon // Returns a string like "rain" or "cloudy"
    };
  } catch (error) {
    console.error("Visual Crossing Error:", error);
    return null;
  }
};