var searchButtonEl = document.querySelector("#citySearch");
var searchListEl = document.querySelector("#searchList")
var cityNameEl = document.querySelector("#cityName")
var newCitySearch;
var currentDate = new Date();

var updateSearchHistory = function (event) {
    event.preventDefault();

    //creating elements
    var newSearchHistory = document.createElement('div');
    var newSearchValueEl = document.createElement('p');
    newCitySearch = document.getElementById("searchForm").value;

    //classes
    newSearchHistory.setAttribute("class", "citySearches")
    newSearchValueEl.innerHTML = newCitySearch;
    cityNameEl.innerHTML = newCitySearch + "(" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + ")";



    //appends
    searchListEl.prepend(newSearchHistory);
    newSearchHistory.appendChild(newSearchValueEl);

    //getAPIData();
}


function getAPIData() {
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + newCitySearch + '&units=imperial' + '&appid=9221d865d32d6411009be013bcda09f9'
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.main.temp);
        });

    updateCityWeather();
}

function updateCityWeather() {

}


searchButtonEl.addEventListener("click", updateSearchHistory);