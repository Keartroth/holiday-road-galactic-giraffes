export const Eatery = eateryObject => {
  return `
        <h2>${eateryObject.businessName}</h2>
        <h4>${eateryObject.city}, ${eateryObject.state}</h4>
        <p>${eateryObject.description}</p>
        <div id="eateryDialogButtonContainer"></div>
    `;
};
export const defaultEatery = () => {
  return `
        <h2>Chose an eatery!</h2>
        <p>Please select a park to see eateries.</p>
        <img id="eateryImage" class="eateryImageClass" src="https://images.unsplash.com/photo-1543373072-69f3d4788832?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"></img>
    `;
};
