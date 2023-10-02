import utilitiesManager from "./utilities";

const fourVideosManager = {
  init: function () {
    const swiperOptions = {
      slidesPerView: 1.2,
    };

    utilitiesManager.initializeSwiperOnMobile(
      ".four-video-slider",
      swiperOptions
    );
  },
};

export default fourVideosManager;
