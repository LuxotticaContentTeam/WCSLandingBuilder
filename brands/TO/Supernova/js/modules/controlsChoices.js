import utilitiesManager from "./utilities";

const controlsChoicesManager = {
  init: function () {
    const swiperOptions = {
      slidesPerView: 1.3,
      centeredSlides: true,
      spaceBetween: 32,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        1025: {
          slidesPerView: 2,
          spaceBetween: 64,
        },
      },
    };

    utilitiesManager.initializeSwiper(
      ".controls-choices-slider",
      swiperOptions
    );

    // utilitiesManager.pauseVideoOnPrevNextSlide(".controls-choices-slider");
  },
};

export default controlsChoicesManager;
