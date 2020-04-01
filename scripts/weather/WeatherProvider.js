//Import settings
import { Settings } from "../Settings.js"

let forecast = []
let fiveDayForecast = []

// Function to export the data for other modules
export const useWeather = () => {
    return forecast.slice();
}    

// Function to export the data for other modules
export const useFilteredWeather = () => {
    return fiveDayForecast.slice();
}    

// Get the weather data
export const getWeather = (postalCode) => {

   return fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${postalCode},us&units=imperial&appid=${Settings.weatherKey}`)
        .then(response => response.json())
        .then(
            parsedWeather => {
                forecast = parsedWeather.list
                console.log(forecast)
       }
   )
}

// Grab 5 days of data for 12PM
export const forecastFilter = (forecast) => {
    for (let i = 7; i < forecast.length; i = i+8) {
        let object = {};
        object['data'] = forecast[i]
        fiveDayForecast.push(object)
      }
}