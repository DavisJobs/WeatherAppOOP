export const swiper = () => {
  const swiperDaily = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      370: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  });

  return {
    swiperDaily,
  };
};
