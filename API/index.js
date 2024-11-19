const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Đặt API Key của OpenWeatherMap
const API_KEY = 'ce821ca4524b5b6a13424f936a79f23d'; // Thay 'YOUR_API_KEY' bằng API Key của bạn
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Sử dụng CORS cho tất cả các route
app.use(cors()); // Cấu hình cho phép tất cả các nguồn (origins)

app.get('/weather', async (req, res) => {
    const { city } = req.query; // Lấy tên thành phố từ query parameter

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // Đơn vị nhiệt độ là Celsius
            }
        });

        const weatherData = response.data;

        // Trích xuất thêm thông tin từ response
        const weatherInfo = {
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: weatherData.main.temp,
            temperatureMin: weatherData.main.temp_min,
            temperatureMax: weatherData.main.temp_max,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            weather: weatherData.weather[0].description,
            windSpeed: weatherData.wind.speed,
            windDirection: weatherData.wind.deg,
            sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
            clouds: weatherData.clouds.all,
            timezone: weatherData.timezone,
        };

        return res.json(weatherInfo); // Trả về dữ liệu thời tiết dưới dạng JSON

    } catch (error) {
        return res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Weather API server running on http://localhost:${PORT}`);
});
