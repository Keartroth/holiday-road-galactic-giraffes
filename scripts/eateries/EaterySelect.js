import { useEateries, getEateries } from "./EateryProvider.js";
import { getParks, useParks } from "../parks/ParkProvider.js";

/**
 * References to DOM nodes that will be targeted
 * contentTarget will be populated with the dropdown menu of eatery options
 * all custom events will be broadcast to eventHub
 */
const contentTarget = document.querySelector("#eateryFilter");
const eventHub = document.querySelector(".container");


const render = (eateriesCollection, unfilteredCollection) => {
  contentTarget.innerHTML =
    /* sets value of Eatery Select to zero then maps over the array of eateries 
    and returns an option which renders just a single eatery business name (based on property from api) */
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

//Listens to when an eatery is chosen from the dropdown menu (eateryChosenEvent)

contentTarget.addEventListener("change", event => {
  if (event.target.id === "eateryDropdown") {

//Declares chosenEatery as the value of the eatery chosen from dropdown

    let chosenEatery = event.target.value;
    if (chosenEatery === "0") {
      return false;
    } else {
 /* if chosenEatery doesn't equal "O", dispatch eateryChosenEvent with detail of eatery
 (chosenEatery's value) to EateryPreview */
      let eateryChosenEvent = new CustomEvent("eateryChosenEvent", {
        detail: {
          eatery: chosenEatery
        }
      });
      eventHub.dispatchEvent(eateryChosenEvent);
    }
  }
});

//eventHub listens for "parkChosenEvent" dispatched from ParkSelect

eventHub.addEventListener("parkChosenEvent", customEvent => {
//declares detail being passed from "park" as parkAbbrev
  const parkAbbrev = customEvent.detail.park;
// setting an empty array 
  let selectedEateriesArray = [];
//Fetches all parks from database then declares allTheParks as the full array of parks
  getParks().then(() => {
    const allTheParks = useParks();
 
/* Filters through parks array in db.json & returns the park (set to selectedParkObject) whose property of ParkCode 
 equals that of parkAbbrev chosen from the park dropdown (in ParkSelect.js)
 */
    const selectedParkObject = allTheParks.find(currentPark => {
      return currentPark.parkCode === parkAbbrev;
    });
 // declares stateString as that park filtered from above & its property of states
    const stateString = selectedParkObject.states;
// Fetches all eateries from database then declares allTheEateries as the full array of eateries
    getEateries().then(() => {
      const allTheEateries = useEateries();
 //stateArray splits the string of stateString on the comma
      const stateArray = stateString.split(",");
 // loops over every state in stateArray and pushes the eatery whose property "state" matches the current state 
      for (const state of stateArray) {
        selectedEateriesArray.push(
          allTheEateries.find(currentEateries => {
            return currentEateries.state === state;
          })
        );
      }
 // alphabetizes the eateries (both the filtered and unfiltered)
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
