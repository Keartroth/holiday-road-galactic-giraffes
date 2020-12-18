//HTML representation of one park

export const Park = (parkObject) => {
    let imageLink = "https://longsshotokan.com/wp-content/uploads/2017/04/default-image.jpg";
    if (parkObject.images.length > 0) {
        imageLink = parkObject.images[0].url;
    }
    return `
        <h2>${parkObject.name}</h2>
        <img id="parkImage" class="parkImageClass" src="${imageLink}"></img>
        <div id="weatherContainer"></div>
        <div id="parkDialogButtonContainer"></div>
    `
}