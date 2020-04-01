export const AttractionDialogButton = (attraction) => {
    return `
    <button type="button" id="attractionDialogButton--${attraction.id}">Click Here for Attraction Info</button>
    `
}

const contentTarget = document.querySelector("#attractionPreview");
const eventHub = document.querySelector(".container");

// Dispatches a custom event, attractionDialogChosenEvent, and passes on the chosenAttraction detail.
contentTarget.addEventListener("click", event => {
    if (event.target.id.startsWith("attractionDialogButton--")) {
        let chosenAttraction = parseInt(event.target.id.split("--")[1]);
        let attractionDialogChosenEvent = new CustomEvent("attractionDialogChosenEvent", {
            detail: {
                attraction: chosenAttraction
            }
        });
        eventHub.dispatchEvent(attractionDialogChosenEvent);
    }
});