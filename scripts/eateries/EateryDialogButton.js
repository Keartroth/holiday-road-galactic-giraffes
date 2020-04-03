/**
 * Function to represent the dialog button below the rendered eatery
 */

export const EateryDialogButton = eatery => {
  return `
    <button type="button" id="eateryDialogButton--${eatery.id}">Click Here for Ameneties</button>
    `;
};

/**
 * References to DOM nodes that will be targeted
 * contentTarget will be populated with the dialog button
 * all custom events will be broadcast to eventHub
 */

const contentTarget = document.querySelector("#eateryPreview");
const eventHub = document.querySelector(".container");


//Dispatches a custom event when the user chooses an eatery from the eatery dropdown (eateryDialogChosenEvent)

contentTarget.addEventListener("click", event => {

//If statement making sure the dialog button is what the user clicked

  if (event.target.id.startsWith("eateryDialogButton--")) {

//Declaring chosenEatery as the ID of the eatery chosen

    let chosenEatery = parseInt(event.target.id.split("--")[1]);
    let eateryDialogChosenEvent = new CustomEvent("eateryDialogChosenEvent", {

//Sends eatery ID as a detail (chosenEatery)

      detail: {
        eatery: chosenEatery
      }
    });

/**
 * Dispatches custom event to event hub (eateryDialogChosenEvent)
 * Tells interested modules that an eatery has been chosen
 */

    eventHub.dispatchEvent(eateryDialogChosenEvent);
  }
});
