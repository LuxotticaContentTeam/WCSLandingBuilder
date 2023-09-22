// import Swiper JS
// import Swiper from "swiper/swiper-bundle.min.js";

import utilitiesManager from "./utilities";
import fourVideosManager from "./fourVideos";
import getSupportManager from "./getSupport";
import featuresManager from "./features";
import controlsChoicesManager from "./controlsChoices";
import productsManager from "./products";

//class that handler generic scripts of LP
const mainManager = {
  setTextOnStickyBanner: function () {
    window.addEventListener("scroll", function () {
      const sections = document.querySelectorAll("section");
      const productSection = document.getElementById("products");
      const productSectionTop = productSection.offsetTop;
      const stickyBannerEl = document.getElementById("stickyBanner");
      const stickyBannerText =
        stickyBannerEl.querySelector("#stickyBannerText");

      let currentSection = null;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentSection = section;
        }
      });

      if (currentSection) {
        const attribute = currentSection.querySelector("[data-title]");

        if (window.scrollY >= productSectionTop) {
          stickyBannerEl.classList.remove("cb_d-none");
        } else {
          stickyBannerEl.classList.add("cb_d-none");
        }

        if (attribute) {
          const attributeValue = attribute.getAttribute("data-title");
          stickyBannerText.textContent = attributeValue;
        }
      }
    });
  },

  init: function () {
    const thisClass = this;

    thisClass.setTextOnStickyBanner();
    utilitiesManager.playPauseVideoWithControls();
    utilitiesManager.volumeOnOffVideo();
    utilitiesManager.manageAccordion();
    fourVideosManager.init();
    getSupportManager.init();
    featuresManager.init();
    controlsChoicesManager.init();
    productsManager.init();
  },
};

document.addEventListener("DOMContentLoaded", function () {
  mainManager.init();
});
