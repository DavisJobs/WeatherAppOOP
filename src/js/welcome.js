import { ui } from "../class/ui";
import { Weather } from "../class/weather";

export const addStorageWelcome = (sectionWelcome) => {
  const btnStart = document.querySelector(".welcome__content-start");

  btnStart.addEventListener("click", () => {
    localStorage.setItem("welcome", "true");
    sectionWelcome.classList.add("hidden");

    setTimeout(() => {
      document.body.removeChild(sectionWelcome);
      location.reload();
    }, 800);
  });
};

const removeStorageWelcome = () => {
  if (localStorage.getItem("welcome") === "true") {
    const weather = new Weather();
    weather.currentGeolocation();
  } else {
    localStorage.setItem("welcome", "false");
    ui.welcome();
  }
};

export const init = () => {
  ui.switchToggle();
  removeStorageWelcome();
};
