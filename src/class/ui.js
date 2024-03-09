import moment from "moment/moment";
import { swiper } from "../helpers/swiper";
import { uitls } from "../helpers/uitls";
import { addStorageWelcome, formSearch, theme } from "../js";

export class UI {
  welcome() {
    const sectionWelcome = document.createElement("section");

    sectionWelcome.classList.add("welcome");
    sectionWelcome.innerHTML = `
    <img src="./world.webp" class="welcome__img-overlay" alt="" />
    <div class="welcome__container container">
      <div class="welcome__content">
        <figure class="welcome__figure">
          <img src="./weather-img.png" class="welcome__image" alt="" />
        </figure>
        <h2 class="welcome__content-title">Weather & Forecast Application</h2>
        <p class="welcome__content-description">
          Find your weather predictions in your City Easy steps to predict the
          weather and make your day easier.
        </p>

        <span> <b>Note:</b> activate your location</span>

        <buttom class="welcome__content-start">Get Start</buttom>
      </div>
    </div>
    `;
    document.body.appendChild(sectionWelcome);
    addStorageWelcome(sectionWelcome);
  }

  switchToggle() {
    const contentSwitch = document.createElement("div");

    contentSwitch.classList.add("switch");
    contentSwitch.innerHTML = `
    <i class="switch__icon bx bx-sun"></i>
    `;

    document.body.appendChild(contentSwitch);
    theme(contentSwitch);
  }

  async renderWeatherData(data) {
    let modalOpen;
    const { openModal } = uitls();
    const api = await data.current;
    const { icon, description } = await api.weather[0];

    const geolocationHtml = document.createElement("section");
    geolocationHtml.classList.add("geolocation");

    const timezone = data.timezone;
    const timezoneInMinutes = timezone;
    const currTime = moment().utcOffset(timezoneInMinutes).format("LT");

    geolocationHtml.innerHTML = `
    <div class="container">
      <div class="geolocation__content">
        <div class="geolocation__content-head">
        <i class='geolocation__content-head-search bx bx-search-alt'></i>
          <i class="bx bx-map"></i>
          <h5>${timezoneInMinutes}</h5>
          <span class="geolocation__content-head-time">${currTime}</span>
        </div>
        <div class="geolocation__content-info">
        <h1 class="geolocation__content-info-day">${moment(
          api.dt * 1000
        ).format("ddd")}</h1>
          <figure class="geolocation__content-figure">
            <img
              src="http://openweathermap.org/img/wn/${icon}@2x.png"
              alt=""
              class="geolocation__content-img"
            />
          </figure>
          <h2 class="geolocation__content-degrees">${api.temp.toFixed()}°C</h2>
          <span class="geolocation__content-description">${description}</span>
        </div>
        <div class="geolocation__content-data">
          <div>
            <div class="geolocation__content-data-item">
              <i class="bx bx-wind"></i>
              <h4>${api.wind_speed.toFixed()}km/h</h4>
              <span>Wind</span>
            </div>
            <div class="geolocation__content-data-item">
              <i class="bx bx-water"></i>
              <h4>${api.humidity}%</h4>
              <span>Humidity</span>
            </div>
            <div class="geolocation__content-data-item">
              <i class="bx bx-sun"></i>
              <h4>${api.uvi.toFixed()}</h4>
              <span>UV</span>
            </div>
          </div>

          <div>
            <div class="geolocation__content-data-item">
              <i class="bx bx-timer"></i>
              <h4>${api.pressure}hPa</h4>
              <span>Pressure</span>
            </div>
            <div class="geolocation__content-data-item">
              <i class="bx bx-cloud"></i>
              <h4>${api.clouds}%</h4>
              <span>Clouds</span>
            </div>
            <div class="geolocation__content-data-item">
              <i class="bx bx-show-alt"></i>
              <h4>${api.visibility}km</h4>
              <span>Visibility</span>
            </div>
          </div>
        </div>

        <div
          #swiperRef=""
          class="swiper mySwiper geolocation__content-slider-wrapp"
        >
          <div class="geolocation__slider-days-head">
            <h4> Daily <i class="bx bx-chevron-right"></i></h4>
          </div>
          <div class="swiper-wrapper geolocation__content-slider-container">
        
          </div>
        </div>
      </div>
    </div>
    `;

    document.body.appendChild(geolocationHtml);
    document.body.removeChild(document.querySelector(".loader-geo-container"));
    this.renderDaily(data);
    modalOpen = document.querySelector(".geolocation__content-head-search");
    openModal(modalOpen);
  }

  renderDaily(data) {
    const containerDaily = document.querySelector(
      ".geolocation__content-slider-container"
    );

    data.daily.forEach(async (day) => {
      const imgWeatherDaily = await day.weather[0].icon;

      const itemDay = document.createElement("article");
      itemDay.classList.add("geolocation__content-slider-item", "swiper-slide");
      itemDay.innerHTML = `
      
      <h2>${moment(day.dt * 1000).format("ddd")}</h2>
      <h3>${day.temp.day.toFixed()}°C</h3>
      <figure class="geolocation__content-figure">
        <img
          src="http://openweathermap.org/img/wn/${imgWeatherDaily}@2x.png"
          alt=""
          class="geolocation__content-img"
        />
      </figure>
      <span>${day.clouds}%</span>
      <p>${day.weather[0].description}</p>
  `;
      containerDaily.appendChild(itemDay);
      const { swiperDaily } = swiper();
      swiperDaily;
    });
  }

  weatherFind() {
    let modalClose, form;
    const { closeModal } = uitls();
    const modalSearch = document.createElement("div");

    modalSearch.classList.add("modal-search");
    modalSearch.innerHTML = `
    <img class="modal-search__content-overlay" src="./world.webp" />
    <div class="modal-search__content-group">
      <i class="modal-search__content-close bx bx-chevron-left"></i>
      <h2 class="modal-search__content-title">Search for City</h2>
    </div>
    <form class="modal-search__content">
      <div class="modal-search__content-search">
        <i class="modal-search__content-icon bx bx-search-alt"></i>
        <input
          type="text"
          class="modal-search__content-input"
          placeholder="Search City | Ex: new york,us"
        />
      </div>
      <div class="modal-search__content-container">

      </div>
    </form>
  `;

    document.body.appendChild(modalSearch);
    modalClose = document.querySelector(".modal-search__content-close");
    form = document.querySelector(".modal-search__content");
    closeModal(modalClose);
    formSearch(form);
  }

  async searchWeather(data) {
    const container = document.querySelector(
      ".modal-search__content-container"
    );

    container.innerHTML = `
    <div class="modal-search__content-temperature">
        <h3>${data.name} / ${data.sys.country}</h3>
        <figure>
          <img
            src="http://openweathermap.org/img/wn/${
              data.weather[0].icon
            }@2x.png"
            alt=""
          />
        </figure>
        <h4>${data.main.temp.toFixed()}°C</h4>
        <p>${data.weather[0].description}</p>
      </div>
      <div class="modal-search__content-info">
        <div>
          <article class="modal-search__content-info-item">
            <i class="bx bx-wind"></i>
            <h4>${data.wind.speed}</h4>
            <span>Wind Speed</span>
          </article>
          <article class="modal-search__content-info-item">
            <i class="bx bx-water"></i>
            <h4>${data.main.humidity}%</h4>
            <span>Humidity</span>
          </article>
          <article class="modal-search__content-info-item">
            <i class="bx bx-sun"></i>
            <h4>${data.main.temp_max.toFixed()}°C</h4>
            <span>Temp. Max</span>
          </article>
        </div>
        <div>
          <article class="modal-search__content-info-item">
            <i class="bx bx-timer"></i>
            <h4>${data.main.pressure}hPa</h4>
            <span>Pressure</span>
          </article>
          <article class="modal-search__content-info-item">
            <i class="bx bx-cloud"></i>
            <h4>${data.clouds.all}%</h4>
            <span>Clouds</span>
          </article>
          <article class="modal-search__content-info-item">
            <i class="bx bx-show-alt"></i>
            <h4>${data.visibility}km</h4>
            <span>Visibility</span>
          </article>
        </div>
      </div>  
    `;
  }

  locationPermission(message) {
    const loadPermission = document.createElement("section");

    loadPermission.classList.add("alert-permission");
    loadPermission.innerHTML = `
    <img class="alert-permission__overlay" src="./alert.jpg" alt="" />
    <div class="alert-permission__container container">
      <h2>${message}</h2>
    </div>
    `;

    document.body.appendChild(loadPermission);
  }

  errorMessage(message, messageClass) {
    const messageCodeError = document.querySelector(
      ".modal-search__content-container"
    );
    messageCodeError.innerHTML = `<h2 class="${messageClass}">${message}</h2>`;

    const loaderExist = document.querySelector(".loader-container");

    document?.body?.removeChild(loaderExist);
  }

  loaderSearch() {
    const messageCodeError = document.querySelector(
      ".modal-search__content-container"
    );

    messageCodeError.innerHTML = `<div class="loader-container"><div class="loader"></div></div>`;
  }

  loaderGeolocation() {
    const loadLoader = document.createElement("div");

    loadLoader.classList.add("loader-geo-container");
    loadLoader.innerHTML = `<div class="loader-geo"></div>`;
    document.body.appendChild(loadLoader);
  }
}

export const ui = new UI();
