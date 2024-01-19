


    $(window).on('load', function () {


        // Cache selectors
        var lastId,
            topMenu = $(".dash-button-navbar"),
            topMenuHeight = topMenu.outerHeight(),
            // All list items
            menuItems = topMenu.find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function () {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });

        // Bind click handler to menu items
        // so we can get a fancy scroll animation
        menuItems.click(function (e) {
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset()
                .top - 250;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 700);
            e.preventDefault();
            console.log("CLICKED")
        });

        // Bind to scroll
        $(window).scroll(function () {
            // Get container scroll position

            var fromTop = $(this).scrollTop() + topMenuHeight + 500;

            // Get id of current scroll item
            var cur = scrollItems.map(function () {
                if ($(this).offset().top < fromTop)
                    return this;
            });
            // Get the id of the current element
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                // Set/remove active class
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href='#" + id + "']").parent()
                    .addClass("active")
                    .parent().removeClass("active")


                var width = $(window).width();
                if (width <= 1200) {

                    $('.dash-button-navbar').scrollLeft(
                        $('.dash-button-navbar').animate({
                            scrollLeft: (($(
                                    '.dash-button-navbar li.active'
                                )
                                .offset().left + $(
                                    '.dash-button-navbar li.active'
                                ).outerWidth(
                                    true) /
                                2 + $(
                                    '.dash-button-navbar'
                                ).scrollLeft() -
                                $(
                                    '.dash-button-navbar'
                                ).width() / 2))
                        }, 400))

                    console.log("anchor script init")
                }
            }

        });

    });

    var width = $(window).width();
    if (width <= 769) {
        $(document).ready(function () {
            $('.fixme').addClass('affixMobile');
        });
    } else {
        $(document).ready(function () {

            var stickyOffset = $('.fixme').offset().top - 131;

            $(window).scroll(function () {
                var sticky = $('.fixme'),
                    scroll = $(window).scrollTop();

                if (scroll >= stickyOffset) sticky.addClass('affix'), $('.ct-sections').addClass(
                    "menu-affixed");
                else sticky.removeClass('affix'), $('.ct-sections').removeClass("menu-affixed");;
            });
            // $(window).bind('scroll', function () {
            //     var navHeight = $(window).height() - $('.ct-hero').offset().top;
            //     if ($(window).scrollTop() > navHeight) {
            //         $('.fixme').addClass('affix');
            //         $('.ct-sections').addClass("menu-affixed");
            //     } else {
            //         $('.fixme').removeClass('affix');
            //         $('.ct-sections').removeClass("menu-affixed");
            //     }
            // });
        });
    }




    // var distance = $('.fixme').offset().top - 130;

    // $(window).scroll(function () {

    //     if ($(window).scrollTop() >= distance) {
    //         $('.fixme').addClass("affix");
    //         $('.ct-sections').addClass("menu-affixed");

    //     } else {
    //         $('.fixme').removeClass("affix");
    //         $('.ct-sections').removeClass("menu-affixed");

    //     }
    // });


    $(".slider").on('init reInit afterChange', function (event, slick, currentSlide,
        nextSlide) {

        var $elSlide = $(slick.$slides[currentSlide]);

        var sliderObj = $elSlide.closest('.slick-slider');

        if (sliderObj.hasClass('garanzie-opticare-slider')) {
            return;
        }

        var pager = (currentSlide ? currentSlide : 0) + 1 + "/6";
        $('.page-nav').text("CURRENT SLIDE : " + pager);
    });

    $("#e-te-slider").slick({
        autoplay: false,
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                dots: true,
                arrows: true,
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 769,
            settings: {
                dots: true,
                arrows: true,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });


    $(".garanzie-opticare-slider").slick({
        autoplay: false,
        dots: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1200,
            settings: {
                dots: true,
                arrows: true,
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 769,
            settings: {
                dots: true,
                arrows: true,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    $("#shopping-slider").slick({
        autoplay: false,
        dots: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1200,
            settings: {
                dots: true,
                arrows: true,
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 769,
            settings: {
                dots: true,
                arrows: true,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });


    $('#sv-x-il-pianeta-section-slider').slick({
        autoplay: false,
        infinite: false,
        dots: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    dots: true,
                    arrows: true,
                    infinite: false,
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 769,
                settings: {
                    dots: true,
                    arrows: true,
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('#full-slider-4-cards').slick({
        autoplay: false,
        infinite: false,

        dots: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1200,
            settings: {
                dots: true,
                arrows: true,
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 769,
            settings: {
                dots: true,
                arrows: true,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('#full-slider-4-cards ul.slick-dots li').attr('role', 'tab')
    $('#full-slider-4-cards ul.slick-dots li button').removeAttr('role')



    $('.garanzie-opticare-slider').on('touchstart touchmove mousemove mouseenter',
        function (
            e) {
            $('.slider').slick('slickSetOption', 'swipe', false, false);
        });

    $('.garanzie-opticare-slider').on('touchend mouseover mouseout', function (e) {
        $('.slider').slick('slickSetOption', 'swipe', true, false);
    });

    if ($(window).width() > 769 && $(window).width() < 1200) {
        $('#benessere-visivo-section-slider').slick({
            infinite: false,
            dots: true,
            centerMode: false,
            arrows: true,
            slidesToShow: 2
        });

        $('#occhiale-completo-slider').slick({
            infinite: false,
            dots: true,
            centerMode: false,
            arrows: true,
            slidesToShow: 2
        });

        $('#parla-con-noi-section').slick({
            infinite: false,
            dots: true,
            centerMode: false,
            arrows: true,
            slidesToShow: 2
        });
    }

    if ($(window).width() < 769) {
        $('#benessere-visivo-section-slider').slick({
            infinite: false,
            dots: true,
            centerMode: false,
            arrows: true,
            slidesToShow: 1
        });

        $('#occhiale-completo-slider').slick({
            infinite: false,
            dots: true,
            centerMode: false,
            arrows: true,
            slidesToShow: 1
        });

        $('#parla-con-noi-section').slick({
            infinite: false,
            dots: true,
            centerMode: false,
            arrows: true,
            slidesToShow: 1
        });





    }

    $('#il-tuo-occhiale-section-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        swipe: false,
        asNavFor: '#il-tuo-occhiale-section-slider-nav',

    });
    $('#il-tuo-occhiale-section-slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '#il-tuo-occhiale-section-slider-for',
        dots: true,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                dots: true,
                arrows: true,
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 769,
            settings: {
                swipe: false,
                dots: false,
                arrows: false,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }]
    });





    $('#sv-experience-section-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '#sv-experience-section-slider-nav'
    });
    $('#sv-experience-section-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '#sv-experience-section-slider-for',
        dots: true,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                dots: false,
                arrows: false,
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 769,
            settings: {
                swipe: false,
                dots: false,
                arrows: false,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }]
    });


    $('a[data-slide]').click(function (e) {
        e.preventDefault();
        var slideno = $(this).data('slide');
        $('.slider-nav').slick('slickGoTo', slideno - 1);
    });



    $(window).on('load', function () {
        if (window.location.href.indexOf("garanzia-opticare") > -1) {
            $('#il-tuo-occhiale-section-slider-nav').slick('slickGoTo', 2);
            $('html, body').animate({
                scrollTop: $("#il-tuo-occhiale-section-slider-nav").offset().top - 290
            }, 500);

        } else if (window.location.href.indexOf("cura-degli-occhiali") > -1) {
            $('html, body').animate({
                scrollTop: $("#il-tuo-occhiale-section-slider-nav").offset().top - 290
            }, 500);
            $('#il-tuo-occhiale-section-slider-nav').slick('slickGoTo', 1);
        } else if (window.location.href.indexOf("occhiale-completo") > -1) {
            $('html, body').animate({
                scrollTop: $("#il-tuo-occhiale-section-slider-nav").offset().top - 290
            }, 500);
            $('#il-tuo-occhiale-section-slider-nav').slick('slickGoTo', 0);
        }


    })

    function ct_to_section(section) {
        $("html, body").stop().animate({
            scrollTop: $('#' + section).offset().top + 150
        }, 800)
    }
