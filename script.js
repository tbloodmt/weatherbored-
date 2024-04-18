// const apiKey = "c0fcb43b1294af601904ecfaa19b32c4"
const apiKey = 'df3fb9934a7d8ebae97c6749b588071a'
const searchInput = document.querySelector("#searchinput")
const searchButton = document.querySelector("#searchbtn")
const mainWeathercontainer = document.querySelector(".mainweather")
async function search(city){
try {
    const response=await fetch(`
    https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}
    `);
    const data=await response.json()
    console.log(data)
    const currentDate=new Date(data.dt * 1000).toLocaleDateString()
    const weatherIcon=data.weather[0].icon
    const weatherURL=`https://openweathermap.org/img/wn/${weatherIcon}.png`

    const mainCard=`
    <div>
    <img src="${weatherURL}"/>
    <h2>${data.name}</h2> 
    <span>${currentDate}</span>
    <p>temp: ${data.main.temp} </p>
    <P>humidity: ${data.main.humidity} </P>
    <p>windspeed: ${data.wind.speed}</p>
    </div>
    `
mainWeathercontainer.innerHTML=mainCard
const lat = data.coord.lat
const lon = data.coord.lon
fiveDayForcast(lat,lon)
} catch (error) {
  console.error(error)  
}
}
async function fiveDayForcast(lat,lon){
try {
  
} catch (error) {
  console.error(error)
}
}


searchButton.addEventListener("click",function(event){
event.preventDefault()
const city=searchInput.value
search(city)
})