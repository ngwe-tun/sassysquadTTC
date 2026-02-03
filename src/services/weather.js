import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

export const getWeather = async (city = 'Bangkok') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: city,
      }
    });

    const data = response.data;

    return {
      temp: data.current.temp_c,
      condition: data.current.condition.text, // e.g., "Partly cloudy"
      description: `Humidity: ${data.current.humidity}%`, // Extra info
      city: data.location.name,
      icon: data.current.condition.icon // BONUS: They give us an icon URL!
    };

  } catch (error) {
    console.error("WeatherAPI Error:", error);
    return null;
  }
};