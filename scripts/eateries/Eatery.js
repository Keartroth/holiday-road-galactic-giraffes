/*
* HTML representation of one eatery, using properties from an eatery object in the NSS database,
* http://holidayroad.nss.team/eateries, & exported to EateryPreview.js
*/
export const Eatery = eateryObject => {
  return `
        <h2>${eateryObject.businessName}</h2>
        <h4>${eateryObject.city}, ${eateryObject.state}</h4>
        <p>${eateryObject.description}</p>
        <div id="eateryDialogButtonContainer"></div>
    `;
};

//HTML representation of one default eatery, used as a placeholder on page load, & exported to EateryPreview.js
export const defaultEatery = () => {
  return `
        <h2>Bob's Burgers</h2>
        <h4>Nashville, TN</h4>
        <p>This place would be awesome. Please select a park to see real eateries.</p>
        <img id="eateryImage" class="eateryImageClass" src="https://images.unsplash.com/photo-1543373072-69f3d4788832?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"></img>
    `;
};