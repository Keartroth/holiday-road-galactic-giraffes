export const Eatery = eateryObject => {
  return `
        <h2>${eateryObject.businessName}</h2>
        <h4>${eateryObject.city}, ${eateryObject.state}</h4>
        <p>${eateryObject.description}</p>
        <img id="eateryImage" class="eateryImageClass" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fstock-photos%2Fdiner.html&psig=AOvVaw35hSFs3Fq_KUvfGb7cnnQg&ust=1585768197130000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiH3-m0xegCFQAAAAAdAAAAABAD"></img>
        <div id="eateryDialogButtonContainer"></div>
    `;
};
