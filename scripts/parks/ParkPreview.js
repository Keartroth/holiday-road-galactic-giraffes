//Bring in list of all parks from park provider
import { useParks, getParks } from "./ParkProvider.js";
import { Park } from "./Park.js";
import { ParkDialogButton } from "./ParkDialogButton.js";
import { ParkDialog } from "./ParkDialog.js";
import { getWeather, useWeather } from "../weather/WeatherProvider.js";

//Declare variable to hold park array

//Target DOM element to hold Park.js object

const contentTarget = document.querySelector("#parkPreview");
const dialogContainerTarget = document.querySelector("#dialogContainer");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("parkChosenEvent", customEvent => {
  const parkAbbrev = customEvent.detail.park;
  getParks().then(() => {
    const allTheParks = useParks();
    const selectedPark = allTheParks.find(currentPark => {
      return currentPark.parkCode === parkAbbrev;
    });
    render(selectedPark);
    const parkPostal = parseInt(selectedPark.addresses[0].postalCode);
    getWeather(parkPostal)
  });
});

// Function, dialogRender, which dynamically renders a dialog component to the DOM.
const dialogRender = (ParkObject) => {
  dialogContainerTarget.innerHTML = ParkDialog(ParkObject);
}

//Target DOM element to hold Weather.js object
const weatherContentTarget = document.querySelector("#weatherContainer");


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