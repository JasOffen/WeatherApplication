var searchButtonEl = document.querySelector("#citySearch");
var searchListEl = document.querySelector("#searchList");
var cityNameEl = document.querySelector("#cityName");
var apiKey = "9221d865d32d6411009be013bcda09f9";
var currentDate = new Date();
var searchID = 0
var responseUrl;
var responseWeather;
var cityLat;
var cityLong;
var historyCount;
var newSearchValueEl;
var newSearchHistory;
var searchLimit;
var newCitySearch;
var requestfiveDayUrl;

var updateSearchHistory = function (event, isHistory) {
    if (isHistory === true) {
        cityNameEl.textContent = newCitySearch + "(" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + ")";
        getAPILatLongData();
    } else {
        event.preventDefault();

        //creating elements
        newSearchHistory = document.createElement('div');
        newSearchValueEl = document.createElement('button');
        newCitySearch = document.getElementById("searchForm").value;

        //classes
        newSearchHistory.setAttribute("class", "citySearches")
        //newSearchValueEl.setAttribute("type", "submit")
        newSearchValueEl.setAttribute("id", "1");
        newSearchValueEl.innerHTML = newCitySearch;
        cityNameEl.innerHTML = newCitySearch + "(" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + ")";



        //appends
        searchListEl.prepend(newSearchHistory);
        newSearchHistory.appendChild(newSearchValueEl);

        getAPILatLongData();

        var searchHistoryEl = document.querySelector(".citySearches");
        searchHistoryEl.addEventListener("click", searchFromHistory);

        document.getElementById("searchForm").value = "";
        limitHistory();
    }
}

function limitHistory() {
    newSearchValueEl.setAttribute("id", searchID);
    console.log(searchID)
    searchID++;

    searchLimit = searchID - 10;
    document.getElementById(searchLimit).setAttribute("style", "display:none;");


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
            fiveDayForecast();
        });
}

function fiveDayForecast() {
    requestfiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + newCitySearch + '&units=imperial&appid=' + apiKey;

    fetch(requestfiveDayUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 1; i <= 5; i++) {
                console.log(i);
                //creating elements
                var cardParent = document.getElementById('forecastCards');
                var newCardDiv = document.createElement('div');
                var newCardDate = document.createElement('p');
                var newCardIcon = document.createElement('img');
                var newCardTemp = document.createElement('p');
                var newCardWind = document.createElement('p');
                var newCardHumidity = document.createElement('p');

                //setting attributes
                newCardDiv.setAttribute('class', 'card');
                newCardDate.setAttribute('class', 'date');
                newCardIcon.setAttribute('class', 'icon');
                newCardTemp.setAttribute('class', 'temp');
                newCardWind.setAttribute('class', 'wind');
                newCardHumidity.setAttribute('class', 'humidity');

                //writing content
                newCardDate.textContent = "Date: ";
                newCardTemp.textContent = "Temp: " + data.list[i].main.temp_max + ' / ' + data.list[i].main.temp_min;
                newCardWind.textContent = "Wind: ";
                newCardHumidity.textContent = "Humidity: ";

                //append children to the DOM
                newCardDiv.appendChild(newCardDate);
                newCardDiv.appendChild(newCardIcon);
                newCardDiv.appendChild(newCardTemp);
                newCardDiv.appendChild(newCardWind);
                newCardDiv.appendChild(newCardHumidity);
                cardParent.append(newCardDiv);
            }
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