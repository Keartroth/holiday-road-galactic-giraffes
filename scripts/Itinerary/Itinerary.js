export const Itinerary = itineraryObject => {
  return `
            <div id="itinerary--${itineraryObject.id}">
                <h4>Trip to ${itineraryObject.park}</h4>
                <ul>
                    <li>Eatery: ${itineraryObject.eatery}</li>
                    <li>Attraction: ${itineraryObject.attraction}</li>
                </ul>
            </div>
    `;
};
