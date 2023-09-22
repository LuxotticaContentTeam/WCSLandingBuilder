import utilitiesManager from "./utilities";

const featuresManager = {
  init: function () {
    const swiperOptions = {
      slidesPerView: 1.25,
      pagination: {
        el: ".swiper-pagination",
      },
    };

    utilitiesManager.initializeSwiperOnMobile(
      ".features-slider",
      swiperOptions
    );
  },
};

export default featuresManager;
