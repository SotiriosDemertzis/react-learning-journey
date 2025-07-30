import React, { useEffect, useState,useCallback } from 'react'
import { getWeatherData } from '../services/fetchData';


function WeatherDashboard() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('London');
    const [lastUpdated, setLastUpdated] = useState(null);


    // Memoized fetch function to avoid recreating on every render
    const fetchWeather = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const weatherData = await getWeatherData(city);

            if (weatherData.error) {
                setWeather(null);
                // Check error message for specificity
                if (weatherData.error.includes('Network error')) {
                    setError('Network error: Unable to reach weather service.');
                } else if (weatherData.error.includes('API key')) {
                    setError('API key error: Please check your API key.');
                } else if (weatherData.error.includes('City not found')) {
                    setError('City not found: Please enter a valid city name.');
                } else if (weatherData.error.includes('Weather data not available')) {
                    setError('Weather data not available for this location.');
                } else {
                    setError(weatherData.error);
                }
            } else {
                setWeather(weatherData);
                setLastUpdated(new Date().toLocaleTimeString());
            }
        } catch (err) {
            setError('Unexpected error: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, [city]);

    // Single useEffect for both initial load and auto-refresh
    useEffect(() => {
        fetchWeather();

        // Set up interval for auto-refresh
        const timer = setInterval(() => {
            fetchWeather();
        }, 30000); // Refresh every 30 seconds

        // Cleanup interval on unmount or when city changes
        return () => clearInterval(timer);
    }, [fetchWeather]); // fetchWeather includes city in its dependencies

    // Handle city change from form submission
    const handleCityChange = (e) => {
        e.preventDefault();
        const newCity = e.target.city.value.trim();
        if (newCity){
            setCity(newCity);
            e.target.city.value = ''; // Clear input field after submission
        }
    }

    // Render the component
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">🌤️ Weather Dashboard</h1>

            {/* Search Form */}
            <div className="bg-white border-2 border-slate-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 mb-8">
                <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                    <span className="mr-2">🔍</span> Search Location
                </h3>
                <form onSubmit={handleCityChange} className="flex gap-3">
                    <input
                        type="text"
                        name="city"
                        placeholder="Enter city name"
                        className="flex-1 border-2 border-slate-300 focus:border-slate-500 focus:ring-slate-500 focus:ring-2 p-3 rounded-xl transition-all duration-200 font-medium"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold flex items-center gap-2"
                    >
                        <span>🌍</span> Search
                    </button>
                </form>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-8">
                    <div className="flex justify-center items-center">
                        <span className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-slate-600 mr-3"></span>
                        <p className="text-slate-600 text-lg font-medium">Loading weather data...</p>
                    </div>
                </div>
            )}

            {error ? (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-center">
                        <span className="text-2xl mr-3">⚠️</span>
                        <p className="text-red-700 font-semibold text-center">{error}</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Current Location Header */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 text-center flex items-center justify-center">
                            <span className="mr-2">📍</span> 
                            Current Weather in <span className="text-slate-700 ml-2">{city.toUpperCase()}</span>
                        </h2>
                    </div>
                </>
            )}
            {!error && lastUpdated && (
                <div className="text-center mb-8">
                    <p className="text-slate-500 text-sm bg-slate-100 px-3 py-2 rounded-full inline-block">
                        🕐 Last updated: <span className="font-semibold">{lastUpdated}</span>
                    </p>
                </div>
            )}

            {weather && (
                <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
                    {/* Main Weather Display */}
                    <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-8 rounded-t-2xl">
                        <div className="flex items-center justify-center gap-6">
                            <img src={weather.condition.icon} alt="weather icon" className="w-20 h-20 drop-shadow-lg" />
                            <div className="text-center">
                                <p className="text-5xl font-bold mb-2">{weather.temp_c}°C</p>
                                <p className="text-slate-200 text-lg mb-2">({weather.temp_f}°F)</p>
                                <p className="text-slate-100 font-semibold text-xl">{weather.condition.text}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Weather Details Grid */}
                    <div className="p-8">
                        <h3 className="text-lg font-semibold text-slate-700 mb-6 text-center">📊 Weather Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <span className="font-medium">🌡️ Feels like:</span> 
                                    <span className="font-semibold">{weather.feelslike_c}°C</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <span className="font-medium">💧 Humidity:</span> 
                                    <span className="font-semibold">{weather.humidity}%</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <span className="font-medium">🌬️ Wind:</span> 
                                    <span className="font-semibold">{weather.wind_kph} km/h {weather.wind_dir}</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <span className="font-medium">🧭 Pressure:</span> 
                                    <span className="font-semibold">{weather.pressure_mb} mb</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <span className="font-medium">🔆 UV Index:</span> 
                                    <span className="font-semibold">{weather.uv}</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <span className="font-medium">👁️ Visibility:</span> 
                                    <span className="font-semibold">{weather.vis_km} km</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        
        </div>
    )
}

export default WeatherDashboard
