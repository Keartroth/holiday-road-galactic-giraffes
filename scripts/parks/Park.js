//HTML representation of one park

export const Park = (parkObject) => {
    return `
        <h2>${parkObject.name}</h2>
        <img src="${parkObject.images[0].url}"></img>
        <div id="weatherContainer"></div>
        <div id="parkDialogButtonContainer"></div>
    `
}