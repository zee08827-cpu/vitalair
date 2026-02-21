'use client';

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export default function CityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [airData, setAirData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔑 API key (add to .env.local as NEXT_PUBLIC_OPENWEATHER_KEY)
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setWeatherData(null);
    setAirData(null);

    if (!searchQuery.trim()) {
      setError('Please enter a city name.');
      return;
    }

    try {
      // Step 1: Weather data
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message || 'City not found.');
        return;
      }

      setWeatherData(data);

      // Step 2: Air quality data (needs lat/lon from weather)
      const { lat, lon } = data.coord;
      const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const airJson = await airRes.json();
      setAirData(airJson.list[0]); // first entry
    } catch (err) {
      setError('Failed to fetch data. Check your API key or network.');
    }
  };

  // Helper to map AQI number to text + color
  const getAQIInfo = (aqi: number) => {
    switch (aqi) {
      case 1:
        return { label: 'Good', color: 'bg-green-500' };
      case 2:
        return { label: 'Fair', color: 'bg-yellow-400' };
      case 3:
        return { label: 'Moderate', color: 'bg-orange-500' };
      case 4:
        return { label: 'Poor', color: 'bg-red-500' };
      case 5:
        return { label: 'Very Poor', color: 'bg-purple-700' };
      default:
        return { label: 'Unknown', color: 'bg-gray-400' };
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 font-sans px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 dark:border-white/10 mb-4">
          <MapPin className="w-6 h-6 text-rose-500 mr-2 animate-pulse" />
          <span className="text-sm font-bold tracking-wider text-slate-700 dark:text-slate-200 uppercase">
            Global Coverage
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white">
          City <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-rose-500">Search</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-medium">
          Find your city's air quality & weather instantly.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-md relative group mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
        <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-4 py-3">
          <Search className="w-6 h-6 text-blue-500 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter city name..."
            className="flex-grow bg-transparent outline-none text-lg font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
          />
          <button
            type="submit"
            className="ml-4 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:scale-105 transition-transform"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results Section */}
      <div className="w-full max-w-md text-center space-y-6">
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {weatherData && (
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-slate-800 dark:to-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300">
              🌡 Temp: {weatherData.main.temp}°C
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300">
              ☁ Condition: {weatherData.weather[0].description}
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300">
              💨 Wind: {weatherData.wind.speed} m/s
            </p>
          </div>
        )}

        {airData && (
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-green-100 to-yellow-100 dark:from-slate-800 dark:to-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Air Quality Index
            </h2>
            <div className="flex flex-col items-center">
              {/* Circle indicator */}
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-lg ${getAQIInfo(airData.main.aqi).color}`}>
                {getAQIInfo(airData.main.aqi).label}
              </div>
              {/* Pollutant details */}
              <div className="mt-4 text-slate-700 dark:text-slate-300 space-y-1">
                <p>PM2.5: {airData.components.pm2_5} µg/m³</p>
                <p>PM10: {airData.components.pm10} µg/m³</p>
                <p>NO₂: {airData.components.no2} µg/m³</p>
                <p>O₃: {airData.components.o3} µg/m³</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}