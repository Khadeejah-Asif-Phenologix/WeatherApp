import React, { useEffect, useRef, useState } from 'react';
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
  const AllIcons = {
    "01d": ClearSky, // Clear sky (day)
    "01n": ClearSky, // Clear sky (night)
    "02d": Clouds,   // Few clouds (day)
    "02n": Clouds,   // Few clouds (night)
    "03d": Clouds,   // Scattered clouds (day)
    "03n": Clouds,   // Scattered clouds (night)
    "04d": Clouds,   // Broken clouds (day)
    "04n": Clouds,   // Broken clouds (night)
    "09d": Drizzle,  // Shower rain (day)
    "09n": Drizzle,  // Shower rain (night)
    "10d": Storm,    // Rain (day)
    "10n": Storm,    // Rain (night)
    "11d": Storm,    // Thunderstorm (day)
    "11n": Storm,    // Thunderstorm (night)
    "13d": Snowy,    // Snow (day)
    "13n": Snowy,    // Snow (night)
    "50d": Clouds,   // Mist (day)
    "50n": Clouds    // Mist (night)
  };

  const InputRef = useRef();
  const[weatherData, setweatherData] = useState(false);

  const API_KEY = '5d3bd771a4af8b668b109fe38e3ecd06';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const search = async (city) =>{
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
      setweatherData({
        humidity : data.main.humidity,
        windSpeed :data.wind.speed,
        temperature : data.main.temp,
        location : data.name,
        icon : icon
      })
    } 
    catch (error) 
    {
      console.log(error);
    }
  }

  useEffect(() => {
    search("London");
  }, []);
  
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={InputRef} type='text' placeholder='Search'/>
            <img src={SearchIcon} alt='Search Icon' onClick={()=>search(InputRef.current.value)}/>
        </div>
        <img src={weatherData.icon || ClearSky} alt='Clear Sky Icon' className='weather-icon'/> 
        <div className='weather-result'>
        <div className='temperature'>{weatherData.temperature} °C</div>
        <div className='location'>{weatherData.location}</div>
        </div>

        <div className='weather-data'>
          <div className='col1'>
            <img src={Humidity} alt='humidity icon'/>
            <div>
              <p>{weatherData.humidity} Humidity</p>
            </div>
          </div>
          <div className='col2'>
            <img src={Windy} alt='humidity icon'/>
            <div>
              <p>{weatherData.windSpeed} Wind</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Weather;