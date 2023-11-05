import { useEffect, useState } from "react";
import axios from "axios";
import { getAll, getOne, getWeather } from "../base";
import "./app.css";

const Weather = ({ weather, data }) => {
  return (
    <div>
      {weather ? (
        <div>
          {" "}
          <h3>Weather in {data.capital[0]}</h3>
          <strong>
            <p>Temperature is {Math.round(weather.main.temp)} &deg; C </p>
          </strong>
          <img
            id="weatherIcon"
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <p>Wind {Math.round(weather.wind.speed)} m/s</p>
        </div>
      ) : (
        <p>Yet to receive weather data</p>
      )}
    </div>
  );
};

const Countrydetail = ({ result, data, weather, handleClick }) => {
  return (
    <>
      {result.length > 10 ? (
        <p>Too many search results, specify another filter</p>
      ) : result.length === 1 && data ? (
        <div>
          <h2>
            {data.flag} {result}
          </h2>
          {
            <>
              <strong>
                {" "}
                <p key={data.capital[0]}>{`Capital ${data.capital[0]}`}</p>
              </strong>
              <strong>
                <p key={data.area}>{`Area ${data.area}`}</p>
              </strong>
              <h4>Languages:</h4>
              <ul>
                {Object.values(data.languages).map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
              <img className="flag" src={Object.values(data.flags)[0]} />
              <Weather data={data} weather={weather} />
            </>
          }
        </div>
      ) : (
        result.map((result) => (
          <div className="countryDisplay" key={result}>
            <p>{result}</p>
            <button value={result} onClick={handleClick}>
              show
            </button>
          </div>
        ))
      )}
    </>
  );
};
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResult] = useState([]);
  const [basicData, setBasicData] = useState(null);
  const [latlng, setLatlng] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getAll()
      .then((response) => setCountries(response.data))
      .catch((error) => console.log("error retrievng countries"));
  }, []);

  const searchResult = countries.map((country) => country.name.common);

  const handleChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
    let count = searchResult.filter((name) =>
      name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    if (count.length == 1) {
      const chosenCountry = countries.find(
        (country) => country.name.common === count[0]
      );

      getOne(count[0])
        .then((response) => {
          setBasicData(response.data);
          getWeather(response.data.latlng[0], response.data.latlng[1])
            .then((response) => setWeatherData(response.data))
            .catch((error) => console.log("an error has occurred"));
        })
        .catch((error) => console.log("there was an error"));
    }
    setResult(count);
    setSearchQuery("");
  };

  const handleClick = (event) => {
    console.log(event.target.value);
    const selectedCountry = countries.find(
      (country) => country.name.common === event.target.value
    );

    setBasicData(selectedCountry);
    setResult([selectedCountry.name.common]);
    setLatlng(selectedCountry.latlng);

    if (selectedCountry.latlng) {
      //console.log(selectedCountry.latlng);

      // Fetch weather data for the selected country's latlng
      getWeather(selectedCountry.latlng[0], selectedCountry.latlng[1])
        .then((response) => setWeatherData(response.data))
        .catch((error) => console.log("an error has occurred"));
    }
  };

  return (
    <>
      <div className="container1">
        <h2>Find countries</h2>
        <input type="search" onChange={handleChange} />
      </div>

      <Countrydetail
        result={results}
        data={basicData}
        weather={weatherData}
        handleClick={handleClick}
      />
    </>
  );
};

export default App;
