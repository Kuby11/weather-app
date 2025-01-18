import { fetchData } from "./fetchData";
import { changeBackground } from './renderBackground';
import errorComponent from './renderErrorComponent';

const searchForm = document.querySelector(".search-form") as HTMLFormElement;
const cityElement = document.querySelector('.city') as HTMLElement;
const weatherCardInfo = document.querySelectorAll(".weather-info__card h3");
const weatherTemp = document.querySelector(".weather__temp") as HTMLElement;
const weatherStatus = document.querySelector(".weather__status") as HTMLElement;
const weatherImage = document.querySelector(".icon__weather img") as HTMLImageElement;

export type Tdata = {
  name: string;
  main: {
    humidity: number;
    temp: number;
    pressure: number;
  };
  weather: [{
    description: string;
    id: number;
    icon: string;
  }];
  wind: {
    speed: number;
  };
}

function displayInfo(data: Tdata): void {
  const {
    name: city,
    main: { humidity, temp, pressure },
    weather: [{ description, id, icon }],
    wind: { speed }
  } = data;

  cityElement.textContent = `${city}`;
  weatherTemp.innerHTML = `<h2>${(temp - 273.15).toFixed(1)}°C</h2>`;
  weatherCardInfo[0].textContent = `${speed}km\h`;
  weatherCardInfo[1].textContent = `${humidity}%`;
  weatherCardInfo[2].textContent = `${pressure} hPa`;
  weatherStatus.innerHTML = `<h3>${description}</h3>`;
  (document.querySelector(".app") as HTMLElement).classList.remove("visually-hidden");

  const imageSrc: string = `/${import.meta.env.VITE_APP_NAME}/assets/images/`

  switch(true){
    case (id >= 200 && id < 300):
    weatherImage.src = `${imageSrc}storm.png`;
    changeBackground(data)
    break
    case (id >= 300 && id < 400):
      weatherImage.src = `${imageSrc}drizzle.png`;
      changeBackground(data)
    break
    case (id >= 500 && id < 600):
      weatherImage.src = `${imageSrc}heavy-rain.png`;
      changeBackground(data)
    break
    case (id >= 600 && id < 700):
      weatherImage.src = `${imageSrc}snow.png`;
      changeBackground(data)
    break
    case (id >= 700 && id < 800):
      weatherImage.src = `${imageSrc}foggy.png`;
      changeBackground(data)
    break
    case (id === 800):
      if(icon === "01d"){
        weatherImage.src = `${imageSrc}sunny.png`;
      }else{
        weatherImage.src = `${imageSrc}night.png`;
      }
      changeBackground(data)
    break
    case (id > 800):
      if(icon.includes("d")){
        weatherImage.src = `${imageSrc}cloudy-sun.png`;
      }else{
        weatherImage.src = `${imageSrc}cloudy-night.png`;
      }
      changeBackground(data)
    break
    }
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityInput = document.querySelector(".search-form__input") as HTMLInputElement;
  const cityName = cityInput.value;
  
  if (!cityName) {
    errorComponent("please enter city name")
  }
  if(cityName){
    try{
      var data = await fetchData(cityName);
      displayInfo(data);
    }
    catch{
      errorComponent("City not found. Please try again.");
    }
  }
})
