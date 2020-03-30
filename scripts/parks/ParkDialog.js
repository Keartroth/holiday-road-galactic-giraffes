//HTML representation of one park dialog

export const ParkDialog = (parkDialogObject) => {
    return `
        <img id="parkDialogImage" src="${parkDialogObject.images[0].url}"></img>
        <p id="parkDialogDescription">${parkDialogObject.description}</p>
        <a id="parkDialogLink" href="https://www.nps.gov/${parkDialogObject.parkCode}/planyourvisit/basicinfo.htm">More Info</a>
        <button type="button" id="closeDialogButton">Close</button>
    `
}