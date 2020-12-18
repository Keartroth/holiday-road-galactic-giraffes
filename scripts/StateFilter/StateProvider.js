// need an empty array to hold states data

let states = [];

//function to export .slice() of state data (useStates)

export const useStates = () => {
  states.sort((currentObject, nextObject) => {
    const currentState = currentObject.stateName;
    const nextState = nextObject.stateName;

    if (currentState < nextState) {
      return -1;
    }
    if (currentState > nextState) {
      return 1;
    }
    return 0;
  });
  return states.slice();
};

//function to get states data from db.json (getStates)

export const getStates = () => {
  /*
        Load database state into application state with a fetch().
        Make sure the last `then()` sets the local `states`
        variable to what is in the response from the API.
    */

  return fetch("http://localhost:8088/states")
    .then(response => response.json())
    .then(parsedStates => {
      states = parsedStates;
    });
};