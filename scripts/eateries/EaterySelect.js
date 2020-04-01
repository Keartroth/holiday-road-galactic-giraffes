import { useEateries, getEateries } from "./EateryProvider.js";
import { getParks, useParks } from "../parks/ParkProvider.js";

const contentTarget = document.querySelector("#eateryFilter");
const eventHub = document.querySelector(".container");

const render = eateriesCollection => {
  contentTarget.innerHTML =
    // sets value of Please select crime to zero then maps over the array of crimes and returns an option which renders just a single crime name
    `
        <select class="dropdown" id="eateryDropdown">
            <option value="0">Select Eatery...</option>  
        ${eateriesCollection
          .map(singleEatery => {
            return `<option value="${singleEatery.id}" class="selectOption">${singleEatery.businessName}</option>`;
          })
          .join("")}
 
        </select>
    `;
};

eventHub.addEventListener("parkChosenEvent", customEvent => {
  const parkAbbrev = customEvent.detail.park;
  getParks().then(() => {
    const allTheParks = useParks();
    const selectedParkObject = allTheParks.find(currentPark => {
      return currentPark.parkCode === parkAbbrev;
    });
    const stateString = selectedParkObject.states;
    getEateries().then(() => {
      const allTheEateries = useEateries();
      const stateArray = stateString.split(",");
      let selectedEateryArray = [];
      for (const state of stateArray) {
        selectedEateryArray.push(
          allTheEateries.find(currentEatery => {
            return currentEatery.state === state;
          })
        );
      }
      const orderedEateryArray = selectedEateryArray.sort(
        (currentObject, nextObject) => {
          const currentObjectName = currentObject.businessName;
          const nextObjectName = nextObject.businessName;
          if (currentObjectName < nextObjectName) {
            return -1;
          }
          if (currentObjectName > nextObjectName) {
            return 1;
          }
          return 0;
        }
      );
      render(orderedEateryArray);
    });
  });
});

// eventHub listen event for parkChosenEvent

// .find on useParks to get the park object

// grab the park state(s) & set to an array

// filter useEateries with that array & set to a variable

// call the render function for the select element
// with a .map using the filtered array
