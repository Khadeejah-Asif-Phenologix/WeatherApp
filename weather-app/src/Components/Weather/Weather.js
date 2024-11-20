import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Weather.css';
import Clouds from '../../Assests/clouds.png';
import Drizzle from '../../Assests/drizzle.png';
import Humidity from '../../Assests/humidity.png';
import ClearSky from '../../Assests/clear-sky.png';
import Snowy from '../../Assests/snowy.png';
import Storm from '../../Assests/storm.png';
import Windy from '../../Assests/windy.png';
import SearchIcon from '../../Assests/search-icon.png';

const Weather = () => {
  const InputRef = useRef();
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

    if (city === "") {
      alert("Please enter City Name.");
      return;
    }
    try {
      const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
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
      <div className='search-bar'>
        <input ref={InputRef} type='text' placeholder='Search' />
        <img src={SearchIcon} alt='Search Icon' onClick={() => search(InputRef.current.value)} />
      </div>
      <img src={weatherData.icon || ClearSky} alt='Weather Icon' className='weather-icon' />
      <div className='weather-result'>
        <div className='temperature'>{weatherData.temperature} °C</div>
        <div className='location'>{weatherData.location}</div>
      </div>

      <div className='weather-data'>
        <div className='col1'>
          <img src={Humidity} alt='Humidity Icon' />
          <div>
            <p>{weatherData.humidity} Humidity</p>
          </div>
        </div>
        <div className='col2'>
          <img src={Windy} alt='Wind Icon' />
          <div>
            <p>{weatherData.windSpeed} Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;