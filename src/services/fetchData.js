/* eslint-disable no-unused-vars */
import.meta.env.VITE_WEATHER_API_KEY

export async function getWeatherData(city) {
    try {
        if (!city) {
            throw new Error('City name is required');
        }
        // Construct the API URL with the city and API key
        const baseUrl = 'https://api.weatherapi.com/v1/current.json';
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

        // Check if the API key is set
        if (!apiKey) {
            throw new Error('VITE_WEATHER_API_KEY environment variable is not set');
        }
    
        // Construct the URL with query parameters
        const params = new URLSearchParams({
            key: apiKey,
            q: city,
            aqi: 'yes'
        });

        const url = `${baseUrl}?${params}`;
        // console.log(`Url: ${url}`)

        // Fetch the weather data from the API
        // Use try-catch to handle network errors
        let response;
        try {
            response = await fetch(url);
        } catch (networkError) {
            // console.error('Network error:', networkError);
            throw new Error('Network error: Unable to reach weather service.');
        }
        
        // Check if the response is ok (status in the range 200-299)
        // If not, throw an error with a specific message based on the status code
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Invalid city name or request format.');
            } else if (response.status === 401) {
                throw new Error('Unauthorized: Invalid API key.');
            } else if (response.status === 403) {
                throw new Error('Forbidden: API key does not have access.');
            } else if (response.status === 404) {
                throw new Error('City not found.');
            } else {
                throw new Error(`API error! status: ${response.status}`);
            }
        }

        // Parse the JSON response and check if the data is valid
        // If the data is not valid, throw an error
        const data = await response.json();
        if (!data.current) {
            throw new Error('Weather data not available for this location.');
        }

        // This can help identify issues with the data structure or content
        const weather = data.current;
        // console.log(`CurrentWeatherData: ${weather}`);
        return weather;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return { error: error.message };
    }
    

}