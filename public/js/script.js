// document.getElementById("comments-button").addEventListener("click",function() {
//   console.log("comment button clicked")
// })

// document.getElementById("breweries-button").addEventListener("click",function() {
//   console.log("breweries button clicked")
// })

var searchEl = document.getElementById("search");
// var eventMainEL = document.querySelectorAll(".event-h2");

// var eventContainer = document.querySelectorAll(".event-container")
// renderCityInfo()
if (searchEl) {
  searchEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      let city = searchEl.value;
      let newPath = `/events/${city}`;
      document.location.href = newPath;
    }
  });
}

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
 


// // Function that builds the list of events and applies them to HTML elements

// // Uses the openbrewerydb API to fetch brewery information and display it in modal
function getBreweries(latitude, longitude, venueData) {
  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_dist=${latitude},${longitude}&per_page=5`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

// "See More Details" for event results.
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}