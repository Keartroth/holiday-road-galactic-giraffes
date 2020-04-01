import { getAttractions, useAttractions } from "./AttractionProvider.js"
import { Attraction, defaultAttraction } from "./Attraction.js";
import { AttractionDialog } from "./AttractionDialog.js";
import { AttractionDialogButton } from "./AttractionDialogButton.js";

//Target DOM element to render attraction object

const contentTarget = document.querySelector("#attractionPreview")
const dialogContainerTarget = document.querySelector("#dialogContainer");
const eventHub = document.querySelector(".container");

//Function to render attraction object

const render = attraction => {
    contentTarget.innerHTML = Attraction(attraction);
    const buttonContentTarget = document.querySelector("#attractionDialogButtonContainer");
    buttonContentTarget.innerHTML = AttractionDialogButton(attraction);

}

const defaultRender = () => {
  contentTarget.innerHTML = defaultAttraction();
}

const dialogRender = (AttractionObject) => {
  dialogContainerTarget.innerHTML = AttractionDialog(AttractionObject);
}

export const attractionPreview = () => {
          defaultRender(defaultAttraction)
    };

eventHub.addEventListener("attractionChosenEvent", customEvent => {
  const attractionId = parseInt(customEvent.detail.attraction);
  getAttractions().then(() => {
    const allTheAttractions = useAttractions();
    const selectedAttraction = allTheAttractions.find(currentAttraction => {
      return currentAttraction.id === attractionId;
    });
    render(selectedAttraction);
  });
});

  //Listens for the custom event, parkDialogChosenEvent, and renders a dialog box to the DOM.
eventHub.addEventListener("attractionDialogChosenEvent", customEvent => {
  const attractionId = parseInt(customEvent.detail.attraction);
  getAttractions().then(() => {
    const allTheAttractions = useAttractions();
    const selectedAttractionObject = allTheAttractions.find(currentAttraction => {
      return currentAttraction.id === attractionId;
    });
    dialogRender(selectedAttractionObject);
    const attractionDialog = document.querySelector("#attractionDialog")
    attractionDialog.showModal()
  });
});

