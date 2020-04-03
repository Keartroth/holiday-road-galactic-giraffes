// need an empty array to hold eatery data

let eateries = [];

//function (exported to EateryPreview.js) to export .slice() of eatery data (useEatery)

export const useEateries = () => {

//sort the eatery array alphabetically by business name

  eateries.sort((currentObject, nextObject) => {
    const currentEatery = currentObject.businessName;
    const nextEatery = nextObject.businessName;

    if (currentEatery < nextEatery) {
      return -1;
    }
    if (currentEatery > nextEatery) {
      return 1;
    }
    return 0;
  });
  return eateries.slice();
};

//function to get eatery data from db.json (getEateries)

export const getEateries = () => {
/*
  Load database state into application state with a fetch().
  Make sure the last `then()` sets the local `eateries`
  variable to what is in the response from the API.
*/

  return fetch("http://holidayroad.nss.team/eateries")
    .then(response => response.json())
    .then(parsedEateries => {
      eateries = parsedEateries;
    });
};
