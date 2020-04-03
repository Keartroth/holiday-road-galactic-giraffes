import { useStates } from "./StateProvider.js";

// Query the DOM for nodes matching specified id or class

const contentTarget = document.querySelector("#stateFilter");
const eventHub = document.querySelector(".container");

// Builds HTML representation of state select dropdown from array of states and renders it on the DOM. 

const render = (arrayOfStates) => {
  contentTarget.innerHTML =
    /*
    * sets value of State Select to zero then iterates (.map()) over the array of states 
    * and returns an option which renders just a single state name
    */
    `
        <select class="dropdown" id="stateDropdown">
            <option value="0">Filter parks by state</option>
            <option value="1">Show entire list of parks</option>
            ${arrayOfStates.map(singleState => {
                return `<option value="${singleState.stateAbbrev}" class="selectOption">${singleState.stateName}</option>`;
            }).join("")}
            <option value="1">Show entire list of parks</option>
        </select>
    `;
};

/*
* Function responsible for getting the list of states and invoking the render function with the list as an argument. 
* Invoked on main.js.
*/
export const StateFilter = () => {
    const states = useStates();
    render(states);
}

/**
 * Listening for option to be selected from dropdown and dispatches a custom event based on the option chosen. 
 * If a state is chosen custom event dispatches statechosenevent with a detail of "state".
 * If show entire list of parks is selected the list of parks will reset to show all the parks. 
 */
contentTarget.addEventListener("change", event => {
  if (event.target.id === "stateDropdown") {
    let chosenState = event.target.value;
    if (chosenState === "0") {
        return false
    } else if (chosenState === "1") {
        let resetChosenEvent = new CustomEvent("resetChosenEvent", {
          });
          eventHub.dispatchEvent(resetChosenEvent);
    } else {
      let stateChosenEvent = new CustomEvent("stateChosenEvent", {
        detail: {
          state: chosenState
        }
      });
      eventHub.dispatchEvent(stateChosenEvent);
    }
  }
});