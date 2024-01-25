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

  lazyLoading: function() {    
    var windowTop = window.window.scrollY;
    console.log("windowTop", windowTop);
    
    let ct_entries = document.querySelectorAll('#supernovaLP .lazy-lo:not(.lazy-loaded)');
    ct_entries.forEach((element,i)=>{
      console.log("element.getBoundingClientRect().top", element.getBoundingClientRect().top);
      console.log("window.innerHeight * 2", window.innerHeight * 2);
        //if (windowTop > element.getBoundingClientRect().top - (window.innerHeight * 2) ) {
        if (windowTop > element.parentNode.getBoundingClientRect().top) {
            if (element.nodeName.toLowerCase() === 'picture') {
                element.querySelectorAll('source').forEach((item,i)=>{
                  item.srcset = item.getAttribute('data-srcset');
                });
                var img = element.querySelector('img');
                img.src = img.getAttribute('data-src');
                element.classList.add('lazy-loaded');
            }
            else if (element.nodeName.toLowerCase() === 'video') {
              this.setVideoUrl(element);
              //element.closest(".video-container").querySelector(".video-control.play-pause").click();
              var coverVideo = element.closest(".video-container").querySelector("img");
              coverVideo.classList.add("cb_opacity-0");
              element.classList.remove("cb_d-none");
              // element.classList.remove("lazy-lo");
              // element.classList.add('lazy-loaded');
            }else if (element.nodeName.toLowerCase() === 'img'){
              element.src = element.getAttribute('data-src');
              element.classList.add('lazy-loaded');
            }
        }
    });

    // $('#supernovaLP .lazy-lo:not(.lazy-loaded)').each(function(){
    //     if ( windowTop > $(this).offset().top - ( window.innerHeight * 2 ) ) {
    //         if ($(this).is('video')) {
    //             if($(this).attr('data-video-src-tab') == undefined){
    //                 if (ct_is_mobile()){
    //                     if ($(this).attr('data-video-src-mob') != undefined ){
    //                         $(this).addClass('ct_m__video')
    //                         $(this).attr('poster', $(this).attr('data-poster-mob'));
    //                         $(this).attr('src', $(this).attr('data-video-src-mob'));
    //                     }else{
    //                         $(this).addClass('ct_d__video')
    //                         $(this).attr('poster', $(this).attr('data-poster-desk'));
    //                         $(this).attr('src', $(this).attr('data-video-src-desk'));
    //                     }
                        
    //                 }else{
    //                     if (window.document.documentMode && $(this).attr('data-poster-desk-ie') != undefined && $(this).attr('data-poster-desk-ie').length > 0) { //set poster for IE
    //                         $(this).addClass('ct_ie__video')
    //                         $(this).attr('poster', $(this).attr('data-poster-desk-ie'));
    //                     }else{
    //                         $(this).addClass('ct_d__video')
    //                         $(this).attr('poster', $(this).attr('data-poster-desk'));
    //                         $(this).attr('src', $(this).attr('data-video-src-desk'));
    //                     }
    //                 }
    //             }else{
    //                 if (ct_get__device_type() === 'mob'){ //mobile
    //                     if ($(this).attr('data-video-src-mob') != undefined ){
    //                         $(this).addClass('ct_m__video')
    //                         $(this).attr('poster', $(this).attr('data-poster-mob'));
    //                         $(this).attr('src', $(this).attr('data-video-src-mob'));
    //                     }else{
    //                         $(this).addClass('ct_d__video')
    //                         $(this).attr('poster', $(this).attr('data-poster-desk'));
    //                         $(this).attr('src', $(this).attr('data-video-src-desk'));
    //                     }
    //                 }else{
    //                     if (ct_get__device_type() === 'tab'){//tablet
    //                         $(this).addClass('ct_t__video')
    //                         $(this).attr('poster', $(this).attr('data-poster-tab'));
    //                         $(this).attr('src', $(this).attr('data-video-src-tab'));
    //                     }else{//desktop
    //                         if (window.document.documentMode && $(this).attr('data-poster-desk-ie') != undefined && $(this).attr('data-poster-desk-ie').length > 0) { //set poster for IE
    //                             $(this).addClass('ct_ie__video')
    //                             $(this).attr('poster', $(this).attr('data-poster-desk-ie'));
    //                         }else{
    //                             $(this).addClass('ct_d__video')
    //                             $(this).attr('poster', $(this).attr('data-poster-desk'));
    //                             $(this).attr('src', $(this).attr('data-video-src-desk'));
    //                         }
    //                     }

    //                 }
    //             }
    //         }
    //         else 
           
    //         if ( $(this).is('picture') ) {
                 
    //             $(this).find('source').each(function(){
    //                 $(this).attr('srcset', $(this).attr('data-image-src'));                   
    //             })
    //             $('img',this).attr({
    //                 'src': $('img',this).attr('data-image-src'),
    //                 'srcset':$('img',this).attr('data-image-srcset')
    //             });
    //         } 
           
    //         if ( $(this).is('img') ) {
    //             $(this).attr('src', $(this).attr('data-image-src'));  
    //         }
    //         $(this).addClass('lazy-loaded');
    //     }
    // });
  }
};

export default utilitiesManager;
