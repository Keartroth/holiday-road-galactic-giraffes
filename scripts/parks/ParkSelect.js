import { useParks } from "./ParkProvider.js";


const contentTarget = document.querySelector("#parkFilter")

const render = parksCollection => {
    contentTarget.innerHTML = 
    // sets value of Please select crime to zero then maps over the array of crimes and returns an option which renders just a single crime name 
    `
        <select class="dropdown" id="parkDropdown">
            <option value="0">Select Park...</option>  
        ${
            parksCollection.map(singlePark => {
                return `<option value="${singlePark.parkCode}" class="selectOption">${singlePark.name}</option>`
            })
            .join("")
        }
 
        </select>
    `
}
// exports the function ConvictionSelect 
// this is the main component which renders all convictions 
export const ParkSelect = () => {
    const parks = useParks()
    render(parks)
}