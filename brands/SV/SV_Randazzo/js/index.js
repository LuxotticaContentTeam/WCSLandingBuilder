document.addEventListener('DOMContentLoaded',()=>{
    if (window.matchMedia("(max-width: 992px)").matches) {

        $('#services-cards .carousel-wrapper').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            fade: false,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 968,
                settings: {
                    dots: true,
                    arrows: false,
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }

            }]
        });
    }
})