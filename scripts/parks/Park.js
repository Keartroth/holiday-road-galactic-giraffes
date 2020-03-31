//HTML representation of one park

export const Park = (parkObject) => {
    return `
        <h2>${parkObject.name}</h2>
        <img id="parkImage" class="parkImageClass" src="${parkObject.images[0].url}"></img>
        <div id="weatherContainer"></div>
        <div id="parkDialogButtonContainer"></div>
    `
}