function formatDate(timestamp) {
    let now = new Date(timestamp);
    let dayss= ["sunday","Monday","Tuesday","Wednesday","Thursday", "Friday","saturday"];
    let hour = now.getHours();
    if (hour <10) {
       hour = `0${hour}` 
    }
    let minute = now.getMinutes();
    if (minute <10) {
        minute = `0${minute}` 
     }
    return`${dayss[now.getDay()]} ${hour}:${minute}`;
    }
   function formatDay(timestamp){
   let date = new Date(timestamp * 1000);
   let day = date.getDay();
   let days =["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];
   return days[day];
  }

function displayForecast(response){
   let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
 
  forecast.forEach(function(forecastday, index){
     if (index<6) {
        
     
     forecastHTML = forecastHTML +` <div class="col-2 text-center">
   
       <div class="weather-forecast-date">${formatDay(forecastday.dt)}</div>
       <img
       src="http://openweathermap.org/img/wn/${
         forecastday.weather[0].icon
       }@2x.png"
       alt=""
     />
     <div class="weather-forecast-temperatures">
       <span class="weather-forecast-temperature-max"> ${Math.round(forecastday.temp.max)}° </span>
       <span class="weather-forecast-temperature-min"> ${Math.round(forecastday.temp.min)}°</span>
       </div>
      
     </div>

     `;
      }
  });
  forecastHTML= forecastHTML+ `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
  }

function getForecast(coordinates) {
 
   let apikey = "ed814a7ae4765c535b06c11b05d51754"
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}














    
    function showthisweather(response){
    
       let circle = document.querySelector(".circle");
       celsiusTemperature = response.data.main.temp;
       circle.innerHTML=Math.round(celsiusTemperature);
       document.querySelector(".namecity").innerHTML = response.data.name;
       document.querySelector("#humidity").innerHTML =response.data.main.humidity;
       document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
       document.querySelector("#description").innerHTML = response.data.weather[0].main;
       document.querySelector("#mydate").innerHTML = formatDate(response.data.dt * 1000);
       document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
       document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
      

      getForecast(response.data.coord);
    }
    
    
    
    function search(apicity){
       let apikey = "ed814a7ae4765c535b06c11b05d51754";
       let apiurl= `https://api.openweathermap.org/data/2.5/weather?q=${apicity}&appid=${apikey}&units=metric`;
       axios.get(apiurl).then(showthisweather);
    }
    
    
    function showcity(event) {
    event.preventDefault();
    let apicity= document.querySelector(".searchbox");
    search(apicity.value)
    
    }
   //  function convertToF(event) {
   //      event.preventDefault();
   //      celsius.classList.remove("active");
   //      faren.classList.add("active");
   //      let farenntemp = document.querySelector(".circle");
   //      let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
   //      farenntemp.innerHTML = Math.round(fahrenheiTemperature);
        
   //  }
   //  function convertc(event){
   //        event.preventDefault();
   //        celsius.classList.add("active");
   //        faren.classList.remove("active");
   //        let celsiustemp = document.querySelector(".circle");
   //        celsiustemp.innerHTML = Math.round(celsiusTemperature);
   //  }
    
   //  let celsiusTemperature = null;
    
    
    let searchjs = document.querySelector("#searching");
    searchjs.addEventListener("submit", showcity);
    
   //  let faren =document.querySelector("#faren");
   //  faren.addEventListener("click",convertToF);
    
   //  let celsius =document.querySelector("#celsius"); 
   //  celsius.addEventListener("click",convertc);
    
    search("tehran");
   