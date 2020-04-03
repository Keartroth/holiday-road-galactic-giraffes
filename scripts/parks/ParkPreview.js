import { useParks, getParks } from "./ParkProvider.js";
import { Park } from "./Park.js";
import { ParkDialogButton } from "./ParkDialogButton.js";
import { ParkDialog } from "./ParkDialog.js";
import { getWeather, useWeather, forecastFilter, useFilteredWeather } from "../weather/WeatherProvider.js";
import { Weather } from "../weather/Weather.js";

/**
 * References to DOM nodes that will be targeted
 * contentTarget will be populated with the park preview HTML
 * dialogContainerTarget will be populated with the dialog box HTML
 * all listen events will be listening on the eventHub
 */

const contentTarget = document.querySelector("#parkPreview");
const dialogContainerTarget = document.querySelector("#dialogContainer");
const eventHub = document.querySelector(".container");

/**
 * Event listener for a custom event, "parkChosenEvent", that listens on the eventHub.
 * When "parkChosenEvent" is heard, the the park that was chosen by the user is rendered
 * to the contentTarget with a five day weather forcast.
 */
eventHub.addEventListener("parkChosenEvent", customEvent => {
  // sets a variable (parkAbbrev) for the detail dispatched in the custom event.
  const parkAbbrev = customEvent.detail.park;
  getParks().then(() => {
    /*
    * sets the array of parks to the variable, allTheParks, and searches for a park object
    * that has a property, parkCode, that matches the detail, parkAbbrev.
    * sets the found park objet to the variable, selectedPark.
    */
    const allTheParks = useParks();
    const selectedPark = allTheParks.find(currentPark => {
      return currentPark.parkCode === parkAbbrev;
    });
    // calls the render function with the found park (selectedPark) as the parameter to the argument.
    render(selectedPark);
    // gathers the postal code of the selected park and turns it into an integer.
    const parkPostal = parseInt(selectedPark.addresses[0].postalCode);
    // calls the funciton, getWeather, and passes the postal code (parkPostal), as the parameter to the argument.
    getWeather(parkPostal).then(() => {
      // gathers the array of weather data with the function, useWeather, and sets it to the vaiable, weatherArray.
      const weatherArray = useWeather();
      // invokes the function, forecastFilter, with the array (weatherArray), to return just five objects out of the entire weather array.
      forecastFilter(weatherArray);
      //Target DOM element to hold Weather.js HTML
      const weatherContentTarget = document.querySelector("#weatherContainer");
      // sets the copy of our forecast to a variable, fiveDayForecast.
      const fiveDayForecast = useFilteredWeather();
      // invokes the function (Weather) with the array (fiveDayForecast) and inserts the string of HTML on the DOM at the reference point.
      weatherContentTarget.innerHTML = Weather(fiveDayForecast);
    })
  });
});

// Function, dialogRender, which dynamically renders a dialog component to the DOM.
const dialogRender = (ParkObject) => {
  dialogContainerTarget.innerHTML = ParkDialog(ParkObject);
}


//Function that accepts a park object and renders a park object to the DOM.

const render = park => {
  contentTarget.innerHTML = Park(park);
  //Target DOM element to hold ParkDialogButton.js object  
  const buttonContentTarget = document.querySelector("#parkDialogButtonContainer");
  //Invokes the funtion, ParkDialogButton, with a park object as the parameter and inserts the HTML string of a button on the DOM.
  buttonContentTarget.innerHTML = ParkDialogButton(park);
  
};

//Function that is called on main.js, which gathers the park data to utilize the index zero object as a default option on page load.
export const parkPreview = () => {
  getParks().then(() => {
    const allTheParks = useParks();
    const defaultPark = allTheParks[0];
    render(defaultPark);
  });
};

//Listens for the custom event, parkDialogChosen, and renders a dialog box to the DOM.
eventHub.addEventListener("parkDialogChosen", customEvent => {
  // declares a variable to hold the detail (park), passed along in the custom event.
  const parkAbbrev = customEvent.detail.park;
  getParks().then(() => {
    // sets an array of parks (allTheParks).
    const allTheParks = useParks();
    // searches for the corresponding park object with .find and matches a park with the correct parkCode.
    const selectedParkObject = allTheParks.find(currentPark => {
      return currentPark.parkCode === parkAbbrev;
    });
    // renders a dialog box to the DOM with the filtered park (selectedParkObject).
    dialogRender(selectedParkObject);
    // DOM reference for the dialog box.
    const parkDialog = document.querySelector("#parkDialog")
    // opens the corresponding dialog box.
    parkDialog.showModal()
  });
});