import { useAttractions, getAttractions } from "./AttractionProvider.js";
import { getParks, useParks } from "../parks/ParkProvider.js";


const contentTarget = document.querySelector("#attractionFilter");
const eventHub = document.querySelector(".container");

const render = (attractionsCollection, unfilteredCollection) => {
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
          ${unfilteredCollection
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


