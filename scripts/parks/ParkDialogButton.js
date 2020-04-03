// Query the DOM for nodes matching the specified id or class

const contentTarget = document.querySelector("#parkPreview");
const eventHub = document.querySelector(".container");

// Function (exported to ParkPreview.js) containing the HTML of the "show park info" button using the specified park code as part of the id.
export const ParkDialogButton = (park) => {
    return `
    <button type="button" id="parkDialogButton--${park.parkCode}">Click Here for Park Info</button>
    `
}


/**
 * Dispatches a custom event, parkDialogChosen, and passes on the chosenPark detail for the park matching the id of the park dialog button. 
 */ 
contentTarget.addEventListener("click", event => {
    if (event.target.id.startsWith("parkDialogButton--")) {
        let chosenPark = event.target.id.split("--")[1];
        let parkDialogChosen = new CustomEvent("parkDialogChosen", {
            detail: {
                park: chosenPark
            }
        });
        eventHub.dispatchEvent(parkDialogChosen);
    }
});