//HTML representation of one park dialog, using properties from park array in db.json & exported to ParkPreview.js
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
//References the DOM node that will be targeted which listens for the following event   

const contentTarget = document.querySelector("#dialogContainer");

// Listens for the click on the Close button in ParkDialog which closes ParkDialog when clicked 
contentTarget.addEventListener("click", event => {
    if (event.target.id === "closeDialogButton") {
        const parkDialogBox = document.querySelector("#parkDialog")
        parkDialogBox.close();
    }
})