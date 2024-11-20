import React from 'react';
import Humidity from '../../Assests/humidity.png';
import Windy from '../../Assests/windy.png';
import ClearSky from '../../Assests/clear-sky.png';
import '../Weather/Weather.css';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  return (
    <>
      <img src={weatherData.icon || ClearSky} alt="Weather Icon" className="weather-icon" />
      <div className="weather-result">
        <div className="temperature">{weatherData.temperature} °C</div>
        <div className="location">{weatherData.location}</div>
      </div>
      <div className="weather-data">
        <div className="col1">
          <img src={Humidity} alt="Humidity Icon" />
          <div>
            <p>{weatherData.humidity} Humidity</p>
          </div>
        </div>
        <div className="col2">
          <img src={Windy} alt="Wind Icon" />
          <div>
            <p>{weatherData.windSpeed} Wind</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherDisplay;
