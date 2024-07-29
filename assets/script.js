const APIkey='885d77fe7ad21b1b5e80c8e79b0ec9c7'

const input = document.getElementById('city')
const search = document.getElementById('search')
const city = document.getElementById('cityName')
const temp = document.getElementById('temp')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')

const history = [];


//Handler
const getCity = function (event) {
    event.preventDefault();
    const locationUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=&appid=${APIkey}&lang=en&units=imperial`
    input.value="";

//Gets city Coordinates
    fetch(locationUrl)
    .then (function (response){
        return response.json();
    })
    .then (function (data) {
        const longitude = data[0].lon;
        const latitude = data[0].lat;
        history.push(data[0].name)
        //Search history
        localStorage.setItem("history", JSON.stringify(history))
        //Gets Weather Info
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}&lang=en&units=imperial`
        fetch(url)
        .then (function (response){
            return response.json();
        })
        .then (function (data) {
            const location = data;
            
            const displayInfo = function () {
         
                function currentInfo (data) {
                    console.log(data, `\u00B0`)
                    const nameData = data.city.name;
                    const tempData =data.list[0].main.temp;
                    const windData = data.list[0].wind.speed;
                    const humidData =data.list[0].main.humidity;
                    const date = data.list[0].
            
                    console.log(nameData)
                    city.textContent=nameData;
                    temp.textContent=`${tempData}\u00B0F`;
                    wind.textContent=`${windData} MPH`;
                    humidity.textContent=`${humidData}%`;
                }
            
            
            
                function forecast (data) {
            
                }
            
                currentInfo(location);
            }

            displayInfo(location);
        })
    })
}


search.addEventListener('click',getCity);
