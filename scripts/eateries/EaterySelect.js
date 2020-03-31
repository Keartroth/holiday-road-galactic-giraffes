import { useEateries, getEateries } from "./EateryProvider.js";
import { getParks, useParks } from "../parks/ParkProvider.js";

const contentTarget = document.querySelector("#eateryFilter");
const eventHub = document.querySelector(".container");

// Dispatches a custom event, parkChosenEvent, and passes on the chosenPark detail.
// contentTarget.addEventListener("change", event => {
//   if (event.target.id === "parkDropdown") {
//     let chosenPark = event.target.value;
//     let parkChosenEvent = new CustomEvent("parkChosenEvent", {
//       detail: {
//         park: chosenPark
//       }
//     });
//     eventHub.dispatchEvent(parkChosenEvent);
//   }
// });

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
    const stateArray = selectedParkObject.states;
    getEateries().then(() => {
      const allTheEateries = useEateries();
      const splitStateArray = stateArray.split(",");
      let selectedEateryArray = [];
      if (typeof splitStateArray === "string") {
        selectedEateryArray = allTheEateries.filter(
          currentEatery => currentEatery.state === stateArray
        );
      } else {
        for (const state of splitStateArray) {
          selectedEateryArray.push(
            allTheEateries.filter(
              currentEatery => currentEatery.state === state
            )
          );
        }
      }
      render(selectedEateryArray);
    });
  });
});

// eventHub listen event for parkChosenEvent

// .find on useParks to get the park object

// grab the park state(s) & set to an array

// filter useEateries with that array & set to a variable

// call the render function for the select element
// with a .map using the filtered array
