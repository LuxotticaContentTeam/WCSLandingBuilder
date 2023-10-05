import utilitiesManager from "./utilities";

const getSupportManager = {
  init: function () {
    const swiperOptions = {
      slidesPerView: 1.1,
      pagination: {
        el: ".swiper-pagination",
      },
    };

    utilitiesManager.initializeSwiperOnMobile(
      ".get-support-slider",
      swiperOptions
    );
  },
};

export default getSupportManager;
