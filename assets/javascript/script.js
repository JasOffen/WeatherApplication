var searchButtonEl = document.querySelector("#citySearch");
var searchListEl = document.querySelector("#searchList")
var cityNameEl = document.querySelector("#cityName")
var newCitySearch;
var currentDate = new Date();
var apiKey = "9221d865d32d6411009be013bcda09f9";
var responseUrl;
var responseWeather;
var cityLat;
var cityLong;

var updateSearchHistory = function (event, isHistory) {
    if (isHistory === true) {
        cityNameEl.textContent = newCitySearch + "(" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + ")";
        getAPILatLongData();
    } else {
        event.preventDefault();

        //creating elements
        var newSearchHistory = document.createElement('div');
        var newSearchValueEl = document.createElement('button');
        newCitySearch = document.getElementById("searchForm").value;

        //classes
        newSearchHistory.setAttribute("class", "citySearches")
        //newSearchValueEl.setAttribute("type", "submit")
        newSearchValueEl.innerHTML = newCitySearch;
        cityNameEl.innerHTML = newCitySearch + "(" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + ")";



        //appends
        searchListEl.prepend(newSearchHistory);
        newSearchHistory.appendChild(newSearchValueEl);

        getAPILatLongData();

        var searchHistoryEl = document.querySelector(".citySearches");
        searchHistoryEl.addEventListener("click", searchFromHistory);

        document.getElementById("searchForm").value = "";
    }
}

function getAPILatLongData() {
    requestUrlLatLong = 'https://api.openweathermap.org/data/2.5/weather?q=' + newCitySearch + '&units=imperial' + '&appid=' + apiKey;

    fetch(requestUrlLatLong)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityLat = data.coord.lat;
            cityLong = data.coord.lon;
            responseURL = data;
        })
        .then(function (test) {
            getAPIWeather();
        });

}

function getAPIWeather() {
    requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLong + '&appid=' + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            responseWeather = data;
            updateCityWeather();
        });
}

function updateCityWeather() {
    var cityStatsTemp = document.querySelector("#temp");
    var cityStatsWind = document.querySelector("#wind");
    var cityStatsHumidity = document.querySelector("#humidity");
    var cityStatsUV = document.querySelector("#uv");


    cityStatsTemp.textContent = "Temp: " + responseURL.main.temp + "°F";
    cityStatsWind.textContent = "Wind: " + responseURL.wind.speed + " MPH";
    cityStatsHumidity.textContent = "Humidity: " + responseURL.main.humidity + "%";
    cityStatsUV.textContent = "UV Index: " + responseWeather.current.uvi;

}
function searchFromHistory(event) {
    newCitySearch = event.target.textContent;
    updateSearchHistory(event.target.textContent, true);

}


searchButtonEl.addEventListener("click", updateSearchHistory);