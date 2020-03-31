//HTML representation of one park dialog

export const ParkDialog = (parkDialogObject) => {
    return `
    <dialog id="parkDialog">
        <img id="parkDialogImage" class="parkImageClass" src="${parkDialogObject.images[0].url}"></img>
        <p id="parkDialogDescription">${parkDialogObject.description}</p>
        <a id="parkDialogLink" href="https://www.nps.gov/${parkDialogObject.parkCode}/planyourvisit/basicinfo.htm" target="_blank">More Info</a><br><br>
        <button type="button" id="closeDialogButton">Close</button>
    </dialog>
    `
}

const contentTarget = document.querySelector("#dialogContainer");

// Dispatches a custom event, parkDialogChosenEvent, and passes on the chosenPark detail.
contentTarget.addEventListener("click", event => {
    if (event.target.id === "closeDialogButton") {
        const parkDialogBox = document.querySelector("#parkDialog")
        parkDialogBox.close();
    }
})