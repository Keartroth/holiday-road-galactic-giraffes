//HTML representation of one park dialog

export const AttractionDialog = (attractionDialogObject) => {
    
    return `
    <dialog id="attractionDialog">
        <h2>${attractionDialogObject.name}</h2>
        <div id="attractionInfoWrapper">
            <div id="attractionLocation">${attractionDialogObject.city}, ${attractionDialogObject.state}</div>
            <p id="attractionDialogDescription">${attractionDialogObject.description}</p>
            <ul>
                <li>Souvenirs: ${attractionDialogObject.ameneties.souvenirs ? "✅" : "🚫"}</li>
                <li>Restrooms: ${attractionDialogObject.ameneties.restrooms ? "✅" : "🚫"}</li>
            </ul>
        </div>
        <button type="button" id="closeAttractionDialogButton">Close</button>
    </dialog>
    `
}

const contentTarget = document.querySelector("#dialogContainer");

// Dispatches a custom event, attractionDialogChosenEvent, and passes on the chosenAttraction detail.
contentTarget.addEventListener("click", event => {
    if (event.target.id === "closeAttractionDialogButton") {
        const attractionDialogBox = document.querySelector("#attractionDialog")
        attractionDialogBox.close();
    }
})


