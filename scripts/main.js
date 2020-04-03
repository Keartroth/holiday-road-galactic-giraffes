import { getParks } from "./parks/ParkProvider.js";
import { parkPreview } from "./parks/ParkPreview.js";
import { ParkSelect } from "./parks/ParkSelect.js";
import "./parks/ParkDialog.js";
import "./eateries/EaterySelect.js";
import { DefaultEateryPreview } from "./eateries/EateryPreview.js";
import {
  getAttractions,
  useAttractions
} from "./attractions/AttractionProvider.js";
import { attractionPreview } from "./attractions/AttractionPreview.js";
import "./attractions/AttractionSelect.js";
import "./SaveItineraryButton.js";
import "./Itinerary/ItineraryProvider.js";
import { getItineraries } from "./Itinerary/ItineraryProvider.js";
import { ItineraryRender } from "./Itinerary/ItineraryList.js";
import { getStates } from "./StateFilter/StateProvider.js";
import { StateFilter } from "./StateFilter/StateSelect.js";

getAttractions()
  .then(useAttractions)
  .then(attractionPreview);

getStates()
  .then(StateFilter);

getParks()
  .then(ParkSelect)
  .then(parkPreview);

DefaultEateryPreview();

getItineraries().then(ItineraryRender);
