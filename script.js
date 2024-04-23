// const apiKey = "c0fcb43b1294af601904ecfaa19b32c4"
const apiKey = 'df3fb9934a7d8ebae97c6749b588071a'
const searchInput = document.querySelector("#searchinput")
const searchButton = document.querySelector("#searchbtn")
const mainWeathercontainer = document.querySelector(".mainweather")
const fiveDayContainer = document.querySelector(".fivedaycontainer")
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
    <div class="main-weather">
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
  const weeklyresponse=await fetch(`
  https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}
  `)
  const weekdata=await weeklyresponse.json()
  
  const weekArray=weekdata.list.filter(hour=>hour.dt_txt.includes("12:00:00"))
  console.log(weekArray)
  let weekCard=""
  weekArray.forEach(day=>{
    const weekDate=new Date(day.dt_txt).toLocaleDateString().split(",")[0]
    console.log(weekDate)
    weekCard+=`
    <div class="card">
    <p>${weekDate}</p>
    <P>temp: ${day.main.temp}</P>
    <p>humidity: ${day.main.humidity}</p>
    <p>windspeed: ${day.wind.speed}</p>
    </div>
    `
    fiveDayContainer.innerHTML=weekCard
  })
} catch (error) {
  console.error(error)
}


}

const saveSearches=()=>{
const history = JSON.parse(localStorage.getItem("history")) || []
let previousCity = searchInput.value
history.push(previousCity)
localStorage.setItem("history",JSON.stringify(history))

}

searchButton.addEventListener("click",function(event){
event.preventDefault()
const city=searchInput.value
saveSearches()
search(city)
})