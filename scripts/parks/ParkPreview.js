//Bring in list of all parks from park provider
import { useParks, getParks } from "./ParkProvider.js";
import { Park } from "./Park.js";

//Declare variable to hold park array

const allTheParks =  useParks()

//Target DOM element to hold Park.js object

const contentTarget = document.querySelector("#parkPreview")


    
//Target DOM element to hold Weather.js object
const weatherContentTarget = document.querySelector("#weatherContainer")
    
//Target DOM element to hold ParkDialogButton.js object

const buttonContentTarget = document.querySelector("#parkDialogButtonContainer")

//Function to loop through park array and render park object

export const parkPreview = () => {
    render()
}



const render = () => {
    getParks().then(() => {
        const allTheParks = useParks()
        const aPark = allTheParks[0]

        contentTarget.innerHTML = Park(aPark)
            // .map(
            //     currentParkObject => {
            //         return Park(currentParkObject)
            //     }
            // ).join(""
    })
}