import { lazyLo } from "./lazy";
import { navManger } from "./nav";
import { videoManager } from "./video";


function currentDevice() {
    return window.innerWidth > 1025 ? "D" : window.innerWidth < 1025 && window.innerWidth >= 768 ? "T" :  window.innerWidth < 768 ? "M" : "not recognized";
}

function entryHero(){

}

function  entryAnim(){
    for (const [key, value] of Object.entries(navManger.sectionsTopOffest)) {
        if(window.scrollY + Math.floor(window.innerHeight/100*80) - value.top > 0 && !document.querySelector(`[data-section="${key}"]`).classList.contains('ct_in')){
            document.querySelector(`[data-section="${key}"]`).classList.add('ct_in')
        }
      
    }
}



document.addEventListener('DOMContentLoaded',()=>{
    window.ct_current__device = currentDevice();
    
    window.promo = false;


    window.navManger = navManger
    entryHero();
    lazyLo();
    videoManager.init();
    navManger.init();
    entryAnim()

})

document.addEventListener('scroll',()=>{
    
    lazyLo();
    entryAnim();
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
        rows:0,
        autoplay: true,
        prevArrow: '<button type="button" class="slick-prev"><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.64672 11.8535L2.79297 5.99998L8.64672 0.146484L9.35372 0.853484L4.20747 5.99998L9.35372 11.1465L8.64672 11.8535Z" fill="#555555"/> </svg>  </button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.35348 11.8535L3.64648 11.1465L8.79273 5.99998L3.64648 0.853484L4.35348 0.146484L10.2072 5.99998L4.35348 11.8535Z" fill="#555555"/></svg> </button>',
      
    });
    $('.slider-images').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-text',
        dots: false,
        arrows: false,
        centerMode: true,
        infinite: true,
        easing: 'ease',
      
        speed: 600,
        centerPadding: '28%',
        rows:0,
        
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    arrows: false,
                    draggable: true,
                    centerPadding: '22%',
                }
            }
            
        ]
    });

    
    // Add custom class to next or previous slide depending on change direction
    $('.slider-images').on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        let nextIndex = currentSlide + 1; // assume moving right
        if(currentSlide-1 == nextSlide || (nextSlide+1 == slick.slideCount && currentSlide < nextSlide)) {
            nextIndex = currentSlide - 1; // nope, moving left
        }
        $(`[data-slick-index="${nextIndex}"]`).addClass('slick-target');
    });

    // clear custom class after transition
    $('.slider-images').on('afterChange', () => {
        $('.slick-slide').removeClass('slick-target');
    });
    $('.slider-text .slick-dots').append(`<li class="ct_slide_count"><button> / ${ $('.slider-text .slick-dots')[0]?.childElementCount}</button></li>`)


    let sliderPlayPause = document.querySelector('.ct_slider__controls');
    if (sliderPlayPause){
        sliderPlayPause.addEventListener('click',()=>{
            if(sliderPlayPause.classList.contains('ct__playing')){
                sliderPlayPause.classList.remove('ct__playing');
                $('.slider-text').slick('slickSetOption', 'autoplay', false).slick('slickPause');
            }else{
                sliderPlayPause.classList.add('ct__playing');
                $('.slider-text').slick('slickSetOption', 'autoplay', true).slick('slickPlay');
            }
        })
    }
  
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