//Bring in list of all parks from park provider
import { useParks } from "./ParkProvider.js";

//Declare variable to hold park array

const allTheParks =  useParks()

//Target DOM element to hold Park.js object

const contentTarget = document.querySelector("#parkPreview")

//Target DOM element to hold Weather.js object

const weatherContentTarget = document.querySelector("#weatherContainer")

//Target DOM element to hold ParkDialogButton.js object

const buttonContentTarget = document.querySelector("#parkDialogButtonContainer")

