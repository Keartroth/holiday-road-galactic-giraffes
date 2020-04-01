import { useEateries, getEateries } from "./EateryProvider.js";
import { getParks, useParks } from "../parks/ParkProvider.js";

const contentTarget = document.querySelector("#eateryFilter");
const eventHub = document.querySelector(".container");

const render = (eateriesCollection, unfilteredCollection) => {
  contentTarget.innerHTML =
    // sets value of Eatery Select to zero then maps over the array of eateries and returns an option which renders just a single eatery name
    `
        <select class="dropdown" id="eateryDropdown"> 
            <option value="0">---------Eateries Near Your Park---------</option>  
        ${eateriesCollection
          .map(singleEatery => {
            return `<option value="${singleEatery.id}" class="selectOption">${singleEatery.businessName}</option>`;
          })
          .join("")}
          <option value="0"></option> 
          <option value="0">---------All Eateries---------</option> 
          ${unfilteredCollection
            .map(singleEatery => {
              return `<option value="${singleEatery.id}" class="selectOption">${singleEatery.businessName}</option>`;
            })
            .join("")}
  
        </select>
    `;
};

contentTarget.addEventListener("change", event => {
  if (event.target.id === "eateryDropdown") {
    let chosenEatery = event.target.value;
    if (chosenEatery === "0") {
      return false;
    } else {
      let eateryChosenEvent = new CustomEvent("eateryChosenEvent", {
        detail: {
          eatery: chosenEatery
        }
      });
      eventHub.dispatchEvent(eateryChosenEvent);
    }
  }
});
eventHub.addEventListener("parkChosenEvent", customEvent => {
  const parkAbbrev = customEvent.detail.park;
  let selectedEateriesArray = [];
  getParks().then(() => {
    const allTheParks = useParks();
    const selectedParkObject = allTheParks.find(currentPark => {
      return currentPark.parkCode === parkAbbrev;
    });
    const stateString = selectedParkObject.states;
    getEateries().then(() => {
      const allTheEateries = useEateries();
      const stateArray = stateString.split(",");
      for (const state of stateArray) {
        selectedEateriesArray.push(
          allTheEateries.find(currentEateries => {
            return currentEateries.state === state;
          })
        );
      }
      const sortingFunction = array => {
        const sortedArray = array.sort((currentObject, nextObject) => {
          const currentObjectName = currentObject.businessName;
          const nextObjectName = nextObject.businessName;
          if (currentObjectName < nextObjectName) {
            return -1;
          }
          if (currentObjectName > nextObjectName) {
            return 1;
          }
          return 0;
        });
        return sortedArray;
      };
      const orderedEateriesArray = sortingFunction(selectedEateriesArray);
      const allTheEateriesSortedArray = sortingFunction(allTheEateries);
      render(orderedEateriesArray, allTheEateriesSortedArray);
    });
  });
});
