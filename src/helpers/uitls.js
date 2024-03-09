import { ui } from "../class/ui";

export const uitls = () => {
  const openModal = (open) => {
    open.addEventListener("click", () => {
      ui.weatherFind();
    });
  };

  const closeModal = (close) => {
    close.addEventListener("click", () => {
      document.body.removeChild(document.querySelector(".modal-search"));
    });
  };

  return {
    openModal,
    closeModal,
  };
};
