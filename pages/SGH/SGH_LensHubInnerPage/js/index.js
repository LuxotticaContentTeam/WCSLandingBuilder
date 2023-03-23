import LocomotiveScroll from "locomotive-scroll";
import { lazyLo } from "./lazy";
import Slider from "./slider";
import Video from "./video";

window.LPlensHub = {};

// elements
const benefitsTitle = document.querySelector(".ct_section__benefits .ct_title");
const benefitsLens = document.querySelector(".ct_section__benefits .ct_lens");
const benefitsItem01 = document.querySelector(".ct_section__benefits .benefits-item-01");
const benefitsItem02 = document.querySelector(".ct_section__benefits .benefits-item-02");
const benefitsItem03 = document.querySelector(".ct_section__benefits .benefits-item-03");
const benefitsItem04 = document.querySelector(".ct_section__benefits .benefits-item-04");

// class
const fixed = "ct_ls__fixed";
const toTop = "ct_ls__top";
const toBottom = "ct_ls__bottom";

document.addEventListener("DOMContentLoaded", () => {
  window.promo = false;
  window.ct_current__device = currentDevice();
  let headerHeight = window.ct_current__device === 'M' ? document.querySelectorAll('.sgh-main-menu')[1].clientHeight : document.querySelector('.main-menu-center.navbar').clientHeight + document.querySelector('.sgh-service-menu').clientHeight;

  document.querySelector(".ct_section__benefits .ct_title").style.height = `calc(100vh - ${headerHeight}px`;
  document.querySelectorAll(".ct_section__benefits .ct_benefits_item").forEach(function(el){el.style.height = `calc(100vh - ${headerHeight}px`});
  
  //init lazy
  lazyLo();

  new Slider().init();
  
  //init video
  new Video().init();

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
  
  window.LPlensHub.lsscroll.on("scroll", (args) => {
     //console.log(window.LPlensHub.lsscroll.scroll.els);
     //console.log(args);

    // section benefits
    if (typeof args.currentElements["benefits"] === "object") {

      // scroll is in benefits section
      if (args.scroll.y + headerHeight >= args.currentElements["benefits"].top) {
        //console.log("scroll is in benefits section");
        benefitsTitle.classList.add(fixed, toTop);
        benefitsTitle.classList.remove(toBottom);
        benefitsLens.classList.add(fixed);

        benefitsItem01.classList.add(fixed, toTop);
        benefitsItem01.classList.remove(toBottom);

        var lens_bottom = window.ct_current__device === 'M' ? "150" : "250";
        $(".ct_lens").css({
          bottom: `calc(100vh - ${headerHeight}px - ${lens_bottom}px)`,
          top: "auto"
        });

          if (args.scroll.y <= window.LPlensHub.lsscroll.scroll.els["item-01"].top){
            benefitsItem01.classList.remove(fixed, toTop, toBottom);
          }
           
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

       // scroll is out benefits section and section is still visible
      if (args.scroll.y + $(".ct_section__benefits .ct_title").height() + headerHeight >= args.currentElements["benefits"].bottom) {
        //console.log("// scroll is out benefits section and section is still visible");
        benefitsTitle.classList.remove(fixed, toTop);
        benefitsTitle.classList.add(toBottom);

        benefitsLens.classList.remove(fixed);

        $(".ct_lens").css({
          bottom: `calc(100vh - ${headerHeight}px - ${lens_bottom}px)`
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
        //console.log("scroll is before benefits section");
        benefitsTitle.classList.remove(fixed, toBottom, toTop);
        benefitsLens.classList.remove(fixed, toBottom);

        var lens_top = window.ct_current__device === 'M' ? "-150" : "-250";
        $(".ct_lens").css({
          bottom: "auto",
          top: `${lens_top}px`
        });
      }
    }

    // benefits lens
    if (typeof args.currentElements["lens"] === "object") {
      if (args.currentElements["lens"].inView) {
        if(window.ct_current__device === 'D'){
          var _x = 600 - args.currentElements["lens"].progress * 1000 > 250 ? 600 - args.currentElements["lens"].progress * 1000 : 250;
          $(".ct_lens").css({
            transform: `translateX(${_x}px)`,
          });
        }
        else{
          var _x = 600 - args.currentElements["lens"].progress * 1000 > 150 ? 600 - args.currentElements["lens"].progress * 1000 : 150
          $(".ct_lens").css({
            transform: `translateX(${_x}px)`,
          });
        }
      }
    }

    // benefits item01
    if (typeof args.currentElements["item-01"] === "object") {
      if (args.currentElements["item-01"].inView) {

        // add opacity
        var opacity = 3 * (args.currentElements["item-01"].progress - .15) <= 1 ? 3 * (args.currentElements["item-01"].progress - .15) : 1;
        $(".ct_section__benefits .benefits-item-01 div").css({
           opacity: `${opacity}`,
        });

        if (args.scroll.y + headerHeight >= args.currentElements["item-01"].top) {
            benefitsItem01.classList.add(fixed, toTop);
        }
      }
    }

    //benefits item02
    if (typeof args.currentElements["item-02"] === "object") {
      if (args.currentElements["item-02"].inView) {
        var opacity = 3 * (args.currentElements["item-02"].progress - .15) <= 1 ? 3 * (args.currentElements["item-02"].progress - .15) : 1;
        $(".ct_section__benefits .benefits-item-02 div").css({
          opacity: `${opacity}`
        });

        if (args.scroll.y + headerHeight >= window.LPlensHub.lsscroll.scroll.els["item-02"].top) {
            benefitsItem02.classList.add(fixed, toTop);
        }
      }
    }

    //benefits item03
    if (typeof args.currentElements["item-03"] === "object") {
      if (args.currentElements["item-03"].inView) {
          var opacity = 3 * (args.currentElements["item-03"].progress - .15) <= 1 ? 3 * (args.currentElements["item-03"].progress - .15) : 1;
          $(".ct_section__benefits .benefits-item-03 div").css({
            opacity: `${opacity}` 
        });
        if (args.scroll.y + headerHeight >= window.LPlensHub.lsscroll.scroll.els["item-03"].top)
            benefitsItem03.classList.add(fixed, toTop);
      }
    }

    //benefits item04
    if (typeof args.currentElements["item-04"] === "object") {
      if(args.currentElements["item-04"].inView){
         var opacity = 2 * (args.currentElements["item-04"].progress - .15) <= 1 ? 2 * (args.currentElements["item-04"].progress - .15) : 1;
          $(".ct_section__benefits .benefits-item-04 div").css({
            opacity: `${opacity}`
          });

          if (args.scroll.y + headerHeight >= window.LPlensHub.lsscroll.scroll.els["item-04"].top)
              benefitsItem04.classList.add(fixed, toTop);
        }
      }
  });
});

document.addEventListener('scroll',()=>{
  lazyLo();
})

function ct_is_mobile() {
  return !($(window).width() > 1024) && (1024 !== $(window).width() || window.innerHeight > window.innerWidth)
}

function currentDevice() {
  return window.innerWidth > 1025 ? "D" : window.innerWidth < 1025 && window.innerWidth >= 768 ? "T" :  window.innerWidth < 768 ? "M" : "not recognized";
}

/* drag image clipbox */
const clipbox = document.querySelector(".ct_clipbox");
const dragger = document.querySelector(".ct_clipbox .ct_dragger");
const first   = document.querySelector(".ct_clipbox .img_primary");

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
  if(window.ct_current__device === 'M')
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


// function changeStyle(findSelector, newDeclarations) {
//   // Change original css style declaration.
//   document.styleSheets.forEach((sheet) => {
//     if (sheet.href) return;
//     const cssRulesList = sheet.cssRules;
//     cssRulesList.forEach((styleRule) => {
//       if (styleRule.selectorText === findSelector) {
//         Object.keys(newDeclarations).forEach((cssProp) => {
//           styleRule.style[cssProp] = newDeclarations[cssProp];
//         });
//       }
//     });
//   });
// }

// const styleDeclarations = {
//   'width': '200px',
//   'height': '400px',
//   'color': '#F00'
// };
// changeStyle('.paintBox', styleDeclarations);