import { Settings } from "../Settings.js"

// need an empty array to hold park data

let parks = []

//function to export .slice() of park data (useParks)

export const useParks = () => parks.slice()

//function to get park data from API (getParks)

export const getParks = () => {
    /*
        Load database state into application state with a fetch().
        Make sure the last `then()` sets the local `Parks`
        variable to what is in the response from the API.
    */

   return fetch('http://localhost:9000/parks')
        .then(response => response.json())
        .then(
            parsedParks => {
                console.log(parsedParks)
                parks = parsedParks
       }
   )
}
