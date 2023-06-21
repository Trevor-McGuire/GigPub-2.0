
var searchEl = document.getElementById("search");

if (searchEl) {
  searchEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      let city = searchEl.value;
      let newPath = `/events/${city}`;
      document.location.href = newPath;
    }
  });
}

function getBreweries(latitude, longitude, venueData) {
  fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_dist=${latitude},${longitude}&per_page=5`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

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