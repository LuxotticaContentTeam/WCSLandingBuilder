import { navManger } from "./nav";


function currentDevice() {
    return window.innerWidth > 1025 ? "D" : window.innerWidth < 1025 && window.innerWidth >= 768 ? "T" :  window.innerWidth < 768 ? "M" : "not recognized";
}
function sticky_nav(){
    let nav = document.querySelector('.ct_nav__stick_container .ct_nav__stick_wrap');
    let nav_container = document.querySelector('.ct_nav__stick_container');
    let menu_offset = getMenuOffset();

    if (window.scrollY + menu_offset >= nav_container.offsetTop){
        if (!nav.classList.contains('ct_stick')){
            nav.classList.add('ct_stick');
        }
    }else{
        if (nav.classList.contains('ct_stick')){
            nav.classList.remove('ct_stick');
        }
       
    }
    document.addEventListener('scroll',()=>{ 
      
        if (window.scrollY + menu_offset >= nav_container.offsetTop){
            if (!nav.classList.contains('ct_stick')){
                nav.classList.add('ct_stick');
            }
        }else{
            if (nav.classList.contains('ct_stick')){
                nav.classList.remove('ct_stick');
            }
           
        }
    })
}

function video_manager(){
    let videos = document.querySelectorAll('.ct_double_content .ct_video__container');
  
    videos.forEach((elem)=>{
        elem.querySelector('video').addEventListener('canplay',(e)=>{
            elem.querySelector('video').pause();        
        },{ once: true })
        set_video_control(elem.querySelector('.ct_video__controls'),elem.querySelector('video'))
    });
}

function set_video_control(controls,video){
    controls.addEventListener('click',(e)=>{
        if (video.paused){
            if(video.readyState < 3) {
                video.load();
            }
            if(video.readyState >= 3) {
                video.play();
            } else {
                let waitVideoLoaded = setTimeout(()=>{
                    // console.log('video waiting..')
                    if(video.readyState < 3) {
                        video.load();
                    }
                    if(video.readyState >= 3) {
                      
                        video.play();
                        clearInterval(waitVideoLoaded);
                    }
                }, 250)
            }
            video.addEventListener('play',()=>{
                controls.classList.add('ct__playing')
                video.onended = ()=>{
                    controls.classList.remove('ct__playing')
                }
            },{once:true})
        }else{
            video.pause();
            controls.classList.remove('ct__playing')
        }
    })
}

function getMenuOffset(){
    return document.querySelector('.main-menu-center.navbar').clientHeight + document.querySelector('.benefitbar').clientHeight
}

function getSectionOffsets(){
    let offsets={};
    [...document.querySelectorAll('.ct_space [data-section]')].forEach(elem=>{
        offsets[elem.dataset.section] = { 
            "top" : elem.offsetTop
        };
    })
   
    return offsets
}


function ct_scroll_to_section(elem,offset){
    let sectionTop = document.querySelector(`.ct_double_content[data-section="${elem}"]`).getBoundingClientRect().top 
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: sectionTop + window.scrollY - offset
      });
}

const manual_click = {active:false,section:''};
function nav_handler(){ 
    let offset = getMenuOffset() + document.querySelector('.ct_nav__stick_wrap').clientHeight;
    console.log(offset);
    [...document.querySelectorAll('.ct_nav__container ul button')].forEach(elem=>{
        elem.addEventListener('click',()=>{
            ct_scroll_to_section(elem.dataset.sectionTo, offset - 1);
            if (document.querySelector('.ct_nav__container ul button.ct_active')){
                document.querySelector('.ct_nav__container ul button.ct_active').classList.remove("ct_active");
            }
            manual_click.active = true;
            manual_click.section = elem.dataset.sectionTo;

            elem.classList.add('ct_active');
            if (ct_current__device === 'M'){
                $('.ct_nav__stick_wrap ul').stop().animate({scrollLeft: $(elem).offset().left +   $('.ct_nav__stick_wrap ul').scrollLeft() - 8}, 500, 'linear', function() { });
            }
        })
    })
    let sectionOffset = getSectionOffsets();
    let keys =Object.keys(sectionOffset)
    console.log(keys)
    let inSection = false;

    inSection = false;
    
    
    keys.forEach((elem,i)=>{
        if (window.scrollY + offset >= sectionOffset[elem].top && window.scrollY - offset < sectionOffset[keys[i+1]]?.top ){
            inSection = true;
            if (!document.querySelector(`[data-section-to="${elem}"]`).classList.contains('ct_active')){
                if(document.querySelector('.ct_nav__container button.ct_active')){
                    document.querySelector('.ct_nav__container button.ct_active').classList.remove('ct_active');
                }
                document.querySelector(`[data-section-to="${elem}"]`).classList.add('ct_active')
                if (ct_current__device === 'M'){
                    $('.ct_nav__stick_wrap ul').stop().animate({scrollLeft: $(`[data-section-to="${elem}"]`).offset().left +   $('.ct_nav__stick_wrap ul').scrollLeft() - 8}, 500, 'linear', function() { });
                }
            }
        }
    });
    if(!inSection && document.querySelector('.ct_nav__container button.ct_active')){
        document.querySelector('.ct_nav__container button.ct_active').classList.remove('ct_active')
    }


    document.addEventListener('scroll',()=>{
        inSection = false;
        if (manual_click.active){
            console.log(window.scrollY + offset,"top:",sectionOffset[manual_click.section].top,"bottom:",sectionOffset[keys[keys.indexOf(manual_click.section)+1]].top)
            if (window.scrollY + offset  >= sectionOffset[manual_click.section].top && window.scrollY + offset <  sectionOffset[keys[keys.indexOf(manual_click.section)+1]].top ){
                manual_click.active = false
            }
        }else{
            keys.forEach((elem,i)=>{
                if (window.scrollY + offset >= sectionOffset[elem].top && window.scrollY + offset < sectionOffset[keys[i+1]]?.top ){
                    inSection = true;
                    if (!document.querySelector(`[data-section-to="${elem}"]`).classList.contains('ct_active')){
                        if(document.querySelector('.ct_nav__container button.ct_active')){
                            document.querySelector('.ct_nav__container button.ct_active').classList.remove('ct_active');
                        }
                        document.querySelector(`[data-section-to="${elem}"]`).classList.add('ct_active')
                        if (ct_current__device === 'M'){
                            $('.ct_nav__stick_wrap ul').stop().animate({scrollLeft: $(`[data-section-to="${elem}"]`).offset().left +   $('.ct_nav__stick_wrap ul').scrollLeft() - 8}, 500, 'linear', function() { });
                        }
                        
                    }
                }
            });
            if(!inSection && document.querySelector('.ct_nav__container button.ct_active')){
                document.querySelector('.ct_nav__container button.ct_active').classList.remove('ct_active')
            }
        }
    })
   
}
var ct_current__device; 
document.addEventListener('DOMContentLoaded',()=>{
    ct_current__device = currentDevice();
    window.promo = false;
    sticky_nav();
    video_manager();
    nav_handler();
    // navManger.init();

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