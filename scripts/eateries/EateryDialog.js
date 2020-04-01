//HTML representation of one eatery dialog

export const EateryDialog = eateryDialogObject => {
  return `
    <dialog id="eateryDialog">
        <h3>${eateryDialogObject.businessName}</h3>
        <ul>
            <li>Wifi: ${eateryDialogObject.ameneties.wifi}</li>
            <li>Pet-friendly: ${eateryDialogObject.ameneties.petFriendly}</li>
            <li>Restroom: ${eateryDialogObject.ameneties.restrooms}</li>
            <li>Wheelchair: ${eateryDialogObject.ameneties.wheelchairAccessible}</li>
        </ul>
        <button type="button" id="closeEateryDialogButton">Close</button>
    </dialog>
    `;
};

const contentTarget = document.querySelector("#dialogContainer");

// Listens for a click event on #closeEateryDialogButton, and closes a corresponding dialog box.
contentTarget.addEventListener("click", event => {
  if (event.target.id === "closeEateryDialogButton") {
    const eateryDialogBox = document.querySelector("#eateryDialog");
    eateryDialogBox.close();
  }
});
