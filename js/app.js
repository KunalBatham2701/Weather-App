const apiKey="3f0a77881db6c6f0d5aa26633fda469c";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const imageapiUrl="https://api.teleport.org/api/urban_areas/slug:";
document.querySelector("body").style.backgroundColor="rgba(80, 234, 234, 0.654)";

const searcBox=document.querySelector(".search input");
const searcBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");
document.querySelector(".first").style.display="block";
async function checkweather(city){
    const response=await fetch(apiUrl+city+`&appid=${apiKey}`);
    var data =await response.json();
    document.querySelector(".first").style.display="none";
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+" °C";
        document.querySelector(".humidity").innerHTML=data.main.humidity+" %";
        document.querySelector(".wind").innerHTML=data.wind.speed+" Km/hr";

        if(data.weather[0].main==="Clouds")
            weatherIcon.src="image/clouds.png";
        else if(data.weather[0].main==="Rain")
            weatherIcon.src="image/rain.png";
        else if(data.weather[0].main==="Clear")
            weatherIcon.src="image/clear.png";
        else if(data.weather[0].main==="Drizzle")
            weatherIcon.src="image/drizzle.png";
        else if(data.weather[0].main==="Mist")
            weatherIcon.src="image/mist.png";

        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
        }
    city = city.split(" ").join("-");
    const responseimg=await fetch(imageapiUrl+city+"/images/");
    var imgdata= await responseimg.json();
    if(imgdata.status!=404){
        document.querySelector("body").style.backgroundImage="url("+imgdata.photos[0].image.web+")"
    }
    else{
        document.querySelector("body").style.backgroundImage="";
        document.querySelector("body").style.backgroundColor="rgba(40, 234, 234, 0.654)";
    }
}
searcBtn.addEventListener("click",()=>{
    checkweather(searcBox.value);
})
searcBox.addEventListener("keydown",(e)=>{
    if(e.key==="Enter")
        checkweather(searcBox.value);
})
