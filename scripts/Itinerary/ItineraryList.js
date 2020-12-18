import { getParks, useParks } from "../parks/ParkProvider.js";
import { getEateries, useEateries } from "../eateries/EateryProvider.js";
import {
  getAttractions,
  useAttractions
} from "../attractions/AttractionProvider.js";
import { getItineraries, useItineraries } from "./ItineraryProvider.js";
import { Itinerary } from "./Itinerary.js";

const eventHub = document.querySelector(".container");
const contentTarget = document.querySelector("#container__itinerary");

export const ItineraryRender = () => {
  let allTheEateries = [];
  let allTheAttractions = [];
  let allTheParks = [];

  getEateries().then(() => {
    allTheEateries = useEateries();
  });
  getAttractions().then(() => {
    allTheAttractions = useAttractions();
  });
  getParks()
    .then(getItineraries)
    .then(() => {
      allTheParks = useParks();

      const allTheItineraries = useItineraries();

      let itineraryObject = {};

      contentTarget.innerHTML = '<h2>Saved Itineraries</h2>';
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
        itineraryObject.park = theFoundPark.name;
        itineraryObject.eatery = theFoundEatery.businessName;
        itineraryObject.attraction = theFoundAttraction.name;

        contentTarget.innerHTML += Itinerary(itineraryObject);
      }
    });
};

eventHub.addEventListener("itineraryStateChanged", event => {
  ItineraryRender();
});
