const eventHub = document.querySelector(".container");

let itineraries = [];

//Sends a useable copy of itinerary data to other modules

export const useItineraries = () => {
  return itineraries.slice();
};

//Fetches itinerary data

export const getItineraries = () => {
  return fetch("http://localhost:8088/itineraries")
    .then(response => response.json())
    .then(parsedItineraries => {
      itineraries = parsedItineraries;
    });
};

//Saves itinerary objects to database

export const saveItinerary = itinerary => {
  return fetch("http://localhost:8088/itineraries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(itinerary)
  })
    .then(getItineraries)
    .then(dispatchStateChangeEvent);
};

//Informs interested modules that the state of the itinerary database has changed

const dispatchStateChangeEvent = () => {
  const itineraryStateChangedEvent = new CustomEvent("itineraryStateChanged");

  eventHub.dispatchEvent(itineraryStateChangedEvent);
};

// Listens for the custom event "newItinerySaved" which invokes the function saveItinerary.

eventHub.addEventListener("newItinerarySaved", theSaveEvent => {
  const savedItineraryObject = theSaveEvent.detail;
  saveItinerary(savedItineraryObject);
});
