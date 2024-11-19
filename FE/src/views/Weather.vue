<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      inputCity: '',
      weatherData: null,
      display: false,
    }
  },
  methods: {
    async searchWeather() {
      if (!this.inputCity) {
        alert('Nhập tên thành phố ')
      }
      try {
        const response = await axios.get(`http://localhost:3000/weather`, {
          params: {
            city: this.inputCity,
          },
        })

        this.weatherData = response.data
        console.log(this.weatherData)
        this.display = true
      } catch (error) {
        this.display = false
        console.log('Error feaching weather data:', error)
      }
    },
  },
}
</script>
<template>
  <div>
    <Navbar />
    <div class="container" style="max-width: 400px; margin: 40px auto">
      <div class="field">
        <label class="label">Enter City</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="text"
            v-model="inputCity"
            placeholder="Enter city name"
            @keyup.enter="searchWeather"
          />
          <span class="icon is-left">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>

      <!-- Hiển thị thông tin thời tiết nếu thành phố được tìm thấy -->
      <div v-if="display" class="card weather-card">
        <header class="card-header has-background-info">
          <p class="card-header-title has-text-white">
            {{ weatherData.city }}, {{ weatherData.country }}
          </p>
        </header>

        <div class="card-content">
          <div class="content">
            <!-- Main weather info -->
            <div class="level">
              <div class="level-left">
                <h2 class="title is-3 has-text-primary">{{ weatherData.temperature }}°C</h2>
              </div>
              <div class="level-right">
                <p class="subtitle is-4">{{ weatherData.weather }}</p>
              </div>
            </div>

            <!-- Temperature Range -->
            <div class="level">
              <div class="level-left">
                <p class="subtitle is-6 has-text-grey-light">
                  <strong>Min Temp:</strong> {{ weatherData.temperatureMin }}°C
                </p>
              </div>
              <div class="level-right">
                <p class="subtitle is-6 has-text-grey-light">
                  <strong>Max Temp:</strong> {{ weatherData.temperatureMax }}°C
                </p>
              </div>
            </div>

            <!-- Humidity and Pressure -->
            <div class="level">
              <div class="level-left">
                <p class="subtitle is-6 has-text-grey-light">
                  <strong>Humidity:</strong> {{ weatherData.humidity }}%
                </p>
              </div>
              <div class="level-right">
                <p class="subtitle is-6 has-text-grey-light">
                  <strong>Pressure:</strong> {{ weatherData.pressure }} hPa
                </p>
              </div>
            </div>

            <!-- Wind info -->
            <div class="level">
              <div class="level-left">
                <p class="subtitle is-6 has-text-grey-light">
                  <strong>Wind Speed:</strong> {{ weatherData.windSpeed }} m/s
                </p>
              </div>
              <div class="level-right">
                <p class="subtitle is-6 has-text-grey-light">
                  <strong>Wind Direction:</strong> {{ weatherData.windDirection }}°
                </p>
              </div>
            </div>

            <!-- Clouds and Time info -->
            <div class="level">
              <div class="level-left">
                <p class="subtitle is-6 has-text-grey-light">
                  <strong>Cloudiness:</strong> {{ weatherData.clouds }}%
                </p>
              </div>
              <div class="level-right">
                <p class="subtitle is-6 has-text-grey-light">
                  <strong>Sunrise:</strong> {{ weatherData.sunrise }}
                </p>
              </div>
            </div>

            <!-- Sunset -->
            <div class="level">
              <div class="level-left">
                <p class="subtitle is-6 has-text-grey-light">
                  <strong>Sunset:</strong> {{ weatherData.sunset }}
                </p>
              </div>
            </div>

            <!-- Icon with hover effect -->
            <div class="level">
              <div class="level-left">
                <i class="fas fa-cloud-sun has-text-info icon-hover" title="Cloudy with Sun"></i>
                <i class="fas fa-wind has-text-primary icon-hover" title="Wind Speed"></i>
              </div>
            </div>
          </div>
        </div>

        <footer class="card-footer has-background-grey-darker">
          <a href="#" class="card-footer-item has-text-white">More Info</a>
        </footer>
      </div>
    </div>
  </div>
</template>
<style scoped>
.weather-card {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.card-header-title {
  font-size: 1.5em;
  font-weight: bold;
}

.card-footer {
  text-align: center;
}

.subtitle {
  margin: 5px 0;
}

.level-right p,
.level-left p {
  margin: 0;
}

.has-text-grey-light {
  color: #b5b5b5;
}

.has-text-primary {
  color: #00d1b2;
}

/* CSS for hover effects on icons */
.icon-hover {
  font-size: 24px;
  margin: 0 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, color 0.3s ease;
}

.icon-hover:hover {
  transform: scale(1.2);
  color: #ff3860; /* Thay đổi màu khi hover */
}
</style>
