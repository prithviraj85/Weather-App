let search = document.querySelector("#search");
let input = document.querySelector("input");
let msg = document.querySelector("#error");
let sun = document.querySelector("#sun");
let temp = document.querySelector("#temp");
let cities = document.querySelector("#city");
let humidity  = document.querySelector("#humidity h1");
let wind = document.querySelector("#wind h1");
let boxa = document.querySelector("#boxa");
let container = document.querySelector(".container");






//weather api by city name = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



input.addEventListener("keydown",(e) =>{
   if (e.key === "Enter" ) {
     search.click();  
  }
})




search.addEventListener("click",function(){
  if (input.value === "" ) {
    msg.innerHTML = " enter a valid city name ";
    return;
}  
    else{
    msg.innerHTML = "";
    let city = input.value.trim() ;
    //  console.log(city);

getdata(city);

}
})


//weather data from api


async function getdata(city){
try{

let apikey = "0d9bb83b007034210f538fd5bd7cca49";
let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;


const response = await fetch(Url);
const data = await response.json();
// console.log(data);
//  console.log(data.main);



 if (data.cod !== 200) {
      msg.innerHTML = "Invalid city name";
      return;
    } 

//data update

cities.innerHTML = data.name.toUpperCase() ;
 let temperature = data.main.temp;
 temp.innerHTML = `${Math.round(temperature)} °C`;
//console.log(temp.innerHTML);
 humidity.innerHTML = `${data.main.humidity}%`;
//console.log(humidity.innerHTML);
 let speed = data.wind.speed;
 let windkm = Math.round(speed * 3.6);
 wind.innerHTML = `${windkm}km/hr`
//console.log(wind.innerHTML);




//weather image
 if (data.weather[0].main === "Clouds" ) {
  sun.src = "images/icons8-clear-sky-64.png";
 }



 else if (data.weather[0].main === "Rain") {
  if (data.weather[0].description.includes("light rain")) {
      sun.src = "images/icons8-light-rain-48.png";
  }else {
        sun.src = "images/icons8-heavy-rain-48.png";
}


} else if (data.weather[0].main === "Clear"&& data.weather[0].icon.includes("d")) {
sun.src = "images/icons8-sun-48.png";
} 
 else if (data.weather[0].main === "Clear"&& data.weather[0].icon.includes("n")) {
sun.src = "images/icons8-moon-50.png";
} 
    else if (data.weather[0].main === "Drizzle") {
  sun.src = "images/icons8-light-rain-48.png";
 }else if (data.weather[0].main === "Thunderstorm") {
   sun.src = "images/icons8-storm-with-heavy-rain-48.png";
 }else if (data.weather[0].main === "Snow") {
  sun.src = "images/icons8-snow-48.png";
 }else{
  sun.src = "images/icons8-haze-64.png";
 }

container.style.height = "550px";
 boxa.style.display = "block";

}
  
   catch (err){
msg.innerHTML = "network error";
 }

}







































