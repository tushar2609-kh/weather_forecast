 let temp = document.getElementById("temp"),
    date = document.getElementById("date-time"),
    condition = document.getElementById("condition"),
    description = document.getElementById("description"),
    precipitation = document.getElementById("precipitation"),
    mainIcon = document.getElementById("icon"),
    currentLocation = document.getElementById("location"),
    uvIndex = document.querySelector(".uv-index"),
    uvText = document.querySelector(".uv-text"),
    feelslike = document.querySelector(".feelslike"),
    windSpeed = document.querySelector(".wind-speed"),
    windDirection = document.querySelector(".wind-direction"),
    sunRise = document.querySelector(".sun-rise"),
    sunSet = document.querySelector(".sun-set"),
    humidity = document.querySelector(".humidity"),
    visibilty = document.querySelector(".visibility"),
    humidityStatus = document.querySelector(".humidity-status"),
    visibilityStatus = document.querySelector(".visibilty-status"),
    searchForm = document.querySelector("#search"),
    search = document.querySelector("#query"),
    btn = document.querySelector("button"),
    celciusBtn = document.querySelector(".celcius"),
    fahrenheitBtn = document.querySelector(".fahrenheit"),
    tempUnit = document.querySelector(".temperatureUnit"),
    hourlyBtn = document.querySelector(".hourly"),
    weekBtn = document.querySelector(".week"),
    minTemp = document.querySelector(".min"),
    maxTemp = document.querySelector(".max"),
    cloudCover = document.querySelector(".cloudCover"),
    weatherCards = document.querySelector("#weather-cards");

let currentCity = "";
let currentUnit = "C";
let hourlyorWeekly = "week";
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let getDateTime = ()=>{
    let now = new Date();
    return `${days[now.getDay()]}, ${now.toLocaleTimeString()}`;
}

date.innerText = getDateTime();
setInterval(() => {
  date.innerText = getDateTime();
}, 1000);



// (async ()=>{
//     try {
//         let response = await fetch("https://geolocation-db.com/json/");
//         let data = await response.json();
//       console.log(data.city);
//         currentCity = data.city;

//         getWeatherData(currentCity, currentUnit, hourlyorWeek);
//     } catch (error) {
//         console.log(error);
//     }
//// })()hello

(()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      async (position)=>{
        let {latitude, longitude} = position.coords;
        let city = await getUserLocation(latitude,longitude);
        try {
          currentCity = city;

          getWeatherData(currentCity, currentUnit, hourlyorWeekly);
        }
         catch (error) {
          console.log(error.message);
        }
      },
      (error)=>{
        alert("Sorry, If you don't give us your location, then we can't give you Weather data of your location!!");
      }
    );
   }
})()

let getUserLocation = async (latitude, longitude)=>{
  const apiKey = "36b3b759622f4599ae29b81e21b29520",
  apiEndPoint = "https://api.opencagedata.com/geocode/v1/json?",
  apiUrl = `${apiEndPoint}key=${apiKey}&q=${latitude},${longitude}&pretty=1`;
      try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data.results[0].components.city;
      }
       catch (error) {
        console.log(error.message);
      }

}

btn.addEventListener("click", (e)=>{
  e.preventDefault();
  if(!isNaN(Number(search.value))){
    setTimeout(()=>alert("Some images can not found in our database if you search by Pin-code!"),1000);
  }
  getWeatherData(search.value, currentUnit, hourlyorWeekly)

  search.value = "";
});
btn.addEventListener("keypress", (e)=>{
  if(e.key() === "Enter"){
    btn.click();
  }
});


async function getWeatherData(city, unit, hourlyorWeekly) {
  const apiKey = "VVCLEC6YQPGRPE9WNFKBCHW6M";
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}`;

  let response = await fetch(apiUrl);
  let data = await response.json();

  try {
    let today = data.currentConditions;
    console.log(data);
    // console.log(today.icon);
    if (currentUnit === "C") {
      temp.innerText = `${today.temp}`;
      feelslike.innerText = `${today.feelslike}° ${unit}`;
      minTemp.innerText = `${data.days[0].tempmin}° ${unit}`;
      maxTemp.innerText = `${data.days[0].tempmax}° ${unit}`;
    }
    else {
      temp.innerText = `${(today.temp * (9 / 5) + 32).toFixed(1)}`;
      feelslike.innerText = `${convertCeltoFar(today.feelslike)}° ${unit}`;
      minTemp.innerText = `${convertCeltoFar(data.days[0].tempmin)}° ${unit}`;
      maxTemp.innerText = `${convertCeltoFar(data.days[0].tempmax)}° ${unit}`;
    }

    fahrenheitBtn.addEventListener("click", () => {
      celciusBtn.style.backgroundColor = "white";
      celciusBtn.style.color = "black";

      fahrenheitBtn.style.backgroundColor = "black";
      fahrenheitBtn.style.color = "white";
      currentUnit = "F";

      if (currentUnit === "C") {
        temp.innerText = `${today.temp}`;
        tempUnit.innerHTML = `° ${currentUnit}`;
        feelslike.innerText = `${today.feelslike}° ${currentUnit}`;
        minTemp.innerText = `${data.days[0].tempmin}° ${unit}`;
        maxTemp.innerText = `${data.days[0].tempmax}° ${unit}`;
      }
      else {
        temp.innerText = convertCeltoFar(today.temp);
        tempUnit.innerHTML = `° ${currentUnit}`;
        feelslike.innerText = `${convertCeltoFar(today.feelslike)}° ${currentUnit}`;
        minTemp.innerText = `${convertCeltoFar(data.days[0].tempmin)}° ${currentUnit}`;
        maxTemp.innerText = `${convertCeltoFar(data.days[0].tempmax)}° ${currentUnit}`;
      }
    });

    celciusBtn.addEventListener("click", () => {
      fahrenheitBtn.style.backgroundColor = "white";
      fahrenheitBtn.style.color = "black";

      celciusBtn.style.backgroundColor = "black";
      celciusBtn.style.color = "white";
      currentUnit = "C";

      if (currentUnit === "C") {
        temp.innerText = `${today.temp}`;
        tempUnit.innerHTML = `° ${currentUnit}`;
        feelslike.innerText = `${today.feelslike}° ${currentUnit}`;
        minTemp.innerText = `${data.days[0].tempmin}° ${currentUnit}`;
        maxTemp.innerText = `${data.days[0].tempmax}° ${currentUnit}`;
      }
      else {
        temp.innerText = convertCeltoFar(today.temp);
        tempUnit.innerHTML = `° ${currentUnit}`;
        feelslike.innerText = `${convertCeltoFar(today.feelslike)}° ${currentUnit}`;
        minTemp.innerText = `${convertCeltoFar(data.days[0].tempmin)}° ${currentUnit}`;
        maxTemp.innerText = `${convertCeltoFar(data.days[0].tempmax)}° ${currentUnit}`;
      }
    });

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
    mainIcon.src = getIcon(today.icon);

    currentLocation.innerText = data.resolvedAddress;

    condition.innerText = today.conditions;
    description.innerText = data.description;

    precipitation.innerText = `Perc - ${today.precipprob}%`;

    uvIndex.innerText = today.uvindex;
    measureUvIndex(today.uvindex);

    windSpeed.innerText = `${today.windspeed} km/h`;
    getWindDirection(today.winddir);
    cloudCover.innerText = `${today.cloudcover}%`;

    sunRise.innerText = today.sunrise.slice(0, 5);
    sunSet.innerText = today.sunset.slice(0, 5);

    humidity.innerText = `${today.humidity} %`;
    getHumidityStatus(today.humidity);

    visibilty.innerText = `${(today.visibility * 1.609).toFixed(1)} Km`;
    getVisibilityStatus(today.visibility);
    

    if(hourlyorWeekly === "hourly"){
      updateForecast(data.days[0].hours, unit, "day");
    }
    else{
      updateForecast(data.days, unit, "week");
    }

  }
  catch (error) {
    alert("City not found in our database");
  }
}

let getIcon = (data)=>{
      if (data === "partly-cloudy-day") {
        return "https://i.ibb.co/PZQXH8V/27.png";
      }
       else if (data === "partly-cloudy-night") {
        return "https://i.ibb.co/Kzkk59k/15.png";
      }
       else if (data === "rain") {
        return "https://i.ibb.co/kBd2NTS/39.png";
      }
       else if (data === "clear-day") {
        return "https://i.ibb.co/rb4rrJL/26.png";
      }
       else if (data === "clear-night") {
        return "https://i.ibb.co/1nxNGHL/10.png";
      }
       else {
        return "https://i.ibb.co/rb4rrJL/26.png";
      }
}

let measureUvIndex = (data)=>{
    if(data <= 2) {
    uvText.innerText = "Low";
  }
   else if (data <= 5) {
    uvText.innerText = "Moderate";
  }
   else if (data <= 7) {
    uvText.innerText = "High";
  } 
   else if (data <= 10) {
    uvText.innerText = "Very High";
  }
   else {
    uvText.innerText = "Extreme";
  }
}

let getWindDirection = (data)=>{
  if(data == 0){
    windDirection.innerText = `${data}° North`;
  }
  else if(data > 0 && data < 90){
    windDirection.innerText = `${data}° NorthEast`;
  }
  else if(data == 90){
    windDirection.innerText = `${data}° East`;
  }
  else if(data > 90 && data < 180){
    windDirection.innerText = `${data}° SouthEast`;
  }
  else if(data == 180){
    windDirection.innerText = `${data}° South`;
  }
  else if(data > 180 && data < 270){
    windDirection.innerText = `${data}° SouthWest`;
  }
  else if(data == 270){
    windDirection.innerText = `${data}° West`;
  }
  else if(data > 270 && data < 360){
    windDirection.innerText = `${data}° NorthWest`;
  }
}

let getHumidityStatus = (data)=>{
      if (humidity <= 30) {
        humidityStatus.innerText = "Low";
      }
       else if (humidity <= 60) {
        humidityStatus.innerText = "Moderate";
      }
       else {
        humidityStatus.innerText = "High";
      }
}

let getVisibilityStatus = (data)=>{
  if (data <= 0.03) {
    visibilityStatus.innerText = "Dense Fog";
  } else if (data <= 0.16) {
    visibilityStatus.innerText = "Moderate Fog";
  } else if (data <= 0.35) {
    visibilityStatus.innerText = "Light Fog";
  } else if (data <= 1.13) {
    visibilityStatus.innerText = "Very Light Fog";
  } else if (data <= 2.16) {
    visibilityStatus.innerText = "Light Mist";
  } else if (data <= 5.4) {
    visibilityStatus.innerText = "Very Light Mist";
  } else if (data <= 10.8) {
    visibilityStatus.innerText = "Clear Air";
  } else {
    visibilityStatus.innerText = "Very Clear Air";
  }
}

let convertCeltoFar = (data)=>{
  return (data * (9 / 5) + 32).toFixed(1);
}

// let updateForecast = (data, unit, type)=>{
//   weatherCards.innerHTML = "";

//   let day = 0;
//   let numCards;
//   let dayName;

//   if(type === "day"){
//     numCards = 24;
//   }
//   else{
//     numCards = 7;
//   }

//   //   for (let i = 0; i < numCards; i++) {
//   //     let card = document.createElement("div");
//   //           card.classList.add("card");
//   //       if (type === "week") {
//   //         let nameofDay = new Date();
//   //         let n = nameofDay.getDay();
//   //           if(n>6){
//   //             n = 0;
//   //           }
//   //          dayName = days[n];
//   //         }
//   //       else{
//   //          dayName = data[day.datetime].slice(0,5);
//   //       }
//   //     let iconSrc = getIcon(data[day].icon);
//   //     let dayTemp = data[day].temp;

//   //   card.innerHTML = `
//   //         <h2 class="day-name">${dayName}</h2>
//   //     <div class="card-icon">
//   //       <img src="${iconSrc}" class="day-icon" alt="" />
//   //     </div>
//   //     <div class="day-temp">
//   //       <h2 class="temp">${dayTemp}</h2>
//   //     </div>
//   //   `;

//   //   weatherCards.appendChild(card);
//   //   day++;
//   //     n++;
//   // }
// }

// function to get weather data
// function getWeatherData(city, unit, hourlyorWeek) {
//   fetch(
//     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
//     {
//       method: "GET",
//       headers: {},
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       let today = data.currentConditions;
//       if (unit === "c") {
//         temp.innerText = today.temp;
//       } else {
//         temp.innerText = celciusToFahrenheit(today.temp);
//       }

//       console.log(data);
//       currentLocation.innerText = data.resolvedAddress;
//       condition.innerText = today.conditions;
//       rain.innerText = "Perc - " + today.precip + "%";
//       uvIndex.innerText = today.uvindex;
//       windSpeed.innerText = today.windspeed;
//       measureUvIndex(today.uvindex);
//       mainIcon.src = getIcon(today.icon);
//       changeBackground(today.icon);
//       humidity.innerText = today.humidity + "%";
//       updateHumidityStatus(today.humidity);
//       visibilty.innerText = today.visibility;
//       updateVisibiltyStatus(today.visibility);
//       airQuality.innerText = today.winddir;
//       updateAirQualityStatus(today.winddir);
//       if (hourlyorWeek === "hourly") {
//         updateForecast(data.days[0].hours, unit, "day");
//       } else {
//         updateForecast(data.days, unit, "week");
//       }
//       sunRise.innerText = covertTimeTo12HourFormat(today.sunrise);
//       sunSet.innerText = covertTimeTo12HourFormat(today.sunset);
//     })
//     .catch((err) => {
//       alert("City not found in our database");
//     });
// }

// //function to update Forecast
function updateForecast(data, unit, type) {
  weatherCards.innerHTML = "";
  let day = 0;
  let numCards = 0;
  if (type === "day") {
    numCards = 24;
  } else {
    numCards = 7;
  }
  for (let i = 0; i < numCards; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    let dayName = getHour(data[day].datetime);
    if (type === "week") {
      dayName = getDayName(data[day].datetime);
    }
    let dayTemp = data[day].temp;
    if (unit === "F") {
      dayTemp = celciusToFahrenheit(data[day].temp);
    }
    let iconCondition = data[day].icon;
    let iconSrc = getIcon(iconCondition);
    let tempUnit = "°C";
    if (unit === "F") {
      tempUnit = "°F";
    }
    card.innerHTML = `
                <h2 class="day-name">${dayName}</h2>
            <div class="card-icon">
              <img src="${iconSrc}" class="day-icon" alt="" />
            </div>
            <div class="day-temp">
              <h2 class="temp">${dayTemp}</h2>
              <span class="temp-unit">${tempUnit}</span>
            </div>
  `;
    weatherCards.appendChild(card);
    day++;
  }
}

// // function to change weather icons
// function getIcon(condition) {
//   if (condition === "partly-cloudy-day") {
//     return "https://i.ibb.co/PZQXH8V/27.png";
//   } else if (condition === "partly-cloudy-night") {
//     return "https://i.ibb.co/Kzkk59k/15.png";
//   } else if (condition === "rain") {
//     return "https://i.ibb.co/kBd2NTS/39.png";
//   } else if (condition === "clear-day") {
//     return "https://i.ibb.co/rb4rrJL/26.png";
//   } else if (condition === "clear-night") {
//     return "https://i.ibb.co/1nxNGHL/10.png";
//   } else {
//     return "https://i.ibb.co/rb4rrJL/26.png";
//   }
// }

// // function to change background depending on weather conditions
// function changeBackground(condition) {
//   const body = document.querySelector("body");
//   let bg = "";
//   if (condition === "partly-cloudy-day") {
//     bg = "https://i.ibb.co/qNv7NxZ/pc.webp";
//   } else if (condition === "partly-cloudy-night") {
//     bg = "https://i.ibb.co/RDfPqXz/pcn.jpg";
//   } else if (condition === "rain") {
//     bg = "https://i.ibb.co/h2p6Yhd/rain.webp";
//   } else if (condition === "clear-day") {
//     bg = "https://i.ibb.co/WGry01m/cd.jpg";
//   } else if (condition === "clear-night") {
//     bg = "https://i.ibb.co/kqtZ1Gx/cn.jpg";
//   } else {
//     bg = "https://i.ibb.co/qNv7NxZ/pc.webp";
//   }
//   body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${bg})`;
// }

// //get hours from hh:mm:ss
function getHour(time) {
  let hour = time.split(":")[0];
  let min = time.split(":")[1];
  if (hour > 12) {
    hour = hour - 12;
    return `${hour}:${min} PM`;
  } else {
    return `${hour}:${min} AM`;
  }
}

// // convert time to 12 hour format
// function covertTimeTo12HourFormat(time) {
//   let hour = time.split(":")[0];
//   let minute = time.split(":")[1];
//   let ampm = hour >= 12 ? "pm" : "am";
//   hour = hour % 12;
//   hour = hour ? hour : 12; // the hour '0' should be '12'
//   hour = hour < 10 ? "0" + hour : hour;
//   minute = minute < 10 ? "0" + minute : minute;
//   let strTime = hour + ":" + minute + " " + ampm;
//   return strTime;
// }

// // function to get day name from date
function getDayName(date) {
  let day = new Date(date);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day.getDay()];
}

// // function to get uv index status


// // function to get humidity status
// function updateHumidityStatus(humidity) {
//   if (humidity <= 30) {
//     humidityStatus.innerText = "Low";
//   } else if (humidity <= 60) {
//     humidityStatus.innerText = "Moderate";
//   } else {
//     humidityStatus.innerText = "High";
//   }
// }

// // function to get visibility status
// function updateVisibiltyStatus(visibility) {
//   if (visibility <= 0.03) {
//     visibilityStatus.innerText = "Dense Fog";
//   } else if (visibility <= 0.16) {
//     visibilityStatus.innerText = "Moderate Fog";
//   } else if (visibility <= 0.35) {
//     visibilityStatus.innerText = "Light Fog";
//   } else if (visibility <= 1.13) {
//     visibilityStatus.innerText = "Very Light Fog";
//   } else if (visibility <= 2.16) {
//     visibilityStatus.innerText = "Light Mist";
//   } else if (visibility <= 5.4) {
//     visibilityStatus.innerText = "Very Light Mist";
//   } else if (visibility <= 10.8) {
//     visibilityStatus.innerText = "Clear Air";
//   } else {
//     visibilityStatus.innerText = "Very Clear Air";
//   }
// }

// // function to get air quality status
// function updateAirQualityStatus(airquality) {
//   if (airquality <= 50) {
//     airQualityStatus.innerText = "Good👌";
//   } else if (airquality <= 100) {
//     airQualityStatus.innerText = "Moderate😐";
//   } else if (airquality <= 150) {
//     airQualityStatus.innerText = "Unhealthy for Sensitive Groups😷";
//   } else if (airquality <= 200) {
//     airQualityStatus.innerText = "Unhealthy😷";
//   } else if (airquality <= 250) {
//     airQualityStatus.innerText = "Very Unhealthy😨";
//   } else {
//     airQualityStatus.innerText = "Hazardous😱";
//   }
// }

// // function to handle search form
// searchForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let location = search.value;
//   if (location) {
//     currentCity = location;
//     getWeatherData(location, currentUnit, hourlyorWeek);
//   }
// });

// // function to conver celcius to fahrenheit
// function celciusToFahrenheit(temp) {
//   return ((temp * 9) / 5 + 32).toFixed(1);
// }


// var currentFocus;
// search.addEventListener("input", function (e) {
//   removeSuggestions();
//   var a,
//     b,
//     i,
//     val = this.value;
//   if (!val) {
//     return false;
//   }
//   currentFocus = -1;

//   a = document.createElement("ul");
//   a.setAttribute("id", "suggestions");

//   this.parentNode.appendChild(a);

//   for (i = 0; i < cities.length; i++) {
//     /*check if the item starts with the same letters as the text field value:*/
//     if (
//       cities[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()
//     ) {
//       /*create a li element for each matching element:*/
//       b = document.createElement("li");
//       /*make the matching letters bold:*/
//       b.innerHTML =
//         "<strong>" + cities[i].name.substr(0, val.length) + "</strong>";
//       b.innerHTML += cities[i].name.substr(val.length);
//       /*insert a input field that will hold the current array item's value:*/
//       b.innerHTML += "<input type='hidden' value='" + cities[i].name + "'>";
//       /*execute a function when someone clicks on the item value (DIV element):*/
//       b.addEventListener("click", function (e) {
//         /*insert the value for the autocomplete text field:*/
//         search.value = this.getElementsByTagName("input")[0].value;
//         removeSuggestions();
//       });

//       a.appendChild(b);
//     }
//   }
// });
// /*execute a function presses a key on the keyboard:*/
// search.addEventListener("keydown", function (e) {
//   var x = document.getElementById("suggestions");
//   if (x) x = x.getElementsByTagName("li");
//   if (e.keyCode == 40) {
//     /*If the arrow DOWN key
//       is pressed,
//       increase the currentFocus variable:*/
//     currentFocus++;
//     /*and and make the current item more visible:*/
//     addActive(x);
//   } else if (e.keyCode == 38) {
//     /*If the arrow UP key
//       is pressed,
//       decrease the currentFocus variable:*/
//     currentFocus--;
//     /*and and make the current item more visible:*/
//     addActive(x);
//   }
//   if (e.keyCode == 13) {
//     /*If the ENTER key is pressed, prevent the form from being submitted,*/
//     e.preventDefault();
//     if (currentFocus > -1) {
//       /*and simulate a click on the "active" item:*/
//       if (x) x[currentFocus].click();
//     }
//   }
// });
// function addActive(x) {
//   /*a function to classify an item as "active":*/
//   if (!x) return false;
//   /*start by removing the "active" class on all items:*/
//   removeActive(x);
//   if (currentFocus >= x.length) currentFocus = 0;
//   if (currentFocus < 0) currentFocus = x.length - 1;
//   /*add class "autocomplete-active":*/
//   x[currentFocus].classList.add("active");
// }
// function removeActive(x) {
//   /*a function to remove the "active" class from all autocomplete items:*/
//   for (var i = 0; i < x.length; i++) {
//     x[i].classList.remove("active");
//   }
// }

// function removeSuggestions() {
//   var x = document.getElementById("suggestions");
//   if (x) x.parentNode.removeChild(x);
// }

// fahrenheitBtn.addEventListener("click", () => {
//   changeUnit("f");
// });
// celciusBtn.addEventListener("click", () => {
//   changeUnit("c");
// });

// // function to change unit
function changeUnit(unit) {
  if (currentUnit !== unit) {
    currentUnit = unit;
    tempUnit.forEach((elem) => {
      elem.innerText = `°${unit.toUpperCase()}`;
    });
    if (unit === "C") {
      celciusBtn.classList.add("active");
      fahrenheitBtn.classList.remove("active");
    } else {
      celciusBtn.classList.remove("active");
      fahrenheitBtn.classList.add("active");
    }
    getWeatherData(currentCity, currentUnit, hourlyorWeekly);
  }
}

hourlyBtn.addEventListener("click", () => {
  changeTimeSpan("hourly");
});
weekBtn.addEventListener("click", () => {
  changeTimeSpan("week");
});

// function to change hourly to weekly or vice versa
function changeTimeSpan(unit) {
  if (hourlyorWeekly !== unit) {
    hourlyorWeekly = unit;
    if (unit === "hourly") {
      hourlyBtn.classList.add("active");
      weekBtn.classList.remove("active");
    } else {
      hourlyBtn.classList.remove("active");
      weekBtn.classList.add("active");
    }
    getWeatherData(currentCity, currentUnit, hourlyorWeekly);
  }
}


let tl = gsap.timeline();

tl.from(".wrapper", {
    scale: 0,
    opacity: 0,
    ease: Power4,
    delay: 1,
    duration: 2
  });

tl.from(".sidebar", {
  x: "-100%",
  opacity: 0,
  duration: 1,
  ease: Power4
});

tl.from(".main", {
  x: "100%",
  opacity: 0,
  duration: 1,
  ease: Power4
});

tl.from("")
