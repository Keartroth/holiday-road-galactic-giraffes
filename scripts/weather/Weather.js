export const Weather = (forecastArray) => {
    return `
        <div id="weatherContainer" class="">
            <table style="width: auto" id="weather--weekday">
            <th colspan="5">Five Day Weather Forecast</th>
            <tr id="weather--forecast">
                ${
                    forecastArray.map(singleForecastObject => {
                        const date = singleForecastObject.data.dt_txt.split(" ")[0].slice(6)
                        return `<th class="weatherDay">${date}</th>`;
                      })
                      .join("")
                }
            </tr>
            <tr id="weather--forecast">
                ${
                    forecastArray.map(singleForecastObject => {
                        return `
                                <td>${singleForecastObject.data.main.temp}°F</td> 
                        `;
                    })
                      .join("")
                }
            </tr>
            <tr id="weather--forecast">
                ${
                    forecastArray.map(singleForecastObject => {
                        return `
                        <td><img src="http://openweathermap.org/img/wn/${singleForecastObject.data.weather[0].icon}@2x.png"></td>
                        `;
                    })
                      .join("")
                }
            </tr>
            </table>
        </div>
    `
}


// {/* <table style="width:100%">
//   <tr>
//     <th>Name</th>
//     <th>Telephone</th>
//   </tr>
//   <tr>
//     <td>Bill Gates</td>
//     <td>55577854</td>
//     <td>55577855</td>
//   </tr>
// </table> */}