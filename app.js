
 const Url="https://api.weatherapi.com/v1/current.json?key=844774d741694d3581983113232712&q=pune"

const apikey= "844774d741694d3581983113232712"

 
const body = document.querySelector("body");
// let text;
let search = document.querySelector(".search-bar");
const btn = document.querySelector("button")
  
const enter=document.querySelector(".search-bar")
  





let weather =function (city){
    fetch(
      "https://api.weatherapi.com/v1/current.json?key=" + apikey + "&q=" + city
    )
      .then((res) => {
        try{
          return res.json();
        }
        catch(error){
          console.log(error)
        }
      })
      .then((data) => {
         try {
          savedisplayelement(data);
         } catch (error) {
           console.log(error);
         }
        
      })
      .catch((error) => {
        console.log("this", error);
      });
    
  }

const savedisplayelement=function(data){
  
      const name= data.location.name;
      const Humidity=data.current.humidity;
      const temp_c=data.current.temp_c;
      const icon=data.current.condition.icon;
      const desc=data.current.condition.text;
      const wind = data.current.wind_kph;
      const time=data.location.localtime;
      const imageback="https://source.unsplash.com/1600x900/?" + name;
   
      
      body.setAttribute("background",imageback);
      document.querySelector(".city").innerText="Weather in "+name;
      document.querySelector(".temp").innerText = temp_c;
      document.querySelector(".icon").src=icon;
   
      document.querySelector(".desc").innerText = desc;
      document.querySelector(".humidity").innerText ="Humidity:  "+Humidity+"%";
      document.querySelector(".wind").innerText = "Wind Speed:  "+wind+"Km/h";
      document.querySelector(".time").innerText = "Date And Time:  "+time;
        document.getElementById("hide").removeAttribute("hidden");
 
  }
 

btn.addEventListener("click", textfun(search.value));
enter.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    textfun(search.value);
  }
});

function textfun(text) {
  document.querySelector(".background").src =
    "https://source.unsplash.com/1600x900?nature";

  weather(text);
}
