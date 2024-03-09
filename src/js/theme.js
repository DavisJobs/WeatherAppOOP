export const theme = (toggle) => {
  let night = "dark";
  let day = "light";
  const html = document.documentElement;
  const getTheme = localStorage.getItem("theme");
  const icon = document.querySelector(".switch__icon");

  html.classList.add(day);

  if (getTheme === night) {
    html.classList.remove(day);
    html.classList.add(night);
    toggle.classList.add("activeTheme");
    icon.classList.remove("bx-sun");
    icon.classList.add("bx-moon");
  }

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("activeTheme");

    if (html.classList.contains(day)) {
      html.classList.remove(day);
      html.classList.add(night);
      localStorage.setItem("theme", night);
      icon.classList.remove("bx-sun");
      icon.classList.add("bx-moon");
    } else if (html.classList.contains(night)) {
      html.classList.add(day);
      html.classList.remove(night);
      localStorage.setItem("theme", day);
      icon.classList.remove("bx-moon");
      icon.classList.add("bx-sun");
    }
  });
};
