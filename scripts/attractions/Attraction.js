//HTML representation of one attraction

export const Attraction = (attractionObject) => {
    return `
        <h2>${attractionObject.name}</h2>
        <div id="attractionDialogButtonContainer"></div>
    `
}

export const defaultAttraction = () => {
    return `
        <h2>Choose a Park!</h2>
        <img id="attractionImage" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/elvis-presley-memorial-chapel-arizona-giovanni-allievi.jpg">
        
    `
}