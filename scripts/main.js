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

getAttractions()
  .then(useAttractions)
  .then(attractionPreview);

getParks()
  .then(ParkSelect)
  .then(parkPreview);

DefaultEateryPreview();
