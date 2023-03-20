import { lazyLo } from "./lazy";
import { navManger } from "./nav";
import { videoManager } from "./video";


function currentDevice() {
    return window.innerWidth > 1025 ? "D" : window.innerWidth < 1025 && window.innerWidth >= 768 ? "T" :  window.innerWidth < 768 ? "M" : "not recognized";
}





document.addEventListener('DOMContentLoaded',()=>{
    window.ct_current__device = currentDevice();
    window.promo = false;
    lazyLo();
    videoManager.init();
   
    navManger.init();

})

document.addEventListener('scroll',()=>{
  
    lazyLo();
})



$(document).ready(function(){
    
    $('.slider-text').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-images',
        speed: 600,
        dots:true,
        prevArrow: '<button type="button" class="slick-prev"><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.64672 11.8535L2.79297 5.99998L8.64672 0.146484L9.35372 0.853484L4.20747 5.99998L9.35372 11.1465L8.64672 11.8535Z" fill="#555555"/> </svg>  </button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.35348 11.8535L3.64648 11.1465L8.79273 5.99998L3.64648 0.853484L4.35348 0.146484L10.2072 5.99998L4.35348 11.8535Z" fill="#555555"/></svg> </button>',
      
    });
    $('.slider-images').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-text',
        dots: false,
        arrows: false,
        centerMode: true,
        infinite: true,
        easing: 'ease',
        autoplay: true,
        speed: 600,
      
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    arrows: false,
                    draggable: true,
                    centerPadding: '0px'
                }
            }
            
        ]
    });
    $('.slider-text .slick-dots').append(`<span> / ${ $('.slider-text .slick-dots')[0]?.childElementCount}</span>`)

});
// $('#slider').slick({
//     infinite: true,
//     slidesToShow: 1,
//     arrows:false,
//     accessibility:false,
//     rows:0,
//     responsive: [
//         {
//             breakpoint: 1025,
//             settings: {
//                 infinite: true,
//                 slidesToShow: 2,
//                 arrows:false,
//                 dots: false,
//                 rows:0,
//                 accessibility:false
//             }
//         }
//     ]
// })