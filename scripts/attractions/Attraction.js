//HTML representation of one attraction

export const Attraction = (attractionObject) => {
    return `
        <h2>${attractionObject.name}</h2>
        <h4>${attractionObject.city}, ${attractionObject.state}</h4>
        <p>${attractionObject.description}</p>
        <div id="attractionDialogButtonContainer"></div>
    `
}

export const defaultAttraction = () => {
    return `
        <h2>Choose an Attraction!</h2>
        <p>Please select a park to see attractions.</p>
        <img id="attractionImage" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/elvis-presley-memorial-chapel-arizona-giovanni-allievi.jpg">
        
    `
}