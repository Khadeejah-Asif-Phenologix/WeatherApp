import React, { useEffect, useState, useCallback } from 'react';
import './Weather.css';
import Clouds from '../../Assests/clouds.png';
import Drizzle from '../../Assests/drizzle.png';
import ClearSky from '../../Assests/clear-sky.png';
import Snowy from '../../Assests/snowy.png';
import Storm from '../../Assests/storm.png';
import SearchBar from '../Search/SearchBar.js';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay.js';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);

  const API_KEY = '5d3bd771a4af8b668b109fe38e3ecd06';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const search = useCallback(async (city) => {
    const AllIcons = {
      "01d": ClearSky, "01n": ClearSky, "02d": Clouds, "02n": Clouds,
      "03d": Clouds, "03n": Clouds, "04d": Clouds, "04n": Clouds,
      "09d": Drizzle, "09n": Drizzle, "10d": Storm, "10n": Storm,
      "11d": Storm, "11n": Storm, "13d": Snowy, "13n": Snowy,
      "50d": Clouds, "50n": Clouds
    };

    if (city === "") 
    {
      alert("Please enter City Name.");
      return;
    }
    try {
      const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) 
      {
        alert(data.message);
        return;
      }

      const icon = AllIcons[data.weather[0].icon] || ClearSky;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
        icon: icon
      });
    } catch (error) {
      console.log(error);
    }
  }, [API_KEY, BASE_URL]);

  useEffect(() => {
    search("London");
  }, [search]);

  return (
    <div className='weather'>
      <SearchBar onSearch={search}/>
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default Weather;