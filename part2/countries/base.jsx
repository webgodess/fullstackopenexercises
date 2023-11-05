import axios from "axios";
const apiKey = import.meta.env.VITE_APIKEY;

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  return axios.get(baseUrl);
};

const getOne = (name) => {
  return axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
  );
};

const getWeather = (lat, lon) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
};

export { getAll, getOne, getWeather };
