import utilitiesManager from "./utilities";

const controlsChoicesManager = {
  init: function () {
    const swiperOptions = {
      slidesPerView: "auto",
      centeredSlides: true,
      loopedSlides: 2,
      spaceBetween: 32,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        1024: {
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
