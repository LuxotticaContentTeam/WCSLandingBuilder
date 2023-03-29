class Slider {
  init() {
    $('.ct_carousel').slick({
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        centerMode: true,
        //centerPadding: "10px",
        draggable: false,
        infinite: true,
        pauseOnHover: false,
        swipe: false,
        touchMove: false,
        vertical: true,
        useCSS: true,
        useTransform: false,
        accessibility: false,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    });
    this.set_slider_control();
  }
  set_slider_control(){
    let controls = document.querySelector('.ct_section__best-usage .ct_wrapper__carousel .ct_video__controls');
    controls.addEventListener('click', (e)=>{
      if(controls.classList.contains("ct__playing")){
        $('.ct_carousel').slick('slickPause');
        controls.classList.remove('ct__playing');
      }
      else{
        $('.ct_carousel').slick('slickPlay');
        controls.classList.add('ct__playing')
      }
    });
  }
}

export default Slider;
