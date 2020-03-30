import { getParks } from "./parks/ParkProvider.js";
import { parkPreview } from "./parks/ParkPreview.js";
import { ParkSelect } from "./parks/ParkSelect.js";

getParks().then(ParkSelect)
parkPreview()
