import { useAttractions, getAttractions } from "./AttractionProvider.js";
import { getParks, useParks } from "../parks/ParkProvider.js";


const contentTarget = document.querySelector("#attractionFilter");
const eventHub = document.querySelector(".container");

const render = (attractionsCollection, unfilteredCollection) => {
  const removedDuplicateAttractions = unfilteredCollection.filter(attraction => !attractionsCollection.includes(attraction));

  contentTarget.innerHTML =
    // sets value of Please select crime to zero then maps over the array of crimes and returns an option which renders just a single crime name
    `
        <select class="dropdown" id="attractionDropdown"> 
            <option value="0">---------Attractions Near Your Park---------</option>  
        ${attractionsCollection
      .map(singleAttraction => {
        return `<option value="${singleAttraction.id}" class="selectOption">${singleAttraction.name}</option>`;
      })
      .join("")}
          <option value="0"></option> 
          <option value="0">---------All Attractions---------</option> 
          ${removedDuplicateAttractions
      .map(singleAttraction => {
        return `<option value="${singleAttraction.id}" class="selectOption">${singleAttraction.name}</option>`;
      })
      .join("")}
  
        </select>
    `;
};

eventHub.addEventListener("parkChosenEvent", customEvent => {
  const parkAbbrev = customEvent.detail.park;
  let selectedAttractionsArray = [];
  getParks().then(() => {
    const allTheParks = useParks();
    const selectedParkObject = allTheParks.find(currentPark => {
      return currentPark.parkCode === parkAbbrev;
    });
    const stateString = selectedParkObject.states;
    getAttractions().then(() => {
      const allTheAttractions = useAttractions();
      const stateArray = stateString.split(",");
      for (const state of stateArray) {
        selectedAttractionsArray.push(
          allTheAttractions.find(currentAttraction => {
            return currentAttraction.state === state;
          })
        );
      }
      const sortingFunction = (array) => {
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
        })
        return sortedArray
      }
      const orderedAttractionsArray = sortingFunction(selectedAttractionsArray)
      const allTheAttractionsSortedArray = sortingFunction(allTheAttractions)
      render(orderedAttractionsArray, allTheAttractionsSortedArray);
    });
  });
});

contentTarget.addEventListener("change", event => {
  if (event.target.id === "attractionDropdown") {
    let chosenAttraction = event.target.value;
    if (chosenAttraction === "0") {
      return false;
    } else {
      let attractionChosenEvent = new CustomEvent("attractionChosenEvent", {
        detail: {
          attraction: chosenAttraction
        }
      });
      eventHub.dispatchEvent(attractionChosenEvent);
    }
  }
});


// Listens for the custom event "newItinerySaved" and resets the attraction select.

eventHub.addEventListener("newItinerarySaved", evt => {
  contentTarget.innerHTML = "";
});