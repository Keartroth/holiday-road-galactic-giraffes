export const Weather = (forecastArray) => {
    return `
        <div id="weatherContainer" class="">
            <tr id="weather--weekday">
                ${
                    forecastArray.map(singleForecastObject => {
                        const date = singleForecastObject.data.dt_txt.split(" ")[0]
                        return `<td class="weatherDay">${date}</td>`;
                      })
                      .join("")
                }
            </tr>
            <tr id="weather--forecast">
                <td class="weatherForecast">
                ${
                    forecastArray.map(singleForecastObject => {
                        return `
                                <h5>Temperature: </h5> ${singleForecastObject.data.main.temp}
                                <h5>Description: </h5> ${singleForecastObject.data.weather[0].description}
                        `;
                    })
                      .join("")
                }
                </td>
            </tr>
        </div>
    `
}