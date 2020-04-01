export const EateryDialogButton = eatery => {
  return `
    <button type="button" id="eateryDialogButton--${eatery.id}">Click Here for Ameneties</button>
    `;
};

const contentTarget = document.querySelector("#eateryPreview");
const eventHub = document.querySelector(".container");

// Dispatches a custom event, eateryDialogChosenEvent, and passes on the chosenEatery detail.
contentTarget.addEventListener("click", event => {
  if (event.target.id.startsWith("eateryDialogButton--")) {
    let chosenEatery = parseInt(event.target.id.split("--")[1]);
    let eateryDialogChosenEvent = new CustomEvent("eateryDialogChosenEvent", {
      detail: {
        eatery: chosenEatery
      }
    });
    eventHub.dispatchEvent(eateryDialogChosenEvent);
  }
});
