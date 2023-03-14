class Slider {
  init() {
    $('.carousel').slick({
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 7000,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        //centerPadding: "10px",
        draggable: false,
        infinite: true,
        pauseOnHover: false,
        swipe: false,
        touchMove: false,
        vertical: true,
        useCSS: true,
        useTransform: true,
        accessibility: false,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    });
  }
}

export default Slider;
