import LocomotiveScroll from "locomotive-scroll";
window.LPlens = {};

document.addEventListener("DOMContentLoaded", () => {
  window.promo = false;

  window.LPlens.lsscroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: false,
    //multiplier: 1.0,
    //getDirection: true,
  });

  window.LPlens.lsscroll.on("scroll", (args) => {
    console.log(window.LPlens.lsscroll.scroll.els);

    if (typeof args.currentElements["lens"] === "object") {
      if (args.currentElements["lens"].inView) {
        //if(args.scroll.y > 240){
        var _x = 600 - args.currentElements["lens"].progress * 1000;
        _x > 150 ? _x : (_x = 150);
        console.log("sottrazione: ", 600 - args.currentElements["lens"].progress * 1000);
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
      if (args.scroll.y >= args.currentElements["benefits"].top) {
        $("#benefits .ct_title").addClass("ct_ls__fixed");
        $("#benefits .ct_title").removeClass("ct_ls__bottom");
        $("#benefits #lens").addClass("ct_ls__fixed");
      }
      if (args.scroll.y >= args.currentElements["benefits"].bottom) {
        $("#benefits .ct_title").addClass("ct_ls__bottom");
      }
      
      if (args.scroll.y + $("#benefits .ct_title").height() >= args.currentElements["benefits"].bottom) {
        $("#benefits .ct_title").removeClass("ct_ls__fixed");
        $("#benefits .ct_title").addClass("ct_ls__bottom");
        // $("#benefits .benefits-item-01").addClass("ct_ls__bottom");
        // $("#benefits .benefits-item-02").addClass("ct_ls__bottom");
        // $("#benefits .benefits-item-03").addClass("ct_ls__bottom");
        // $("#benefits .benefits-item-04").addClass("ct_ls__bottom");
      }
      if (args.scroll.y < args.currentElements["benefits"].top) {
        $("#benefits .ct_title").removeClass("ct_ls__fixed");
        $("#benefits .ct_title").removeClass("ct_ls__bottom");
      }
      //args.currentElements['benefits'].top + $("#benefits").height()

            //GESTIOSCO L'INGRESSO DELLE SCRITTE
if (args.scroll.y >= window.LPlens.lsscroll.scroll.els["item-01"].top){
  var matrix_1 = getTranslateXY("item-01");
  console.log("matrix_1", matrix_1);
  if (matrix_1.translateY >= -600) {
    matrix_1.translateY = matrix_1.translateY - 10;
    $("#item-01").css({
      //opacity: `${args.currentElements["item-01"].progress}`,
      transform: `translateY(${matrix_1.translateY}px)`,
    });
  } else {
    var matrix_2 = getTranslateXY("item-02");
    console.log("matrix_2", matrix_2);

    if (matrix_2.translateY >= -500) {
      matrix_2.translateY = matrix_2.translateY - 10;
      $("#item-02").css({
        //opacity: `${args.currentElements["item-02"].progress}`,
        transform: `translateY(${matrix_2.translateY}px)`,
      });
    } else {
      matrix_2.translateY = -500;
      var matrix_3 = getTranslateXY("item-03");
      console.log("matrix_3", matrix_3);
      //matrix_3.translateY >= -400 ? (matrix_3.translateY = matrix_3.translateY - 5) : (matrix_3.translateY = -400);

      if (matrix_3.translateY >= -350) {
        matrix_3.translateY = matrix_3.translateY - 10;
        $("#item-03").css({
          //opacity: `${args.currentElements["item-03"].progress}`,
          transform: `translateY(${matrix_3.translateY}px)`,
        });
      }else{
        matrix_3.translateY = -350;
        var matrix_4 = getTranslateXY("item-04");
        console.log("matrix_4", matrix_4);

        if(matrix_4.translateY >= -200){
            matrix_4.translateY = matrix_4.translateY - 10;
            $("#item-04").css({
              //opacity: `${args.currentElements["item-03"].progress}`,
              transform: `translateY(${matrix_4.translateY}px)`,
            });
        }else{
            matrix_4.translateY = -200;
        }
      }
    }
  }
}
    }

    if (typeof args.currentElements["item-01"] === "object") {
      if (args.currentElements["item-01"].inView) {
        //console.log("scroll", args.scroll.y);
        //console.log("top", args.currentElements["item-01"].top);
        //if(args.scroll.y >= (args.currentElements['item-01'].top - args.currentElements['item-01'].targetEl.offsetHeight*20/100)){
        if (args.scroll.y >= args.currentElements["item-01"].top) {
          $(".benefits-item-01").addClass("ct_ls__fixed");
        }
      }
    }

    if (typeof args.currentElements["item-02"] === "object") {
      if (args.currentElements["item-02"].inView) {
        if (args.scroll.y >= window.LPlens.lsscroll.scroll.els["item-02"].top) {
          $(".benefits-item-02").addClass("ct_ls__fixed");
        }
      }
    }
    if (typeof args.currentElements["item-03"] === "object") {
      if (args.currentElements["item-03"].inView) {
        let el = getHeight("item-03");
        if (args.scroll.y >= window.LPlens.lsscroll.scroll.els["item-03"].top) {
          $(".benefits-item-03").addClass("ct_ls__fixed");
          $(".benefits-item-03").removeClass("ct_ls__bottom");
        }
      }
    }
    if (typeof args.currentElements["item-04"] === "object") {
        if (args.currentElements["item-04"].inView) {
          let el = getHeight("item-04");
          if (args.scroll.y >= window.LPlens.lsscroll.scroll.els["item-04"].top) {
            $(".benefits-item-04").addClass("ct_ls__fixed");
            $(".benefits-item-04").removeClass("ct_ls__bottom");
          }
        }
      }
  });

});

function getHeight(element) {
  var t, h;
  t = window.LPlens.lsscroll.scroll.els[element].top;
  h = window.LPlens.lsscroll.scroll.els[element].el.offsetHeight;
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


// window.ct_lpHeritage.lsscroll_sections.heritage.on("scroll", function(e) {
//     for (var t in e.currentElements) {
//         var i, r, s, o, n, l;
//         "heritage-counter" === t && (o = "M" === window.ct_lpHeritage.data.device ? e.scroll.y : e.scroll.x,
//         r = "M" === window.ct_lpHeritage.data.device ? e.currentElements[t].top : e.currentElements[t].left,
//         s = "M" === window.ct_lpHeritage.data.device ? e.currentElements[t].bottom - window.ct_lpHeritage.data.sizes.h : e.currentElements[t].right - window.ct_lpHeritage.data.sizes.w,
//         o < r && document.querySelector(".ct_heritage-timeline-current").innerHTML !== a.toString() ? document.querySelector(".ct_heritage-timeline-current span").innerHTML = a : r <= o && o < s ? (document.querySelector(".ct_heritage-timeline-current span").innerHTML = a - Math.ceil((o - r) * c / (s - r)),
//         document.querySelector(".ct_c-scrollbar").classList.contains("ct_show") && document.querySelector(".ct_c-scrollbar").classList.remove("ct_show")) : s <= o && document.querySelector(".ct_heritage-timeline-current").innerHTML !== 1917..toString() && (document.querySelector(".ct_heritage-timeline-current span").innerHTML = 1917,
//         document.querySelector(".ct_c-scrollbar").classList.add("ct_show"))),
//         "M" === window.ct_lpHeritage.data.device && (e.currentElements[t].el.classList.contains("ct_stk__mb") && (r = e.currentElements[t].top,
//         s = e.currentElements[t].bottom - window.ct_lpHeritage.data.sizes.h,
//         e.currentElements[t].el.classList.contains("ct_heritage-timeline-counter") ? i = e.currentElements[t].el.querySelector(".ct_heritage-timeline-current") : (e.currentElements[t].el.classList.contains("ct_overlay-content-section") || e.currentElements[t].el.classList.contains("ct_overlay-next")) && (i = e.currentElements[t].el.querySelector(".ct_overlay-content-section-sticky"),
//         r = e.currentElements[t].top - (window.ct_lpHeritage.data.sizes.h - i.offsetHeight),
//         s = e.currentElements[t].bottom - window.ct_lpHeritage.data.sizes.h),
//         e.scroll.y < r ? i.classList.contains("ct_ls__fixed") && i.classList.remove("ct_ls__fixed") : e.scroll.y >= r && e.scroll.y <= s ? i.classList.contains("ct_ls__fixed") || (i.classList.add("ct_ls__fixed"),
//         i.classList.contains("ct_ls__bottom") && i.classList.remove("ct_ls__bottom")) : e.scroll.y > s - window.ct_lpHeritage.data.sizes.h && i.classList.contains("ct_ls__fixed") && (i.classList.remove("ct_ls__fixed"),
//         i.classList.contains("ct_ls__bottom") || i.classList.add("ct_ls__bottom"))),
//         e.currentElements[t].el.classList.contains("ct_heritage-timeline-counter") && (e.scroll.y < e.currentElements[t].top && document.querySelector(".ct_nav-back").classList.contains("ct_show_bg") ? document.querySelector(".ct_nav-back").classList.remove("ct_show_bg") : e.scroll.y >= e.currentElements[t].top && !document.querySelector(".ct_nav-back").classList.contains("ct_show_bg") && document.querySelector(".ct_nav-back").classList.add("ct_show_bg"))),
//         e.currentElements[t].el.classList.contains("ct_onenter") && (o = e.currentElements[t].el.querySelector(".ct_overlay-content-section-text"),
//         l = "M" === window.ct_lpHeritage.data.device ? e.currentElements[t].top - .8 * window.ct_lpHeritage.data.sizes.h : e.currentElements[t].left - .8 * window.ct_lpHeritage.data.sizes.w,
//         n = e.currentElements[t].el.querySelector(".ct_overlay-content-section-imgs"),
//         t = "M" === window.ct_lpHeritage.data.device ? e.currentElements[t].top - .8 * window.ct_lpHeritage.data.sizes.h + o.offsetHeight : e.currentElements[t].left - .8 * window.ct_lpHeritage.data.sizes.w + o.offsetWidth,
//         l <= (l = "M" === window.ct_lpHeritage.data.device ? e.scroll.y : e.scroll.x) && (o.classList.contains("ct_entered") || o.classList.add("ct_entered")),
//         t <= l && (n.classList.contains("ct_entered") || n.classList.add("ct_entered")))
//     }
//     document.querySelector(".c-scrollbar").style.width = 20 + 80 * e.scroll.y / (document.querySelector(".ct_main-overlay").offsetHeight - window.ct_lpHeritage.data.sizes.h) + "%"
// })
// }
// }]),

// window.ct_lpHeritage.lsscroll_sections.icons.on("scroll", function(e) {
//     for (var t in e.currentElements) {
//         var i, r, s;
//         "icons-hero" === t && (e.scroll.x >= e.currentElements[t].right - .1 * window.ct_lpHeritage.data.sizes.w ? document.querySelector(".ct_c-scrollbar").classList.contains("ct_show") || document.querySelector(".ct_c-scrollbar").classList.add("ct_show") : e.scroll.x < e.currentElements[t].right && document.querySelector(".ct_c-scrollbar").classList.contains("ct_show") && document.querySelector(".ct_c-scrollbar").classList.remove("ct_show")),
//         "M" === window.ct_lpHeritage.data.device && (e.currentElements[t].el.classList.contains("ct_stk__mb") && (r = e.currentElements[t].top,
//         s = e.currentElements[t].bottom - window.ct_lpHeritage.data.sizes.h,
//         e.currentElements[t].el.classList.contains("ct_heritage-timeline-counter") ? i = e.currentElements[t].el.querySelector(".ct_heritage-timeline-current") : (e.currentElements[t].el.classList.contains("ct_overlay-content-section") || e.currentElements[t].el.classList.contains("ct_overlay-next")) && (i = e.currentElements[t].el.querySelector(".ct_overlay-content-section-sticky"),
//         r = e.currentElements[t].top - (window.ct_lpHeritage.data.sizes.h - i.offsetHeight),
//         s = e.currentElements[t].bottom - window.ct_lpHeritage.data.sizes.h),
//         e.scroll.y < r ? i.classList.contains("ct_ls__fixed") && i.classList.remove("ct_ls__fixed") : e.scroll.y >= r && e.scroll.y <= s ? i.classList.contains("ct_ls__fixed") || (i.classList.add("ct_ls__fixed"),
//         i.classList.contains("ct_ls__bottom") && i.classList.remove("ct_ls__bottom")) : e.scroll.y > s - window.ct_lpHeritage.data.sizes.h && i.classList.contains("ct_ls__fixed") && (i.classList.remove("ct_ls__fixed"),
//         i.classList.contains("ct_ls__bottom") || i.classList.add("ct_ls__bottom"))),
//         e.currentElements[t].el.classList.contains("ct_heritage-timeline-counter") && (e.scroll.y < e.currentElements[t].top && document.querySelector(".ct_nav-back").classList.contains("ct_show_bg") ? document.querySelector(".ct_nav-back").classList.remove("ct_show_bg") : e.scroll.y >= e.currentElements[t].top && !document.querySelector(".ct_nav-back").classList.contains("ct_show_bg") && document.querySelector(".ct_nav-back").classList.add("ct_show_bg")))
//     }
// })

// window.ct_lpHeritage.lsscroll.on("scroll",function(e)
// {if("home"===window.ct_lpHeritage.data.currentPage&&"object"===(0,l.default)
// (e.currentElements["page-home"]))
// for(var t in e.currentElements)
// {var i,r,s,o,n;
//     t.includes("our-history")||t.includes("-bg")||t.startsWith("homesec-")&&("pt_1"===window.ct_lpHeritage.data.hp.fbf_frames_full[t].frame_pt?e.scroll.y<=e.currentElements[t].bottom-.2*window.ct_lpHeritage.lsscroll.scroll.windowHeight&&e.scroll.y>=e.currentElements[t].top-window.ct_lpHeritage.lsscroll.scroll.windowHeight&&(r=(r="00000"+(i=window.ct_lpHeritage.data.hp.fbf_frames_full[t].frame_start+Math.round(window.ct_lpHeritage.data.hp.fbf_frames_full[t].frames*(e.scroll.y-(e.currentElements[t].top-window.ct_lpHeritage.lsscroll.scroll.windowHeight))/(e.currentElements[t].bottom-.2*window.ct_lpHeritage.lsscroll.scroll.windowHeight-(e.currentElements[t].top-window.ct_lpHeritage.lsscroll.scroll.windowHeight))))).substr(r.length-5),i>=window.ct_lpHeritage.data.hp.pt_1_frames&&!document.querySelector(".ct_fbf__pt_1 .ct_fbf__cont .last_active")?document.querySelector(".ct_fbf__pt_1 .ct_fbf__cont").lastChild.classList.add("last_active"):i<window.ct_lpHeritage.data.hp.pt_1_frames&&document.querySelector(".ct_fbf__pt_1 .ct_fbf__cont .last_active")&&document.querySelector(".ct_fbf__pt_1 .ct_fbf__cont").lastChild.classList.remove("last_active"),document.querySelector(".ct_fbf__pt_1 .ct_fbf__cont .fbf-"+r+" .ct_fbf__loaded")&&(document.querySelector(".ct_fbf__pt_1 .ct_fbf__cont div.active")&&document.querySelector(".ct_fbf__pt_1 .ct_fbf__…

//     window.ct_lpHeritage.lsscroll_sections.heritage.on("scroll", function(e) {
//         for (var t in e.currentElements) {
//             var i, r, s, o, n, l;
//             "heritage-counter" === t && (o = "M" === window.ct_lpHeritage.data.device ? e.scroll.y : e.scroll.x,
//             r = "M" === window.ct_lpHeritage.data.device ? e.currentElements[t].top : e.currentElements[t].left,
//             s = "M" === window.ct_lpHeritage.data.device ? e.currentElements[t].bottom - window.ct_lpHeritage.data.sizes.h : e.currentElements[t].right - window.ct_lpHeritage.data.sizes.w,
//             o < r && document.querySelector(".ct_heritage-timeline-current").innerHTML !== a.toString() ? document.querySelector(".ct_heritage-timeline-current span").innerHTML = a : r <= o && o < s ? (document.querySelector(".ct_heritage-timeline-current span").innerHTML = a - Math.ceil((o - r) * c / (s - r)),
//             document.querySelector(".ct_c-scrollbar").classList.contains("ct_show") && document.querySelector(".ct_c-scrollbar").classList.remove("ct_show")) : s <= o && document.querySelector(".ct_heritage-timeline-current").innerHTML !== 1917..toString() && (document.querySelector(".ct_heritage-timeline-current span").innerHTML = 1917,
//             document.querySelector(".ct_c-scrollbar").classList.add("ct_show"))),
//             "M" === window.ct_lpHeritage.data.device && (e.currentElements[t].el.classList.contains("ct_stk__mb") && (r = e.currentElements[t].top,
//             s = e.currentElements[t].bottom - window.ct_lpHeritage.data.sizes.h,
//             e.currentElements[t].el.classList.contains("ct_heritage-timeline-counter") ? i = e.currentElements[t].el.querySelector(".ct_heritage-timeline-current") : (e.currentElements[t].el.classList.contains("ct_overlay-content-section") || e.currentElements[t].el.classList.contains("ct_overlay-next")) && (i = e.currentElements[t].el.querySelector(".ct_overlay-content-section-sticky"),
//             r = e.currentElements[t].top - (window.ct_lpHeritage.data.sizes.h - i.offsetHeight),
//             s = e.currentElements[t].bottom - window.ct_lpHeritage.data.sizes.h),
//             e.scroll.y < r ? i.classList.contains("ct_ls__fixed") && i.classList.remove("ct_ls__fixed") : e.scroll.y >= r && e.scroll.y <= s ? i.classList.contains("ct_ls__fixed") || (i.classList.add("ct_ls__fixed"),
//             i.classList.contains("ct_ls__bottom") && i.classList.remove("ct_ls__bottom")) : e.scroll.y > s - window.ct_lpHeritage.data.sizes.h && i.classList.contains("ct_ls__fixed") && (i.classList.remove("ct_ls__fixed"),
//             i.classList.contains("ct_ls__bottom") || i.classList.add("ct_ls__bottom"))),
//             e.currentElements[t].el.classList.contains("ct_heritage-timeline-counter") && (e.scroll.y < e.currentElements[t].top && document.querySelector(".ct_nav-back").classList.contains("ct_show_bg") ? document.querySelector(".ct_nav-back").classList.remove("ct_show_bg") : e.scroll.y >= e.currentElements[t].top && !document.querySelector(".ct_nav-back").classList.contains("ct_show_bg") && document.querySelector(".ct_nav-back").classList.add("ct_show_bg"))),
//             e.currentElements[t].el.classList.contains("ct_onenter") && (o = e.currentElements[t].el.querySelector(".ct_overlay-content-section-text"),
//             l = "M" === window.ct_lpHeritage.data.device ? e.currentElements[t].top - .8 * window.ct_lpHeritage.data.sizes.h : e.currentElements[t].left - .8 * window.ct_lpHeritage.data.sizes.w,
//             n = e.currentElements[t].el.querySelector(".ct_overlay-content-section-imgs"),
//             t = "M" === window.ct_lpHeritage.data.device ? e.currentElements[t].top - .8 * window.ct_lpHeritage.data.sizes.h + o.offsetHeight : e.currentElements[t].left - .8 * window.ct_lpHeritage.data.sizes.w + o.offsetWidth,
//             l <= (l = "M" === window.ct_lpHeritage.data.device ? e.scroll.y : e.scroll.x) && (o.classList.contains("ct_entered") || o.classList.add("ct_entered")),
//             t <= l && (n.classList.contains("ct_entered") || n.classList.add("ct_entered")))
//         }
//         document.querySelector(".c-scrollbar").style.width = 20 + 80 * e.scroll.y / (document.querySelector(".ct_main-overlay").offsetHeight - window.ct_lpHeritage.data.sizes.h) + "%"
//     })
// }




            //GESTIOSCO L'INGRESSO DELLE SCRITTE
            if (args.scroll.y >= window.LPlens.lsscroll.scroll.els["item-01"].top){
  
              var matrix_1 = getTranslateXY("item-01");
              if (matrix_1.translateY >= -600) {
                matrix_1.translateY = matrix_1.translateY - 10;
                $("#item-01").css({
                  //opacity: `${args.currentElements["item-01"].progress}`,
                  transform: `translateY(${matrix_1.translateY}px)`,
                });
              } else {
                var matrix_2 = getTranslateXY("item-02");
                //console.log("matrix_2", matrix_2);
            
                if (matrix_2.translateY >= -500) {
                  matrix_2.translateY = matrix_2.translateY - 10;
                  $("#item-02").css({
                    //opacity: `${args.currentElements["item-02"].progress}`,
                    transform: `translateY(${matrix_2.translateY}px)`,
                  });
                } else {
                  matrix_2.translateY = -500;
                  var matrix_3 = getTranslateXY("item-03");
                  //console.log("matrix_3", matrix_3);
                  //matrix_3.translateY >= -400 ? (matrix_3.translateY = matrix_3.translateY - 5) : (matrix_3.translateY = -400);
            
                  if (matrix_3.translateY >= -350) {
                    matrix_3.translateY = matrix_3.translateY - 10;
                    $("#item-03").css({
                      //opacity: `${args.currentElements["item-03"].progress}`,
                      transform: `translateY(${matrix_3.translateY}px)`,
                    });
                  }else{
                    matrix_3.translateY = -350;
                    var matrix_4 = getTranslateXY("item-04");
                    //console.log("matrix_4", matrix_4);
            
                    if(matrix_4.translateY >= -200){
                        matrix_4.translateY = matrix_4.translateY - 10;
                        $("#item-04").css({
                          //opacity: `${args.currentElements["item-03"].progress}`,
                          transform: `translateY(${matrix_4.translateY}px)`,
                        });
                    }else{
                        matrix_4.translateY = -200;
                    }
                  }
                }
              }
            }