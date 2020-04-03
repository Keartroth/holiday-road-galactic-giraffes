import { useEateries, getEateries } from "./EateryProvider.js";
import { Eatery, defaultEatery } from "./Eatery.js";
import { EateryDialog } from "./EateryDialog.js";
import { EateryDialogButton } from "./EateryDialogButton.js";


//reference DOM node to hold the Eatery html representation 
const contentTarget = document.querySelector("#eateryPreview");

//reference DOM node to hold the Eatery dialog html representation
const dialogContainerTarget = document.querySelector("#dialogContainer");

//reference DOM node to listen for custom events
const eventHub = document.querySelector(".container");

//Listen for custom event "eateryChosenEvent"
eventHub.addEventListener("eateryChosenEvent", customEvent => {
  //declare variable to take ownership of the detail(detail.eatery) being passed along from the custom event.
  const eateryId = parseInt(customEvent.detail.eatery);
  // gather all of the eatery data from API
  getEateries().then(() => {
    //declare variable to take ownership of the copy of the jsonified eatery data 
    const allTheEateries = useEateries();
    // declare variable
    /**
    use .find on the eatery data set which will look for and return the eatery object with a property called "id" that 
    matches the "eateryId" value(detail.eatery) being passed along through the "eateryChosenEvent" . 
    **/
   const selectedEatery = allTheEateries.find(currentEatery => {
     return currentEatery.id === eateryId;
    });
    //invoke render function, passing through an argument of the selectedEatery variable. 
    render(selectedEatery);
  });
});


//declares the dialogRender function which takes an argument (EateryObject) and renders the eatery dialog html representaion to the specified DOM node.
const dialogRender = EateryObject => {
  dialogContainerTarget.innerHTML = EateryDialog(EateryObject);
};

//declares the defaultRender function which renders the default eatery html representaion to the specified DOM node.
const defaultRender = () => {
  contentTarget.innerHTML = defaultEatery();
};


const render = eatery => {
  //invokes the Eatery function with an eatery object as an argument, which renders the Eatery html representation to the specified DOM node.
  contentTarget.innerHTML = Eatery(eatery);
  //reference a DOM node to hold eatery dialog button 
  const buttonContentTarget = document.querySelector(
    "#eateryDialogButtonContainer"
    );
    //invokes the EateryDialogButton function with an eatery object as an argument which renders the dialog button html representaion to the specified DOM node.
    buttonContentTarget.innerHTML = EateryDialogButton(eatery);
  };
  
  //declares funtion DefaultEateryPreview which is exported to main.js and invokes the deaultRender function 
  export const DefaultEateryPreview = () => {
    defaultRender();
  };
  
  //Listens for the custom event, eateryDialogChosenEvent, and renders a dialog box to the DOM.
  eventHub.addEventListener("eateryDialogChosenEvent", customEvent => {
    //declare a variable which takes ownership of the detail being passed along through the custom event
    const eateryId = customEvent.detail.eatery;
    //gathers all eatery data
    getEateries().then(() => {
      //declare a variable which takes ownership of the copy of our eatery data set
      const allTheEateries = useEateries();
    //declare a variable 
    /**
    use .find on the eatery data set which will look for the eatery object with an id property that 
    matches the "eateryId" value being passed along through the "eateryDialogChosenEvent". 
    **/
    const selectedEateryObject = allTheEateries.find(currentEatery => {
      return currentEatery.id === eateryId;
    });
    //invoke dialogRender with an argument of the found eatery object (selectedEateryObject)
    dialogRender(selectedEateryObject);
    //reference DOM node to hold the eatery dialog
    const eateryDialog = document.querySelector("#eateryDialog");
    // use showModal method on our DOM reference to show the dialog.
    eateryDialog.showModal();
  });
});
