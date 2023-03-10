
function currentDevice() {
    return window.innerWidth > 1025 ? "D" : window.innerWidth < 1025 && window.innerWidth >= 768 ? "T" :  window.innerWidth < 768 ? "M" : "not recognized";
}
function sticky_nav(){
    let nav = document.querySelector('.ct_nav__stick_container .ct_nav__stick_wrap');
    let nav_container = document.querySelector('.ct_nav__stick_container');
    let menu_offset = document.querySelector('.main-menu-center.navbar').clientHeight + document.querySelector('.benefitbar').clientHeight

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


document.addEventListener('DOMContentLoaded',()=>{
    window.promo = false;
    sticky_nav();
    video_manager();
})




$(document).ready(function(){
    
    $('.slider-text').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-images',
        speed: 600
    });
    $('.slider-images').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-text',
        dots: false,
        arrows: true,
        centerMode: true,
        infinite: true,
        easing: 'ease',
        //  autoplay: true,
        speed: 600,
        prevArrow: '<button type="button" class="slick-prev"><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C0 9.84974 9.84974 0 22 0C34.1503 0 44 9.84974 44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22Z" fill="#222222"/><path d="M19 30L27 22L19 14" stroke="white" stroke-width="3" stroke-linejoin="round"/></svg</button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C0 9.84974 9.84974 0 22 0C34.1503 0 44 9.84974 44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22Z" fill="#222222"/><path d="M19 30L27 22L19 14" stroke="white" stroke-width="3" stroke-linejoin="round"/></svg</button>',
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