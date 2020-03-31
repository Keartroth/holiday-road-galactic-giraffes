
const contentTarget = document.querySelector("#attractionFilter");
const eventHub = document.querySelector(".container");

// Dispatches a custom event, parkChosenEvent, and passes on the chosenPark detail.
contentTarget.addEventListener("change", event => {
  if (event.target.id === "parkDropdown") {
    let chosenPark = event.target.value;
    let parkChosenEvent = new CustomEvent("parkChosenEvent", {
      detail: {
        park: chosenPark
      }
    });
    eventHub.dispatchEvent(parkChosenEvent);
  }
});

const render = attractionsCollection => {
  contentTarget.innerHTML =
    // sets value of Please select crime to zero then maps over the array of crimes and returns an option which renders just a single crime name
    `
        <select class="dropdown" id="attractionDropdown">
            <option value="0">Select Attraction...</option>  
        ${attractionsCollection
          .filter(singleAttraction => {
            return `<option value="${singlePark.parkCode}" class="selectOption">${singlePark.name}</option>`;
          })
          .join("")}
 
        </select>
    `;
};
// exports the function ConvictionSelect
// this is the main component which renders all convictions
export const ParkSelect = () => {
  const parks = useParks();
  render(parks);
};
