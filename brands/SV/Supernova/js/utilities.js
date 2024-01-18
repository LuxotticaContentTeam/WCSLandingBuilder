//class that handler utilitis that can be reused everywhere
const utilitiesManager = {
  setVideoUrl: function (currentVideoEl) {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const videoMob = currentVideoEl.getAttribute("data-video-mob");
    const videoDesk = currentVideoEl.getAttribute("data-video-desk");
    let videoSource;

    if (mediaQuery.matches) {
      videoSource = `<source src="${videoMob}" type="video/mp4">Your browser does not support the video tag.`;
    } else {
      videoSource = `<source src="${videoDesk}" type="video/mp4">Your browser does not support the video tag.`;
    }

    currentVideoEl.innerHTML = videoSource;
  },

  playPauseVideoWithControls: function () {
    const thisClass = this;

    const playPauseControl = document.querySelectorAll(
      ".video-control.play-pause"
    );

    for (let i = 0; i < playPauseControl.length; i++) {
      playPauseControl[i].addEventListener("click", function (event) {
        event.preventDefault();
        const currentClosestContainer = this.closest("section>div");
        const currentVideoContainer = this.closest(".video-container");
        const currentVideoEl = currentVideoContainer.querySelector("video");
        const currentVideoCover =
          currentVideoContainer.querySelector(".video-cover");
        let nextElem = currentVideoContainer.nextElementSibling;
        const playIcon = this.querySelector(".play");
        const pauseIcon = this.querySelector(".pause");

        thisClass.setVideoUrl(currentVideoEl);



        // currentVideoCover.classList.add("cb_d-none");
        // currentVideoEl.classList.remove("cb_d-none");
        
        currentVideoCover.classList.add("cb_opacity-0");
        currentVideoEl.classList.remove("cb_d-none");



        // if (currentClosestContainer.classList.contains("is-banner")) {
        //   while (nextElem) {
        //     nextElem.classList.add("cb_d-none");
        //     nextElem = nextElem.nextElementSibling;
        //   }
        // }

        playIcon.classList.toggle("cb_d-none");
        pauseIcon.classList.toggle("cb_d-none");

        if (!currentVideoEl.classList.contains("is-playing")) {
          document.querySelectorAll("video.is-playing").forEach((video) => {
            video.classList.remove("is-playing");
            video
              .closest(".video-container")
              .querySelector(".play")
              .classList.remove("cb_d-none");
            video
              .closest(".video-container")
              .querySelector(".pause")
              .classList.add("cb_d-none");
            video.pause();
          });

          currentVideoEl.play();
          currentVideoEl.classList.add("is-playing");
        } else {
          currentVideoEl.pause();
          currentVideoEl.classList.remove("is-playing");
        }
      });
    }
  },

  volumeOnOffVideo: function () {
    const volumeOnOffControl = document.querySelectorAll(
      ".video-control.volume-on-off"
    );
    for (let i = 0; i < volumeOnOffControl.length; i++) {
      volumeOnOffControl[i].addEventListener("click", function (event) {
        event.preventDefault();

        const currentVideoContainer = this.closest(".video-container");
        const currentVideoEl = currentVideoContainer.querySelector("video");

        const volumeOnIcon = this.querySelector(".volume-on");
        const volumeOffIcon = this.querySelector(".volume-off");

        volumeOnIcon.classList.toggle("cb_d-none");
        volumeOffIcon.classList.toggle("cb_d-none");

        if (volumeOnIcon.classList.contains("cb_d-none")) {
          currentVideoEl.muted = true;
        } else {
          currentVideoEl.muted = false;
        }
      });
    }
  },

  manageAccordion: function () {
    let accordionButton = document.querySelectorAll(".accordion-button");
    for (let i = 0; i < accordionButton.length; i++) {
      accordionButton[i].addEventListener("click", function (event) {
        event.preventDefault();
        this.classList.toggle("active");
        let nextAccordionDetails = this.nextElementSibling;
        if (!nextAccordionDetails.classList.contains("opened")) {
          nextAccordionDetails.classList.add("opened");
          let nextAccordionDetailsHeight =
            nextAccordionDetails.children[0].offsetHeight;
          nextAccordionDetails.style.height = nextAccordionDetailsHeight + "px";
        } else {
          nextAccordionDetails.classList.remove("opened");
          nextAccordionDetails.style.height = 0;
        }
      });
    }
  },

  initializeSwiper: function (sliderClass, options) {
    const currentSlider = new Swiper(sliderClass, options);
    return currentSlider;
  },

  initializeSwiperOnMobile: function (sliderClass, options) {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    let currentSlider;

    const initializeSwiper = function () {
      if (mediaQuery.matches) {
        currentSlider = new Swiper(sliderClass, options);
      }
    };

    initializeSwiper();

    window.addEventListener("resize", function () {
      const swiperEl = document.querySelectorAll(sliderClass);
      for (let i = 0; i < swiperEl.length; i++) {
        if (!swiperEl[i].classList.contains("swiper-initialized")) {
          initializeSwiper();
        } else if (!mediaQuery.matches) {
          swiperEl[i].swiper.disable();
          swiperEl[i].swiper.destroy(true, true);
        }
      }
    });

    return currentSlider;
  },

  pauseVideoOnPrevNextSlide: function (sliderClass) {
    const currentSwiperEl = document.querySelector(sliderClass);
    currentSwiperEl.swiper.on("slideChange", function () {
      currentSwiperEl.querySelectorAll("video.is-playing").forEach((video) => {
        video.classList.remove("is-playing");
        video
          .closest(".video-container")
          .querySelector(".play")
          .classList.remove("cb_d-none");
        video
          .closest(".video-container")
          .querySelector(".pause")
          .classList.add("cb_d-none");
        video.pause();
      });
    });
  },
};

export default utilitiesManager;