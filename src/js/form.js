import { ui } from "../class/ui";
import { Weather } from "../class/weather";

export const formSearch = (form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputSearch = form.querySelector(
      ".modal-search__content-input"
    ).value;

    if (inputSearch.trim() === "") {
      ui.errorMessage("please complete field", "errorField");
    }

    const weather = new Weather(inputSearch);
    weather.getWeather();
  });
};
