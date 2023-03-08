

document.addEventListener('DOMContentLoaded',()=>{
    window.promo = false;
    
    $('#slider').slick({
        infinite: true,
        slidesToShow: 1,
        arrows:false,
        accessibility:false,
        rows:0,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    infinite: true,
                    slidesToShow: 2,
                    arrows:false,
                    dots: false,
                    rows:0,
                    accessibility:false
                }
            }
        ]
    })
})