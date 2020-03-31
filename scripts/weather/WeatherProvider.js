//Import settings
import { Settings } from "../Settings.js"

const forecast = []

// Function to export the data for other modules
export const useWeather = () => {
    return forecast.slice();
}    



// Get the weather data
export const getWeather = (postalCode) => {

   return fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${postalCode},us&units=imperial&appid=${Settings.weatherKey}`)
        .then(response => response.json())
        .then(
            parsedWeather => {
                forecast = parsedWeather
                console.table(forecast)
       }
   )
}

// Grab 5 days of data for 12PM
