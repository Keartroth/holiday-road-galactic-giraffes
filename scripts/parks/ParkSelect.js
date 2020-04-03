import { useParks, getParks } from "./ParkProvider.js";

/**
 * References to DOM nodes that will be targeted
 * contentTarget will be populated with the dropdown menu of park options
 * all custom events will be broadcast to eventHub
 */

const contentTarget = document.querySelector("#parkFilter");
const eventHub = document.querySelector(".container");

//Listens to when a park is chosen from the dropdown menu (parkChosenEvent)

contentTarget.addEventListener("change", event => {
  if (event.target.id === "parkDropdown") {

    //Declares chosenPark as the value of the park chosen from dropdown

    let chosenPark = event.target.value;

    /**
     * Sends custom event informing interested modules that a park has been chosen
     * Sends the park they chose (chosenPark) as a detail
     */

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

  /**
   * Sets value of Select Park to value 0, then iterates (.map()) over the array of parks and 
   * renders a single park for each dropdown option
   */
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

// Exports ParkSelect, the main component which renders the park select dropdown (#parkDropdown)
 
  export const ParkSelect = () => {
    const parks = useParks();
    render(parks);
};

/*
* stateChosenEvent filters the Park Select component
* to display only the national parks within the selected state.
*/

eventHub.addEventListener("stateChosenEvent", customEvent => {
  const stateAbbrev = customEvent.detail.state;

  //Declares selectedParksArray as array to hold the parks that match the state chosen

  let selectedParksArray = [];

  //Fetches all parks from database then declares allTheParks as the full array of parks

  getParks().then(() => {
    const allTheParks = useParks();

  /* Loops over all parks to fill the selectedParksArray
   * Returns only the parks in states that match the 
   * state chosen from the state dropdown (in StateSelect.js)
   */

    selectedParksArray = allTheParks.filter(currentParkObject => {
      const parkStateString = currentParkObject.states

      return parkStateString.includes(stateAbbrev)
    })

  //Re-renders the park select dropdown with only the parks matching the state dropdown selection

    render(selectedParksArray);
  });
});

/*
* resetChosenEvent invokes ParkSelect to re-render
* the Park Select component with all national parks.
*/

eventHub.addEventListener("resetChosenEvent", customEvent => {
  ParkSelect();
});