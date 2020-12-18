import { useEateries, getEateries } from "./EateryProvider.js";
import { Eatery, defaultEatery } from "./Eatery.js";
import { EateryDialog } from "./EateryDialog.js";
import { EateryDialogButton } from "./EateryDialogButton.js";

//Declare variable to hold park array

//Target DOM element to hold Park.js object

const contentTarget = document.querySelector("#eateryPreview");
const dialogContainerTarget = document.querySelector("#dialogContainer");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("eateryChosenEvent", customEvent => {
  const eateryId = parseInt(customEvent.detail.eatery);
  getEateries().then(() => {
    const allTheEateries = useEateries();
    const selectedEatery = allTheEateries.find(currentEatery => {
      return currentEatery.id === eateryId;
    });
    render(selectedEatery);
  });
});

// Function, dialogRender, which dynamically renders a dialog component to the DOM.
const dialogRender = EateryObject => {
  dialogContainerTarget.innerHTML = EateryDialog(EateryObject);
};

const defaultRender = () => {
  contentTarget.innerHTML = defaultEatery();
};

const render = eatery => {
  contentTarget.innerHTML = Eatery(eatery);
  const buttonContentTarget = document.querySelector(
    "#eateryDialogButtonContainer"
  );
  buttonContentTarget.innerHTML = EateryDialogButton(eatery);
};

export const DefaultEateryPreview = () => {
  defaultRender();
};

//Listens for the custom event, parkDialogChosenEvent, and renders a dialog box to the DOM.
eventHub.addEventListener("eateryDialogChosenEvent", customEvent => {
  const eateryId = customEvent.detail.eatery;
  getEateries().then(() => {
    const allTheEateries = useEateries();
    const selectedEateryObject = allTheEateries.find(currentEatery => {
      return currentEatery.id === eateryId;
    });
    dialogRender(selectedEateryObject);
    const eateryDialog = document.querySelector("#eateryDialog");
    eateryDialog.showModal();
  });
});

// Listens for the custom event "newItinerySaved" and resets the eatery preview.

eventHub.addEventListener("newItinerarySaved", evt => {
  defaultRender();
});