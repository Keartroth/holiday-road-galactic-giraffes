//Export function to represent one weather forecast object in HTML

export const Weather = forecastArray => {
  return `
        <div id="weatherContainer" class="">
            <table style="width: auto" id="weather--forecast">
            <th colspan="5">Five Day Weather Forecast</th>
            <tr id=>
                ${forecastArray
                  .map(singleForecastObject => {
                    const date = singleForecastObject.data.dt_txt
                      .split(" ")[0]
                      .slice(6);
                    return `<th class="weatherDay">${date}</th>`;
                  })
                  .join("")}
            </tr>
            <tr>
                ${forecastArray
                  .map(singleForecastObject => {
                    return `
                                <td>${singleForecastObject.data.main.temp}°F</td> 
                        `;
                  })
                  .join("")}
            </tr>
            <tr>
                ${forecastArray
                  .map(singleForecastObject => {
                    return `
                        <td><img src="http://openweathermap.org/img/wn/${singleForecastObject.data.weather[0].icon}@2x.png"></td>
                        `;
                  })
                  .join("")}
            </tr>
            </table>
        </div>
    `;
};
