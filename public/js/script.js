document.getElementById("comments-button").addEventListener("click",function() {
  console.log("comment button clicked")
  var comments = this.nextElementSibling;
  if (comments.style.display == "none") {
    comments.style.display = "block"
  } else {
    comments.style.display = "none"
  }
})

document.getElementById("breweries-button").addEventListener("click",function() {
  console.log("breweries button clicked")
  var breweries = this.nextElementSibling;
  if (breweries.style.display == "none") {
    breweries.style.display = "block"
  } else {
    breweries.style.display = "none"
  }
})

var searchEl=document.getElementById("search")
var eventMainEL = document.querySelectorAll(".event-h2");
var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';
var breweryListEls = document.querySelectorAll(".brewery-list")
var savedCitiesEl = document.getElementById("savedCities")
var currentCityEl = document.getElementById("currentCity")

var modalTextEls = document.querySelectorAll(".w3-container");
var eventContainer = document.querySelectorAll(".event-container")
renderCityInfo()

function clickPress(event) {
  console.log("clickPress() activated.")
    // Looking for Enter key event
    if (event.key === "Enter") {
        document.location.replace("/events")
        var city = searchEl.value;
        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&sort=onSaleStartDate,asc&city=${city}&apikey=${ticketMasterAPIKey}`;
        saveSearch(city)
        showCity(city)
        // Queries the live events from the ticketmaster API
        function eventsQuery() {
            fetch(ticketmasterQuery, {
                mode: 'cors', 
            })
            .then ((response) => response.json())
            .then((data) => createEventList(data))
            .catch((err) => console.log(err))
        }

        eventsQuery();
        // Displays list of events once events have been grabbed
        for (event of eventContainer) {event.setAttribute('style', 'display: block;')}
    }
}

function fetchCity(city) {
    console.log(city)
        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&sort=onSaleStartDate,asc&city=${city}&apikey=${ticketMasterAPIKey}`;
        fetch(ticketmasterQuery, {
            mode: 'cors', 
        })
        .then ((response) => response.json())
        .then((data) => createEventList(data))
        .catch((err) => console.log(err))
}

function getSearches() {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]") 
    return searchHistory
}

function clearSearches() {
    localStorage.setItem('searchHistory', "[]")
    savedCitiesEl.innerHTML = ""
    currentCityEl.textContent = ""
}

function saveSearch(savedCity) {
    var cityInfo = {
    name: savedCity,
   };
 
   var searches = getSearches()
   searches.push(cityInfo)
   localStorage.setItem('searchHistory', JSON.stringify(searches))
   showCity(cityInfo.name)
   renderCityInfo()
}

function showCity(city) {
    currentCityEl.textContent = city.toUpperCase();
}
function fetchAndShowCity(city) {
    
    fetchCity(city)
    showCity(city)
    for (var clickevent of eventContainer) {clickevent.setAttribute('style', 'display: block;')}
}
function renderCityInfo() {
    savedCitiesEl.innerHTML = getSearches()
    .map(cityInfo=>`<button onclick="fetchAndShowCity(event.target.value)" class="saved-city" value="${cityInfo.name}">${cityInfo.name.toUpperCase()}</button>`)
    .join("<br>")
    
}

// Function that builds the list of events and applies them to HTML elements
function createEventList(searchData) {
    for (var i = 0; i < eventMainEL.length; i++) {
        
        var event = searchData._embedded.events[i];
        var date = event.dates.start.localDate.slice(5)
        var eventVenue = event._embedded.venues[0]
        var eventName = event.name
        var venueName = eventVenue.name
        var venueLat = eventVenue.location.latitude;
        var venueLon = eventVenue.location.longitude;
        var venueAddress = eventVenue.address.line1;
        // Function call that retrieves brewery information given location from selected event name in list
        getBreweries(venueLat, venueLon, eventVenue, i);
        // Displays the name of the event and the date of that event
        eventMainEL[i].innerHTML = `${eventName} <span class="dates" id="date-${i + 1}">${date}</span>`
        // Displays name of the venue associated with event inside the accordion for that event
        document.querySelectorAll('.event')[i].firstElementChild.innerHTML = `<a href=${eventVenue.url}>${venueName} — ${venueAddress}</a>`;
    }
}
// Uses the openbrewerydb API to fetch brewery information and display it in modal 
function getBreweries(latitude, longitude, venueData, index) {
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${latitude},${longitude}&per_page=5`)
      .then((response) => response.json())
      .then((data) => {
        var breweryList = '';
        for (var i = 0; i < data.length; i++) {
          var brewery = data[i];

          // Adds each brewery for its respective venue to <li> list in modal 
          breweryList += `<li class="brewery-list"><a href="${brewery.website_url}">${brewery.name}</a> - ${brewery.address_1}</li>`;
        }

        // Sets modal inner content with the brewery information 
        modalTextEls[index].lastElementChild.innerHTML = `
          <h3 class="modal-header">Here are the Breweries Near ${venueData.name} (From closest to farthest):</h3>
          <ul>${breweryList}</ul>
        `;
      })
      .catch((err) => console.log(err))
  }