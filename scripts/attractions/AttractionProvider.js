// need an empty array to hold attraction data

let attractions = []

//function to export .slice() of attraction data (useAttractions)

export const useAttractions = () => {
    attractions.sort(
        (currentObject, nextObject) => {
            const firstAttraction = currentObject.name
            const secondAttraction = nextObject.name

            if (firstAttraction < secondAttraction) { return -1; }
            if (firstAttraction > secondAttraction) { return 1; }
            return 0;
        }
    )
    return attractions.slice()
}

//function to get attraction data from API (getAttractions)

export const getAttractions = () => {
    /*
        Load database state into application state with a fetch().
        Make sure the last `then()` sets the local `attractions`
        variable to what is in the response from the API.
    */

   return fetch('http://holidayroad.nss.team/bizarreries')
        .then(response => response.json())
        .then(
            parsedAttractions => {
                attractions = parsedAttractions
                console.table(attractions)
       }
   )
}