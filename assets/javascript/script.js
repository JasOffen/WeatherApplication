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
var generateForecastCards = 0;

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
                console.log(data);
                //creating elements

                if (generateForecastCards == 0) {
                    var cardParent = document.getElementById('forecastCards');
                    var newCardDiv = document.createElement('div');
                    var newCardDate = document.createElement('p');
                    var newCardIcon = document.createElement('img');
                    var newCardTemp = document.createElement('p');
                    var newCardWind = document.createElement('p');
                    var newCardHumidity = document.createElement('p');
                    //setting attributes for cards to be generated
                    newCardDiv.setAttribute('class', 'card');
                    newCardDiv.setAttribute('id', 'card ' + i);
                } else {
                    var newCardDate = document.getElementById('date ' + i);
                    var newCardIcon = document.getElementById('icon ' + i);
                    var newCardTemp = document.getElementById('temp ' + i);
                    var newCardWind = document.getElementById('wind ' + i);
                    var newCardHumidity = document.getElementById('humidity ' + i);
                    console.log("test")
                }

                //setting attributes

                newCardDate.setAttribute('class', 'date');
                newCardDate.setAttribute('id', 'date ' + i);


                newCardIcon.setAttribute('class', 'icon');
                newCardIcon.setAttribute('id', 'icon ' + i);

                newCardTemp.setAttribute('class', 'temp');
                newCardTemp.setAttribute('id', 'temp ' + i);

                newCardWind.setAttribute('class', 'wind');
                newCardWind.setAttribute('id', 'wind ' + i);

                newCardHumidity.setAttribute('class', 'humidity');
                newCardHumidity.setAttribute('id', 'humidity ' + i);

                //writing content
                newCardDate.textContent = "Date: " + data.list[i].dt_txt;
                newCardIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + "@2x.png");
                newCardTemp.textContent = "Temp: " + data.list[i].main.temp_max + ' / ' + data.list[i].main.temp_min;
                newCardWind.textContent = "Wind: " + data.list[i].wind.speed + " mph";
                newCardHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";

                if (generateForecastCards == 0) {
                    //append children to the DOM
                    newCardDiv.appendChild(newCardDate);
                    newCardDiv.appendChild(newCardIcon);
                    newCardDiv.appendChild(newCardTemp);
                    newCardDiv.appendChild(newCardWind);
                    newCardDiv.appendChild(newCardHumidity);
                    cardParent.append(newCardDiv);
                }
                //remove children
            }
            generateForecastCards = 1;
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