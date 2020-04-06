const contentTarget = document.querySelector("#saveItineraryButtonContainer");
const eventHub = document.querySelector(".container");

// set three boolean variables for parks, eateries, and attractions

let eateryChosenState = false;
let attractionChosenState = false;

const SaveItineraryButton = () => {
  if (eateryChosenState && attractionChosenState) {
    contentTarget.innerHTML = `
        <button class= "button" id="saveItineraryButton" type="button">Save Itinerary</button>
        `;
  }
};

//Build itinerary object
//Properties will be populated by custom event listener details from parkChosenEvent, eateryChosenEvent, attractionChosenEvent

let itineraryObject = {};

// declare three listen events that listen for the custom events
// parkChosenEvent, eateryChosenEvent, & attractionChosenEvent.

eventHub.addEventListener("eateryChosenEvent", customEvent => {
  const eateryId = parseInt(customEvent.detail.eatery);
  itineraryObject.eateryId = eateryId;
  eateryChosenState = true;
  SaveItineraryButton();
});

eventHub.addEventListener("parkChosenEvent", customEvent => {
  const parkAbbrev = customEvent.detail.park;
  itineraryObject.parkCode = parkAbbrev;
});

eventHub.addEventListener("attractionChosenEvent", customEvent => {
  const attractionId = parseInt(customEvent.detail.attraction);
  itineraryObject.attractionId = attractionId;
  attractionChosenState = true;
  SaveItineraryButton();
});

contentTarget.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "saveItineraryButton") {
    const newItinerarySavedEvent = new CustomEvent("newItinerarySaved", {
      detail: itineraryObject
    });
    eventHub.dispatchEvent(newItinerarySavedEvent);
  }
});
