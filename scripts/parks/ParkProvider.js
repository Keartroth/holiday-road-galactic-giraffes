import { Settings } from "../Settings.js"

// define an empty array to hold park data

let parks = []

//function to export a copy (.slice()) of park data (useParks) which is an array of park objects. 
//alphabetize that list of parks by its "name" property.

export const useParks = () => {
    parks.sort(
        (currentObject, nextObject) => {
            const firstPark = currentObject.name
            const secondPark = nextObject.name

            if (firstPark < secondPark) { return -1; }
            if (firstPark > secondPark) { return 1; }
            return 0;
        }
    )
    return parks.slice()
}

//function to get park data from API (getParks)

export const getParks = () => {
    /*
        Load database state into application state with a fetch().
        Make sure the last `then()` sets the local `parks`
        variable to what is in the response from the API.
    */

   return fetch('http://localhost:9000/parks')
    .then( response => response.json())
    .then( parsedParks => {
                parks = parsedParks
       }
   )
}