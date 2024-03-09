import { ui } from "./ui";

export class Weather {
  constructor(searchValue) {
    this.searchValue = searchValue;
  }

  async getWeatherGeoLocation(lat, lon) {
    ui.loaderGeolocation();
    const getCurrent = `${
      import.meta.env.VITE_API_ONECALL
    }lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;

    try {
      const res = await fetch(getCurrent);
      const data = await res.json();

      ui.renderWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getWeather() {
    ui.loaderSearch();

    const url = `${import.meta.env.VITE_API_SEARCH}q=${
      this.searchValue
    }&appid=${import.meta.env.VITE_API_KEY}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (res.status === 404) {
        ui.errorMessage("Location not found", "error");
      }

      ui.searchWeather(data);
    } catch (error) {
      console.log(error);
    }
  }

  currentGeolocation() {
    const succesCallback = (position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      this.getWeatherGeoLocation(latitude, longitude);
    };

    const errorCallback = (error) => {
      console.log(error);

      if (error.code == error.PERMISSION_DENIED) {
        ui.locationPermission(error.message);
      }
    };

    navigator.geolocation.getCurrentPosition(succesCallback, errorCallback);
  }
}
