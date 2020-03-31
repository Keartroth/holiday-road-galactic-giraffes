export const ParkDialogButton = (park) => {
    return `
    <button type="button" id="parkDialogButton--${park.parkCode}">Click Here for Park Info</button>
    `
}

const contentTarget = document.querySelector("#parkPreview");
const eventHub = document.querySelector(".container");

// Dispatches a custom event, parkDialogChosenEvent, and passes on the chosenPark detail.
contentTarget.addEventListener("click", event => {
    if (event.target.id.startsWith("parkDialogButton--")) {
        let chosenPark = event.target.id.split("--")[1];
        let parkDialogChosenEvent = new CustomEvent("parkDialogChosenEvent", {
            detail: {
                park: chosenPark
            }
        });
        eventHub.dispatchEvent(parkDialogChosenEvent);
    }
});