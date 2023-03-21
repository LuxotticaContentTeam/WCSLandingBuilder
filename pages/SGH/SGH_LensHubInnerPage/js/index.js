import LocomotiveScroll from "locomotive-scroll";
import LazyLoad from "./lazyLoad";
import Slider from "./slider";
import Video from "./video";

window.LPlensHub = {};
const headerHeightDesk = 95;
const headerHeightMob = 60;
let headerHeight = ct_is_mobile() ? headerHeightMob : headerHeightDesk;

// elements
const benefitsTitle = document.querySelector("#section-benefits .ct_title");
const benefitsLens = document.querySelector("#section-benefits #lens");
const benefitsItem01 = document.querySelector("#benefits .benefits-item-01");
const benefitsItem02 = document.querySelector("#benefits .benefits-item-02");
const benefitsItem03 = document.querySelector("#benefits .benefits-item-03");
const benefitsItem04 = document.querySelector("#benefits .benefits-item-04");

// class
const fixed = "ct_ls__fixed";
const toTop = "ct_ls__top";
const toBottom = "ct_ls__bottom";

document.addEventListener("DOMContentLoaded", () => {
  window.promo = false;

 //init locomotive
  window.LPlensHub.lsscroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    scrollbarContainer: document.querySelector("[data-scroll-container]"),
    lerp: 0.05, // Linear Interpolation, 0 > 1 // Try 0.01
    smooth: !1,
    lerp: .5,
    reloadOnContextChange: !0,
    tablet: {
        smooth: !1
    },
    smartphone: {
        smooth: !1
    }
  });


  //init LazyLoad
  new LazyLoad().init();

  //init slider
  new Slider().init();
  
  //init video
  new Video().init();
  
  window.LPlensHub.lsscroll.on("scroll", (args) => {
     console.log(window.LPlensHub.lsscroll.scroll.els);
     console.log(args);

    // section benefits
    if (typeof args.currentElements["benefits"] === "object") {

      // scroll is in benefits section
      if (args.scroll.y + headerHeight >= args.currentElements["benefits"].top) {
        console.log("scroll is in benefits section");
        benefitsTitle.classList.add(fixed, toTop);
        benefitsTitle.classList.remove(toBottom);
        benefitsLens.classList.add(fixed);
        $("#lens").css({
          bottom: `calc(100vh - ${headerHeight}px - 150px)`,
          top: "auto"
        });

         if(isScrollingDown()){
          if (args.scroll.y >= window.LPlensHub.lsscroll.scroll.els["item-01"].top){
             benefitsItem01.classList.add(fixed, toTop);
             benefitsItem01.classList.remove(toBottom);
          }else
              benefitsItem01.classList.remove(fixed, toTop, toBottom);
           
          if (args.scroll.y >= window.LPlensHub.lsscroll.scroll.els["item-02"].top){
            benefitsItem02.classList.add(fixed, toTop);
            benefitsItem02.classList.remove(toBottom);
          }else
            benefitsItem02.classList.remove(fixed, toTop, toBottom);

          if (args.scroll.y >= window.LPlensHub.lsscroll.scroll.els["item-03"].top){
            benefitsItem03.classList.add(fixed, toTop);
            benefitsItem03.classList.remove(toBottom);
          }else
            benefitsItem03.classList.remove(fixed, toTop, toBottom);

          if (args.scroll.y >= window.LPlensHub.lsscroll.scroll.els["item-04"].top){
            benefitsItem04.classList.add(fixed, toTop);
            benefitsItem04.classList.remove(toBottom);
          }else
            benefitsItem04.classList.remove(fixed, toTop, toBottom);
         }
      }

      // scroll is out benefits section
      // if (args.scroll.y + headerHeight >= args.currentElements["benefits"].bottom) {
      //   benefitsTitle.classList.add(toBottom);
      // }
      
       // scroll is out benefits section and section is still visible
      if (args.scroll.y + $("#benefits .ct_title").height() + headerHeight >= args.currentElements["benefits"].bottom) {
        console.log("// scroll is out benefits section and section is still visible");
        benefitsTitle.classList.remove(fixed, toTop);
        benefitsTitle.classList.add(toBottom);

        benefitsLens.classList.remove(fixed);
        $("#lens").css({
          bottom: `calc(100vh - ${headerHeight}px - 150px)`
        });

        benefitsItem01.classList.remove(fixed, toTop);
        benefitsItem01.classList.add(toBottom);

        benefitsItem02.classList.remove(fixed, toTop);
        benefitsItem02.classList.add(toBottom);

        benefitsItem03.classList.remove(fixed, toTop);
        benefitsItem03.classList.add(toBottom);

        benefitsItem04.classList.remove(fixed, toTop);
        benefitsItem04.classList.add(toBottom);
      }

      // scroll is before benefits section
      if (args.scroll.y + headerHeight < args.currentElements["benefits"].top) {
        console.log("scroll is before benefits section");
        benefitsTitle.classList.remove(fixed, toBottom, toTop);
        benefitsLens.classList.remove(fixed, toBottom);
        $("#lens").css({
          bottom: "auto",
          top: "-150px"
        });
      }
    }

    // benefits lens
    if (typeof args.currentElements["lens"] === "object") {
      if (args.currentElements["lens"].inView) {
        var _x = 600 - args.currentElements["lens"].progress * 1000;
        _x > 150 ? _x : (_x = 150);
        $("#lens").css({
          transform: `translateX(${_x}px)`,
        });
      }
    }

    // benefits item01
    if (typeof args.currentElements["item-01"] === "object") {
      if (args.currentElements["item-01"].inView) {

        // add opacity
        $("#benefits .benefits-item-01 div").css({
           opacity: `${args.currentElements["item-01"].progress}`,
        });

        if (args.scroll.y + headerHeight >= args.currentElements["item-01"].top) {
          if(isScrollingDown())
            benefitsItem01.classList.add(fixed, toTop);
        }
        if(args.scroll.y <= args.currentElements["item-01"].top){
          if(!isScrollingDown())
            benefitsItem01.classList.add(fixed, toTop);
        }
      }
    }

    // const book = {
    //   content: '📒',
    //   display: 'block',
    //   padding: '20px',
    //   background: 'yellow'
    // };
    
    // const getStyles = obj => Object.keys(obj).map(key => `${key}:${obj[key]}`).join(';');
    
    // // Later you can call the function to inline the styles
    // getStyles(book);
    
    // // Or assign it directly to your cssText
    // element.style.cssText = getStyles(book)

    //benefits item02
    if (typeof args.currentElements["item-02"] === "object") {
      if (args.currentElements["item-02"].inView) {
        $("#benefits .benefits-item-02 div").css({
          opacity: `${args.currentElements["item-02"].progress}`,
        });

        if (args.scroll.y + headerHeight >= window.LPlensHub.lsscroll.scroll.els["item-02"].top) {
          if(isScrollingDown())
            benefitsItem02.classList.add(fixed, toTop);
        }
        if(args.scroll.y <= args.currentElements["item-02"].top){
          if(!isScrollingDown())
            benefitsItem02.classList.add(fixed, toTop);
        }
      }
    }

    //benefits item03
    if (typeof args.currentElements["item-03"] === "object") {
      $("#benefits .benefits-item-03 div").css({
        opacity: `${args.currentElements["item-03"].progress}`,
     });

      if (args.currentElements["item-03"].inView) {
        if (args.scroll.y + headerHeight >= window.LPlensHub.lsscroll.scroll.els["item-03"].top) {
          if(isScrollingDown())
            benefitsItem03.classList.add(fixed, toTop);
        }
        if(args.scroll.y <= args.currentElements["item-03"].top){
          if(!isScrollingDown())
            benefitsItem03.classList.add(fixed, toTop);
        }
      }
    }

    //benefits item04
    if (typeof args.currentElements["item-04"] === "object") {
      if(args.currentElements["item-04"].inView){
        console.log(args.currentElements["item-04"].progress*2);
          $("#benefits .benefits-item-04 div").css({
            opacity: `${args.currentElements["item-04"].progress}`,
          });
      }
        if (args.currentElements["item-04"].inView) {
          if (args.scroll.y + headerHeight >= window.LPlensHub.lsscroll.scroll.els["item-04"].top) {
            if(isScrollingDown())
              benefitsItem04.classList.add(fixed, toTop);
          }
        }
        if(args.scroll.y <= args.currentElements["item-04"].top){
          if(!isScrollingDown())
            benefitsItem04.classList.add(fixed, toTop);
        }
    }
  });
});

let previousScrollPosition = 0;
const isScrollingDown = () => {
  let goingDown = false;
  let scrollPosition = window.pageYOffset;
  if (scrollPosition > previousScrollPosition) {
    goingDown = true;
  }
  previousScrollPosition = scrollPosition;
  return !goingDown;
};

function ct_is_mobile() {
  return !($(window).width() > 1024) && (1024 !== $(window).width() || window.innerHeight > window.innerWidth)
}


/* drag image clipbox */
const clipbox = document.querySelector(".ct_clipbox");
const dragger = document.querySelector(".ct_clipbox .dragger");
const first   = document.querySelector(".ct_clipbox .primary__img");

let drag = false;

const draggerWidth = dragger.getBoundingClientRect().width;


const clipboxDimensions = {
	width: clipbox.getBoundingClientRect().width,
	left: clipbox.getBoundingClientRect().left
};

const handleStartDrag = () => {
	drag = true;
	dragger.classList.add("dragger--active");
	dragger.style.pointerEvents = "none";
};

const handleStopDrag = () => {
	drag = false;
	dragger.style.pointerEvents = "auto";
	dragger.classList.remove("dragger--active");	
	clipbox.style.cursor = "auto";
};

const handleImgReveal = e => {
	e.preventDefault();
  if(ct_is_mobile())
    e.offsetX = e.offsetX || e.targetTouches[0].pageX - clipboxDimensions.left;
	if(drag && e.offsetX < clipboxDimensions.width && e.offsetX > 0) {
		clipbox.style.cursor = "ew-resize";
		dragger.style.left = e.offsetX - draggerWidth / 2 + "px";
		first.style.width = e.offsetX + "px";
	}
};

document.addEventListener("DOMContentLoaded", () => {
    dragger.addEventListener("mousedown", handleStartDrag);
    dragger.addEventListener("touchstart", handleStartDrag);

    clipbox.addEventListener("mouseup", handleStopDrag);
    clipbox.addEventListener("touchend", handleStopDrag);

    clipbox.addEventListener("mousemove", handleImgReveal);
    clipbox.addEventListener("touchmove", handleImgReveal);
});
