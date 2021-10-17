function testt() {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=-32.2226&lon=-110.9747&appid=9221d865d32d6411009be013bcda09f9')
        .then(response => response.json())
        .then(data => console.log(data));
}

//testt();