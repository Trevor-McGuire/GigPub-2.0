// document.getElementById("comments-button").addEventListener("click",function() {
//   console.log("comment button clicked")
// })

// document.getElementById("breweries-button").addEventListener("click",function() {
//   console.log("breweries button clicked")
// })

var searchEl=document.getElementById("search")
// var eventMainEL = document.querySelectorAll(".event-h2");
// var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';
// var breweryListEls = document.querySelectorAll(".brewery-list")
// var savedCitiesEl = document.getElementById("savedCities")
// var currentCityEl = document.getElementById("currentCity")

// var modalTextEls = document.querySelectorAll(".w3-container");
// var eventContainer = document.querySelectorAll(".event-container")
// renderCityInfo()
if (searchEl) {
    searchEl.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        let city = searchEl.value
        let newPath = `/events/${city}`
        document.location.href = newPath
    }
})
}
// function clickPress(event) {
//   console.log("clickPress() activated.")
//     // Looking for Enter key event
//     if (event.key === "Enter") {
//         document.location.replace("/events")
//         var city = searchEl.value;
//         var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&sort=onSaleStartDate,asc&city=${city}&apikey=${ticketMasterAPIKey}`;
//         saveSearch(city)
//         showCity(city)
//         // Queries the live events from the ticketmaster API
//         function eventsQuery() {
//             fetch(ticketmasterQuery, {
//                 mode: 'cors', 
//             })
//             .then ((response) => response.json())
//             .then((data) => createEventList(data))
//             .catch((err) => console.log(err))
//         }

//         eventsQuery();
//     }
// }

// function getSearches() {
//     var searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]") 
//     return searchHistory
// }

// function clearSearches() {
//     localStorage.setItem('searchHistory', "[]")
//     savedCitiesEl.innerHTML = ""
//     currentCityEl.textContent = ""
// }

// function saveSearch(savedCity) {
//     var cityInfo = {
//     name: savedCity,
//    };
 
//    var searches = getSearches()
//    searches.push(cityInfo)
//    localStorage.setItem('searchHistory', JSON.stringify(searches))
//    showCity(cityInfo.name)
//    renderCityInfo()
// }

// // Function that builds the list of events and applies them to HTML elements

// // Uses the openbrewerydb API to fetch brewery information and display it in modal 
// function getBreweries(latitude, longitude, venueData, index) {
//     fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${latitude},${longitude}&per_page=5`)
//       .then((response) => response.json())
//       .then((data) => {
//         var breweryList = '';
//         for (var i = 0; i < data.length; i++) {
//           var brewery = data[i];

//           // Adds each brewery for its respective venue to <li> list in modal 
//           breweryList += `<li class="brewery-list"><a href="${brewery.website_url}">${brewery.name}</a> - ${brewery.address_1}</li>`;
//         }