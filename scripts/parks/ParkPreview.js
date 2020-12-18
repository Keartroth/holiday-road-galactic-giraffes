//Bring in list of all parks from park provider
import { useParks, getParks } from "./ParkProvider.js";
import { Park } from "./Park.js";
import { ParkDialogButton } from "./ParkDialogButton.js";
import { ParkDialog } from "./ParkDialog.js";
import { getWeather, useWeather, forecastFilter, useFilteredWeather } from "../weather/WeatherProvider.js";
import { Weather } from "../weather/Weather.js";

//Declare variable to hold park array

//Target DOM element to hold Park.js object

const contentTarget = document.querySelector("#parkPreview");
const dialogContainerTarget = document.querySelector("#dialogContainer");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("parkChosenEvent", customEvent => {
  const parkAbbrev = customEvent.detail.park;
  let parkPostal = null;

  getParks().then(() => {
    const allTheParks = useParks();
    const selectedPark = allTheParks.find(currentPark => {
      return currentPark.parkCode === parkAbbrev;
    });
    render(selectedPark);
    if (selectedPark.addresses.length > 0) {
      parkPostal = parseInt(selectedPark.addresses[0].postalCode);
    }

    if (parkPostal !== null) {
      getWeather(parkPostal).then(() => {
        const weatherArray = useWeather();
        forecastFilter(weatherArray);
        //Target DOM element to hold Weather.js object
        const weatherContentTarget = document.querySelector("#weatherContainer");
        const fiveDayForecast = useFilteredWeather();
        weatherContentTarget.innerHTML = Weather(fiveDayForecast);
      })
    }
  });
});

// Function, dialogRender, which dynamically renders a dialog component to the DOM.
const dialogRender = (ParkObject) => {
  dialogContainerTarget.innerHTML = ParkDialog(ParkObject);
}


//Function to loop through park array and render park object

const render = park => {
  contentTarget.innerHTML = Park(park);
  //Target DOM element to hold ParkDialogButton.js object  
  const buttonContentTarget = document.querySelector("#parkDialogButtonContainer");
  buttonContentTarget.innerHTML = ParkDialogButton(park);

};

export const parkPreview = () => {
  getParks().then(() => {
    const allTheParks = useParks();
    const defaultPark = allTheParks[0];
    render(defaultPark);
  });
};

//Listens for the custom event, parkDialogChosenEvent, and renders a dialog box to the DOM.
eventHub.addEventListener("parkDialogChosenEvent", customEvent => {
  const parkAbbrev = customEvent.detail.park;
  getParks().then(() => {
    const allTheParks = useParks();
    const selectedParkObject = allTheParks.find(currentPark => {
      return currentPark.parkCode === parkAbbrev;
    });
    dialogRender(selectedParkObject);
    const parkDialog = document.querySelector("#parkDialog")
    parkDialog.showModal()
  });
});

// Listens for the custom event "newItinerySaved" and resets the eatery preview.

eventHub.addEventListener("newItinerarySaved", evt => {
  parkPreview();
});