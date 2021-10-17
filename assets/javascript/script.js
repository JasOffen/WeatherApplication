var searchButtonEl = document.querySelector("#citySearch");
var searchListEl = document.querySelector("#searchList")
var cityNameEl = document.querySelector("#cityName")

var updateSearchHistory = function (event) {
    event.preventDefault();

    //creating elements
    var newSearchHistory = document.createElement('div');
    var newSearchValueEl = document.createElement('p');
    var newCitySearch = document.getElementById("searchForm").value;

    //classes
    newSearchHistory.setAttribute("class", "citySearches")
    newSearchValueEl.innerHTML = newCitySearch;
    cityNameEl.innerHTML = newCitySearch;



    //appends
    searchListEl.prepend(newSearchHistory);
    newSearchHistory.appendChild(newSearchValueEl);

}






function testt() {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=-32.2226&lon=-110.9747&appid=9221d865d32d6411009be013bcda09f9')
        .then(response => response.json())
        .then(data => console.log(data));
}

//testt();



searchButtonEl.addEventListener("click", updateSearchHistory);