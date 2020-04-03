import { getParks, useParks } from "../parks/ParkProvider.js";
import { getEateries, useEateries } from "../eateries/EateryProvider.js";
import {
  getAttractions,
  useAttractions
} from "../attractions/AttractionProvider.js";
import { getItineraries, useItineraries } from "./ItineraryProvider.js";
import { Itinerary } from "./Itinerary.js";

/**
 * References to DOM nodes that will be targeted
 * contentTarget will be populated with the saved itineraries from local db (db.json)
 * all custom events will be broadcast to eventHub
 */
const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector("#container__itinerary");

export const ItineraryRender = () => {
  // Set three blank arrays that are later populated with the API data
  let allTheEateries = [];
  let allTheAttractions = [];
  let allTheParks = [];
  
  // Invokes getEateries and then useEateries to call the API in order to fill our array, allTheEateries.
  getEateries().then(() => {
    allTheEateries = useEateries();
  });
  // Invokes getAttractions and then useAttractions to call the API in order to fill our array, allTheAttractions.
  getAttractions().then(() => {
    allTheAttractions = useAttractions();
  });
  // Invokes getParks and then useParks to call the API in order to fill our array, allTheParks.
  getParks()
    .then(getItineraries)
    .then(() => { 
      allTheParks = useParks();

      // Invokes useItineraries in order to fill our array, allTheItineraries.
      const allTheItineraries = useItineraries();

      /***
       * Loop that iterates through all saved itinerary objects in local db (db.json)
       * Stores the name property of the park, eatery, and attraction which match our saved itinerary object.
       * */  
      for (const itinerary of allTheItineraries) {
        const theFoundPark = allTheParks.find(currentParkObject => {
          return currentParkObject.parkCode === itinerary.parkCode;
        });
        const theFoundEatery = allTheEateries.find(currentEateryObject => {
          return currentEateryObject.id === itinerary.eateryId;
        });
        const theFoundAttraction = allTheAttractions.find(
          currentAttractionObject => {
            return currentAttractionObject.id === itinerary.attractionId;
          }
          );

        //Declares itineraryObject as an empty object

        let itineraryObject = {};

        //Populates itineraryObject with matching park name, business name, and attraction name properties

        itineraryObject.park = theFoundPark.name;
        itineraryObject.eatery = theFoundEatery.businessName;
        itineraryObject.attraction = theFoundAttraction.name;

        //Populates contentTarget with HTML representation of itinerary

        contentTarget.innerHTML += Itinerary(itineraryObject);
      }
    });
};

// listens for "itineraryStateChanged" from ItineraryProvider.js 

eventHub.addEventListener("itineraryStateChanged", event => {
// clears the HTML & empties it 
  contentTarget.innerHTML = "";
// calls ItineraryRender function once event is heard 
  ItineraryRender();
});
