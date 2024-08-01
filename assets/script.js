
const APIkey='885d77fe7ad21b1b5e80c8e79b0ec9c7'

const input = document.getElementById('city')
const city = document.getElementById('cityName')
const temp = document.getElementById('temp')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')
const recentsdiv = document.getElementById('recents')


const history=[];

if (JSON.parse(localStorage.getItem('history'))){
    const stored = JSON.parse(localStorage.getItem('history'))

    for (i=0; i<stored.length; i++) {
        history.push(stored[i])
    }
}
console.log(history);

let imgurl
const imgPick = function (condition) {
    if (condition==='Snow'){
        imgurl = 'frosty'
    } else if (condition===('Rain' || 'Drizzle')){
        imgurl = 'rainy'
    } else if (condition==='Thunderstorm'){
        imgurl = 'stormy'
    } else if (condition==='Clear'){
        imgurl = 'sunny'
    } else if (condition==='Clouds'){
        imgurl = 'cloudy'
    } else if (condition==='Atmosphere'){
        imgurl = 'atmosphere'
    }
    return imgurl
}

const recent = function () {
    recentsdiv.innerHTML=""
    for (i=0;i<history.length;i++){
        const last = document.createElement('button')
        recentsdiv.prepend(last)
       last.textContent=history[i]
       console.log(history[i]);
       last.setAttribute('class','recentbutton') 
       last.addEventListener('click',historyButton)}
}
recent();
const loadURL=`http://api.openweathermap.org/geo/1.0/direct?q=${history[0]}&limit=&appid=${APIkey}&lang=en&units=imperial`

function getData (url) {
//Gets latitude and longitude data of input    
    fetch(url)
    .then (function (response){
        return response.json();
    })
    .then (function (data) {
        const longitude = data[0].lon;
        const latitude = data[0].lat;

        history.push(data[0].name)
        localStorage.setItem('history',JSON.stringify(history));
    

// Uses lat and long to get weather data
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}&lang=en&units=imperial`
        fetch(url)
        .then (function (response){
            return response.json();
        })
        .then (function (data) {
//Displays todays weather         
    function currentInfo (data) {
        
        const nameData = data.city.name;
        const tempData =data.list[0].main.temp;
        const windData = data.list[0].wind.speed;
        const humidData =data.list[0].main.humidity;
        const datetxt = JSON.stringify(data.list[0].dt_txt);
        const weather = data.list[0].weather[0].main;

        const today = datetxt.slice(1,11)
        const year = today.slice(0,4)
        const month = today.slice(5,7)
        const day = parseInt(today.slice(8,10))

        imgPick(weather);

        city.innerHTML=`<img src='./assets/images/${imgurl}.png'> ${nameData} (${month}/${day}/${year})`;
        temp.textContent=`Temperature: ${tempData}\u00B0F`;
        wind.textContent=`Wind Speed: ${windData} MPH`;
        humidity.textContent=`Humidity : ${humidData}%`;
    }
        currentInfo(data);    
          
//Display Forecast Data
function displayFivecast (data) {
                    
        const carddate1 = JSON.stringify(data.list[4].dt_txt)
        let today = carddate1.slice(1,11)
        let year = today.slice(0,4)
        let month = today.slice(5,7)
        let day = today.slice(8,10)
        document.getElementById('card1date').textContent=`${month}/${day}/${year}`;
        const cardtemp1 = data.list[4].main.temp; document.getElementById('card1temp').textContent=`Temperature: ${cardtemp1}\u00B0F`;
        const cardhum1 = data.list[4].main.humidity; document.getElementById('card1hum').textContent=`Humidity : ${cardhum1}%`;
        const cardwind1 = data.list[4].wind.speed; document.getElementById('card1wind').textContent=`Wind Speed: ${cardwind1} MPH`;
        const cardimg1 = data.list[4].weather[0].main;
        imgPick(cardimg1); document.getElementById('card1img').setAttribute('src',`./assets/images/${imgurl}.png`);
                    
                    
        const carddate2 = JSON.stringify(data.list[12].dt_txt)
        today = carddate2.slice(1,11)
        year = today.slice(0,4)
        month = today.slice(5,7)
        day = today.slice(8,10)
        document.getElementById('card2date').textContent=`${month}/${day}/${year}`;
        const cardtemp2 = data.list[12].main.temp; document.getElementById('card2temp').textContent=`Temperature: ${cardtemp2}\u00B0F`;
        const cardhum2= data.list[12].main.humidity; document.getElementById('card2hum').textContent=`Humidity : ${cardhum2}%`;
        const cardwind2 = data.list[12].wind.speed; document.getElementById('card2wind').textContent=`Wind Speed: ${cardwind2} MPH`;
        const cardimg2 = data.list[12].weather[0].main; 
        imgPick(cardimg2); document.getElementById('card2img').setAttribute('src',`./assets/images/${imgurl}.png`);
                    
        const carddate3 = JSON.stringify(data.list[20].dt_txt)
        today = carddate3.slice(1,11)
        year = today.slice(0,4)
        month = today.slice(5,7)
        day = today.slice(8,10)
        document.getElementById('card3date').textContent=`${month}/${day}/${year}`;
        const cardtemp3 = data.list[20].main.temp; document.getElementById('card3temp').textContent=`Temperature: ${cardtemp3}\u00B0F`;
        const cardhum3= data.list[20].main.humidity; document.getElementById('card3hum').textContent=`Humidity : ${cardhum3}%`;
        const cardwind3 = data.list[20].wind.speed; document.getElementById('card3wind').textContent=`Wind Speed: ${cardwind3} MPH`;
        const cardimg3 = data.list[20].weather[0].main; 
        imgPick(cardimg3); document.getElementById('card3img').setAttribute('src',`./assets/images/${imgurl}.png`);

        const carddate4 = JSON.stringify(data.list[28].dt_txt)
        today = carddate4.slice(1,11)
        year = today.slice(0,4)
        month = today.slice(5,7)
        day = today.slice(8,10)
        document.getElementById('card4date').textContent=`${month}/${day}/${year}`;
        const cardtemp4 = data.list[28].main.temp; document.getElementById('card4temp').textContent=`Temperature: ${cardtemp4}\u00B0F`;
        const cardhum4 = data.list[28].main.humidity; document.getElementById('card4hum').textContent=`Humidity : ${cardhum4}%`;
        const cardwind4 = data.list[28].wind.speed; document.getElementById('card4wind').textContent=`Wind Speed: ${cardwind4} MPH`;
        const cardimg4 = data.list[28].weather[0].main;
        imgPick(cardimg4); document.getElementById('card4img').setAttribute('src',`./assets/images/${imgurl}.png`);

        const carddate5 = JSON.stringify(data.list[36].dt_txt)
        today = carddate5.slice(1,11)
        year = today.slice(0,4)
        month = today.slice(5,7)
        day = today.slice(8,10)
        document.getElementById('card5date').textContent=`${month}/${day}/${year}`;
        const cardtemp5 = data.list[36].main.temp; document.getElementById('card5temp').textContent=`Temperature: ${cardtemp5}\u00B0F`;
        const cardhum5 = data.list[36].main.humidity; document.getElementById('card5hum').textContent=`Humidity : ${cardhum5}%`;
        const cardwind5 = data.list[36].wind.speed; document.getElementById('card5wind').textContent=`Wind Speed: ${cardwind5} MPH`;
        const cardimg5= data.list[36].weather[0].main;
        imgPick(cardimg5); document.getElementById('card5img').setAttribute('src',`./assets/images/${imgurl}.png`);
    }
    displayFivecast(data);
    })
    recent();   
    })

}               
 
             
         
//Handler
const getCity = function (event) {
    event.preventDefault();
    const locationUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=&appid=${APIkey}&lang=en&units=imperial`
    getData(locationUrl);
    
}

function historyButton (event){
    const cityName = event.target.textContent
    console.log(cityName);
    const recentUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=&appid=${APIkey}&lang=en&units=imperial`
    getData(recentUrl);
    
}

document.querySelector('form').addEventListener('submit',getCity);
