import { useParks, getParks } from "./ParkProvider.js";

const contentTarget = document.querySelector("#parkFilter");
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

const render = parksCollection => {
  contentTarget.innerHTML =
    // sets value of Please select crime to zero then maps over the array of crimes and returns an option which renders just a single crime name
    `
        <select class="dropdown" id="parkDropdown">
            <option value="0">Select Park...</option>  
        ${parksCollection
      .map(singlePark => {
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

/*
* eventHub event listener which listens for the stateChosenEvent and filters the Park Select component
* with all national parks that reside within the selected state.
*/
eventHub.addEventListener("stateChosenEvent", customEvent => {
  const stateAbbrev = customEvent.detail.state;
  let selectedParksArray = [];
  getParks().then(() => {
    const allTheParks = useParks();
    selectedParksArray = allTheParks.filter(currentParkObject => {
      const parkStateString = currentParkObject.states
      return parkStateString.includes(stateAbbrev)
    })
    render(selectedParksArray);
  });
});
/*
* eventHub event listener which listens for the resetChosenEvent and calls the function, 
* ParkSelect, to re-render the Park Select component with all national parks.
*/
eventHub.addEventListener("resetChosenEvent", customEvent => {
  ParkSelect();
});