import { useStates } from "./StateProvider.js";

const contentTarget = document.querySelector("#stateFilter");
const eventHub = document.querySelector(".container");

const render = (arrayOfStates) => {
  contentTarget.innerHTML =
    // sets value of State Select to zero then maps over the array of states and returns an option which renders just a single state name
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

export const StateFilter = () => {
  const states = useStates();
  render(states);
}

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

// Listens for the custom event "newItinerySaved" and resets the state select.

eventHub.addEventListener("newItinerarySaved", evt => {
  document.querySelector("#stateDropdown").value = "0";
});