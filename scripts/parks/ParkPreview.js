//Bring in list of all parks from park provider
import { useParks, getParks } from "./ParkProvider.js";
import { Park } from "./Park.js";

//Declare variable to hold park array

//Target DOM element to hold Park.js object

const contentTarget = document.querySelector("#parkPreview");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("parkChosenEvent", customEvent => {
    const parkAbbrev = customEvent.detail.park
    getParks().then(() => {
    const allTheParks = useParks();
    const selectedPark = allTheParks.find(currentPark => {
      currentPark.parkCode === parkAbbrev;
    });
    render(selectedPark);
  });
});

//Target DOM element to hold Weather.js object
const weatherContentTarget = document.querySelector("#weatherContainer");

//Target DOM element to hold ParkDialogButton.js object

const buttonContentTarget = document.querySelector(
  "#parkDialogButtonContainer"
);

//Function to loop through park array and render park object

const render = park => {
  contentTarget.innerHTML = Park(park);
};

export const parkPreview = () => {
  getParks().then(() => {
    const allTheParks = useParks();
    const defaultPark = allTheParks[0];
    render(defaultPark);
  });
};
