import { getAttractions, useAttractions } from "./AttractionProvider.js"
import { Attraction, defaultAttraction } from "./Attraction.js";

//Target DOM element to render attraction object

const contentTarget = document.querySelector("#attractionPreview")

//Function to render attraction object

const render = attraction => {
    contentTarget.innerHTML = Attraction(attraction);

}

const defaultRender = () => {
  contentTarget.innerHTML = defaultAttraction();
}

export const attractionPreview = () => {
    getAttractions().then(() => {
      const allTheAttractions = useAttractions();
      const defaultAttraction = allTheAttractions[0];
      render(defaultAttraction);
    });
  };