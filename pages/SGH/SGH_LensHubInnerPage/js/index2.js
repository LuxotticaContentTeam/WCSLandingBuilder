import LocomotiveScroll from "locomotive-scroll";
import Slider from "./slider";
import Video from "./video";

window.LPlensHub = {};
const headerHeight = 95;

document.addEventListener("DOMContentLoaded", () => {
  window.promo = false;

 //init locomotive
  window.LPlensHub.lsscroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: false,
  });

  //init slider
  new Slider().init();
  
  //init video
  new Video().init();
  
  window.LPlensHub.lsscroll.on("scroll", (args) => {
    console.log(window.LPlensHub.lsscroll.scroll.els);
    console.log(args);

    if (typeof args.currentElements["lens"] === "object") {
      if (args.currentElements["lens"].inView) {
        //if(args.scroll.y > 240){
        var _x = 600 - args.currentElements["lens"].progress * 1000;
        _x > 150 ? _x : (_x = 150);
        //console.log("sottrazione: ", 600 - args.currentElements["lens"].progress * 1000);
        $("#lens").css({
          transform: `translateX(${_x}px)`,
          //"transform": `translateX(${400 - (args.currentElements['lens'].progress*500)}px)`
        });
        //}
      }
      // Get all current elements : args.currentElements
      //let progress = args.currentElements['one'].progress;
      //console.log(progress);
      // if(progress > 0.4){

      // }
    }

    if (typeof args.currentElements["benefits"] === "object") {
      console.log("scroll + height", args.scroll.y + headerHeight);
      console.log("top:", args.currentElements["benefits"].top);

      if (args.scroll.y + headerHeight >= args.currentElements["benefits"].top) {
        console.log("opzione 1");
        $("#benefits .ct_title").addClass("ct_ls__fixed ct_ls__top");
        $("#benefits .ct_title").removeClass("ct_ls__bottom");
        $("#benefits #lens").addClass("ct_ls__fixed");
        $("#benefits #lens").removeClass("ct_ls__bottom");

         if(isScrollingDown()){
           console.log("scroll + height scroll down")
          if (args.scroll.y >= window.LPlensHub.lsscroll.scroll.els["item-01"].top)
             $("#benefits .benefits-item-01").addClass("ct_ls__fixed ct_ls__top opzione1-down").removeClass("ct_ls__bottom");
          else
              $("#benefits .benefits-item-01").removeClass("ct_ls__fixed ct_ls__top opzione1-down").removeClass("ct_ls__bottom");
           
          if (args.scroll.y >= window.LPlensHub.lsscroll.scroll.els["item-02"].top)
              $("#benefits .benefits-item-02").addClass("ct_ls__fixed ct_ls__top opzione1-down").removeClass("ct_ls__bottom");
          else
              $("#benefits .benefits-item-02").removeClass("ct_ls__fixed ct_ls__top opzione1-down").removeClass("ct_ls__bottom");

           $("#benefits .benefits-item-03").addClass("ct_ls__fixed ct_ls__top opzione1-down").removeClass("ct_ls__bottom");
           $("#benefits .benefits-item-04").addClass("ct_ls__fixed ct_ls__top opzione1-down").removeClass("ct_ls__bottom");
         }
      }
      if (args.scroll.y + headerHeight >= args.currentElements["benefits"].bottom) {
        console.log("args.scroll.y + headerHeight >= args.currentElements['benefits'].bottom")
        $("#benefits .ct_title").addClass("ct_ls__bottom");
        $("#benefits #lens").addClass("ct_ls__bottom");
      }
      
      if (args.scroll.y + $("#benefits .ct_title").height() >= args.currentElements["benefits"].bottom) {
        console.log("args.scroll.y + $('#benefits .ct_title').height()");

        $("#benefits .ct_title").removeClass("ct_ls__fixed");
        $("#benefits .ct_title").addClass("ct_ls__bottom");

        //$("#benefits #lens").removeClass("ct_ls__fixed");
         $("#benefits .benefits-item-01").removeClass("ct_ls__fixed ct_ls__top");
         $("#benefits .benefits-item-02").removeClass("ct_ls__fixed ct_ls__top");
         $("#benefits .benefits-item-03").removeClass("ct_ls__fixed ct_ls__top");
         $("#benefits .benefits-item-04").removeClass("ct_ls__fixed ct_ls__top");
         $("#benefits .benefits-item-01").addClass("ct_ls__bottom");
         $("#benefits .benefits-item-02").addClass("ct_ls__bottom");
         $("#benefits .benefits-item-03").addClass("ct_ls__bottom");
         $("#benefits .benefits-item-04").addClass("ct_ls__bottom");
      }

      if (args.scroll.y + headerHeight < args.currentElements["benefits"].top) {
        console.log("args.scroll.y + headerHeight < args.currentElements['benefits].top");
        $("#benefits .ct_title").removeClass("ct_ls__fixed");
        $("#benefits .ct_title").removeClass("ct_ls__bottom");
        $("#benefits #lens").removeClass("ct_ls__fixed");
        $("#benefits #lens").removeClass("ct_ls__bottom");

        if(isScrollingDown()){
          $("#benefits .benefits-item-02").removeClass("ct_ls__fixed ct_ls__top ct_ls__bottom");
          $("#benefits .benefits-item-03").removeClass("ct_ls__fixed ct_ls__top ct_ls__bottom");
          $("#benefits .benefits-item-04").removeClass("ct_ls__fixed ct_ls__top ct_ls__bottom");
        }
      }
      //args.currentElements['benefits'].top + $("#benefits").height()

    }

    if (typeof args.currentElements["item-01"] === "object") {
      if (args.currentElements["item-01"].inView) {
        console.log("scroll", args.scroll.y);
        console.log("top", args.currentElements["item-01"].top);
        //if(args.scroll.y >= (args.currentElements['item-01'].top - args.currentElements['item-01'].targetEl.offsetHeight*20/100)){
       //   e.scroll.y <= e.currentElements["item-01"].bottom - .2 * window.ct_lpHeritage.lsscroll.scroll.windowHeight && e.scroll.y >= e.currentElements[t].top - window.ct_lpHeritage.lsscroll.scroll.windowHeight && (r = (r = "00000" + (i = window.ct_lpHeritage.data.hp.fbf_frames_full[t].frame_start + Math.round(window.ct_lpHeritage.data.hp.fbf_frames_full[t].frames * (e.scroll.y - (e.currentElements[t].top - window.ct_lpHeritage.lsscroll.scroll.windowHeight)) / (e.currentElements[t].bottom - .2 * window.ct_lpHeritage.lsscroll.scroll.windowHeight - (e.currentElements[t].top - window.ct_lpHeritage.lsscroll.scroll.windowHeight))))).substr(r.length - 5),
        if (args.scroll.y >= args.currentElements["item-01"].top) {
          if(isScrollingDown())
            $(".benefits-item-01").addClass("ct_ls__fixed ct_ls__top scroll-down-andata");
        }
        if(args.scroll.y <= args.currentElements["item-01"].top){
          if(!isScrollingDown())
            $(".benefits-item-01").removeClass("ct_ls__fixed ct_ls__top scroll-up-ritorno");
        }
      }
    }

    if (typeof args.currentElements["item-02"] === "object") {
      if (args.currentElements["item-02"].inView) {
        if (args.scroll.y >= window.LPlensHub.lsscroll.scroll.els["item-02"].top) {
          if(isScrollingDown())
            $(".benefits-item-02").addClass("ct_ls__fixed ct_ls__top scroll-down-andata");
        }
        if(args.scroll.y <= args.currentElements["item-02"].top){
          if(!isScrollingDown())
            $(".benefits-item-02").removeClass("ct_ls__fixed ct_ls__top scroll-up-ritorno");
        }
      }
    }
    if (typeof args.currentElements["item-03"] === "object") {
      if (args.currentElements["item-03"].inView) {
        let el = getHeight("item-03");
        if (args.scroll.y >= window.LPlensHub.lsscroll.scroll.els["item-03"].top) {
          if(isScrollingDown())
            $(".benefits-item-03").addClass("ct_ls__fixed ct_ls__top scroll-down-andata");
          //$(".benefits-item-03").removeClass("ct_ls__bottom");
        }
        if(args.scroll.y <= args.currentElements["item-03"].top){
          if(!isScrollingDown())
            $(".benefits-item-03").removeClass("ct_ls__fixed ct_ls__top scroll-up-ritorno");
        }
      }
    }
    if (typeof args.currentElements["item-04"] === "object") {
        if (args.currentElements["item-04"].inView) {
          let el = getHeight("item-04");
          if (args.scroll.y >= window.LPlensHub.lsscroll.scroll.els["item-04"].top) {
            if(isScrollingDown())
              $(".benefits-item-04").addClass("ct_ls__fixed ct_ls__top scroll-down-andata");
            //$(".benefits-item-04").removeClass("ct_ls__bottom");
          }
        }
        if(args.scroll.y <= args.currentElements["item-04"].top){
          if(!isScrollingDown())
            $(".benefits-item-04").removeClass("ct_ls__fixed ct_ls__top scroll-up-ritorno");
        }
      }
  });

});

function getHeight(element) {
  var t, h;
  t = window.LPlensHub.lsscroll.scroll.els[element].top;
  h = window.LPlensHub.lsscroll.scroll.els[element].el.offsetHeight;
  return {
    t: t,
    h: h,
  };
}

function getTranslateXY(element) {
  var myEl = document.getElementById(element);
  const style = window.getComputedStyle(myEl);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    translateX: matrix.m41,
    translateY: matrix.m42,
  };
}

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