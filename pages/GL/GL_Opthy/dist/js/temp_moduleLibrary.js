(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function ct_is_mobile() {
  if ($(window).width() > 1024) {
    return false;
  } else {
    if ($(window).width() === 1024) {
      if (window.innerHeight > window.innerWidth) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
function ct_get__device_type() {
  if ($(window).width() >= 1024) {
    // console.log('DESK')
    return 'desk';
  } else {
    if ($(window).width() >= 768 && $(window).width() <= 1024 && window.innerHeight > window.innerWidth) {
      // console.log('TAB')
      return 'tab';
    }
    if ($(window).width() <= 1023 && window.innerHeight < window.innerWidth) {
      // console.log('MOB')
      return 'mob';
    } else {
      // console.log('MOB')
      return 'mob';
    }
  }
}
var lazyLo = function lazyLo() {
  var windowTop = $(window).scrollTop();
  $('.ct_space .lazy-lo:not(.lazy-loaded)').each(function () {
    if (windowTop > $(this).offset().top - window.innerHeight * 2) {
      if ($(this).is('video')) {
        if ($(this).attr('data-video-src-tab') == undefined) {
          if (ct_is_mobile()) {
            if ($(this).attr('data-video-src-mob') != undefined) {
              $(this).addClass('ct_m__video');
              $(this).attr('poster', $(this).attr('data-poster-mob'));
              $(this).attr('src', $(this).attr('data-video-src-mob'));
            } else {
              $(this).addClass('ct_d__video');
              $(this).attr('poster', $(this).attr('data-poster-desk'));
              $(this).attr('src', $(this).attr('data-video-src-desk'));
            }
          } else {
            if (window.document.documentMode && $(this).attr('data-poster-desk-ie') != undefined && $(this).attr('data-poster-desk-ie').length > 0) {
              //set poster for IE
              $(this).addClass('ct_ie__video');
              $(this).attr('poster', $(this).attr('data-poster-desk-ie'));
            } else {
              $(this).addClass('ct_d__video');
              $(this).attr('poster', $(this).attr('data-poster-desk'));
              $(this).attr('src', $(this).attr('data-video-src-desk'));
            }
          }
        } else {
          if (ct_get__device_type() === 'mob') {
            //mobile
            if ($(this).attr('data-video-src-mob') != undefined) {
              $(this).addClass('ct_m__video');
              $(this).attr('poster', $(this).attr('data-poster-mob'));
              $(this).attr('src', $(this).attr('data-video-src-mob'));
            } else {
              $(this).addClass('ct_d__video');
              $(this).attr('poster', $(this).attr('data-poster-desk'));
              $(this).attr('src', $(this).attr('data-video-src-desk'));
            }
          } else {
            if (ct_get__device_type() === 'tab') {
              //tablet
              $(this).addClass('ct_t__video');
              $(this).attr('poster', $(this).attr('data-poster-tab'));
              $(this).attr('src', $(this).attr('data-video-src-tab'));
            } else {
              //desktop
              if (window.document.documentMode && $(this).attr('data-poster-desk-ie') != undefined && $(this).attr('data-poster-desk-ie').length > 0) {
                //set poster for IE
                $(this).addClass('ct_ie__video');
                $(this).attr('poster', $(this).attr('data-poster-desk-ie'));
              } else {
                $(this).addClass('ct_d__video');
                $(this).attr('poster', $(this).attr('data-poster-desk'));
                $(this).attr('src', $(this).attr('data-video-src-desk'));
              }
            }
          }
        }
      } else if ($(this).is('picture')) {
        $(this).find('source').each(function () {
          $(this).attr('srcset', $(this).attr('data-image-src'));
        });
        $('img', this).attr({
          'src': $('img', this).attr('data-image-src'),
          'srcset': $('img', this).attr('data-image-srcset')
        });
      }
      if ($(this).is('img')) {
        $(this).attr('src', $(this).attr('data-image-src'));
      }
      $(this).addClass('lazy-loaded');
    }
  });
};

//controls  play pause button on videos
function ct_play_pause(e, this_) {
  e.preventDefault();
  if ($(this_).parents('.ct_assets__container').find('video')[0].paused) {
    $(this_).addClass('ct_playing');
    $(this_).parents('.ct_assets__container').find('video').removeClass('ct_paused');
    $(this_).parents('.ct_assets__container').find('video')[0].play();
  } else {
    $(this_).removeClass('ct_playing');
    $(this_).parents('.ct_assets__container').find('video').addClass('ct_paused');
    $(this_).parents('.ct_assets__container').find('video')[0].pause();
  }
}

//controls  mute unmute button on videos
function ct_mute_unmute(e, this_) {
  e.preventDefault();
  if ($(this_).parents('.ct_assets__container').find('video')[0].muted) {
    $(this_).removeClass('ct_muted');
    $(this_).parents('.ct_assets__container').find('video')[0].muted = false;
  } else {
    $(this_).addClass('ct_muted');
    $(this_).parents('.ct_assets__container').find('video')[0].muted = true;
  }
}

//insert video controls
function ct_set_videos_control() {
  var ct_play;
  var ct_volume;
  $('.ct_space video[data-controls="true"]').each(function () {
    $(this).parents('.ct_assets__container').addClass('ct_video_controls');
    ct_play = $(this).data('play').split(',');
    ct_volume = $(this).data('volume').split(',');
    if (ct_play[0] === "true") {
      if (!$(this)[0].paused && $(this)[0].muted) {
        $(this).parents('.ct_assets__container').append('<button tabindex=0 class="ct_play_pause ct_playing ct_' + ct_play[1] + '_' + ct_play[2] + ' ct__mob__' + ct_play[3] + '_' + ct_play[4] + '" onclick="ct_play_pause(event,this)" ><svg class="ct_icon ct_play" style="color:' + (ct_play[5] ? ct_play[5] : '#000') + ';"><use xlink:href="#play"></use></svg><svg class="ct_icon ct_pause" style="color:' + (ct_play[5] ? ct_play[5] : '#000') + ';"><use xlink:href="#pause"></use></svg></button>');
      } else {
        $(this).parents('.ct_assets__container').append('<button tabindex=0 class="ct_play_pause ct_' + ct_play[1] + '_' + ct_play[2] + ' ct__mob__' + ct_play[3] + '_' + ct_play[4] + '" onclick="ct_play_pause(event,this)" ><svg class="ct_icon ct_play" style="color:' + (ct_play[5] ? ct_play[5] : '#000') + ';"><use xlink:href="#play"></use></svg><svg class="ct_icon ct_pause" style="color:' + (ct_play[5] ? ct_play[5] : '#000') + ';"><use xlink:href="#pause"></use></svg></button>');
      }
      $(this)[0].addEventListener('ended', function () {
        $(this).parents('.ct_assets__container').find('.ct_play_pause').removeClass('ct_playing');
      });
    }
    if (ct_volume[0] === "true") {
      if ($(this)[0].muted) {
        $(this).parents('.ct_assets__container').append('<button tabindex=0 class="ct_volume ct_muted ct_' + ct_volume[1] + '_' + ct_volume[2] + ' ct__mob__' + ct_volume[3] + '_' + ct_volume[4] + '" onclick="ct_mute_unmute(event,this)" ><svg class="ct_icon ct_unmute" style="color:' + (ct_volume[5] ? ct_volume[5] : '#000') + ';"><use xlink:href="#volumeon"></use></svg><svg class="ct_icon ct_mute" style="color:' + (ct_volume[5] ? ct_volume[5] : '#000') + ';"><use xlink:href="#volumeoff"></use></svg></button>');
      } else {
        $(this).parents('.ct_assets__container').append('<button tabindex=0 class="ct_volume ct_' + ct_volume[1] + '_' + ct_volume[2] + ' ct__mob__' + ct_volume[3] + '_' + ct_volume[4] + '" onclick="ct_mute_unmute(event,this)" ><svg class="ct_icon ct_unmute" style="color:' + (ct_volume[5] ? ct_volume[5] : '#000') + ';"><use xlink:href="#volumeon"></use></svg><svg class="ct_icon ct_mute" style="color:' + (ct_volume[5] ? ct_volume[5] : '#000') + ';"><use xlink:href="#volumeoff"></use></svg></button>');
      }
    }
  });
}

//check if element is in viewport
function ct_in_viewport(this_) {
  var elementTop = $(this_).offset().top;
  var elementBottom = elementTop + $(this_).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  // console.log(elementBottom > viewportTop && elementTop < viewportBottom)
  // return elementBottom > viewportTop && elementTop < viewportBottom;
  if (ct_is_mobile()) {
    return elementBottom > viewportTop && elementTop < viewportBottom && elementBottom - viewportTop > $(this_).outerHeight() * .5 && viewportBottom - elementTop > $(this_).outerHeight() * .2;
  } else {
    return elementBottom > viewportTop && elementTop < viewportBottom && elementBottom - viewportTop > $(this_).outerHeight() * .5 && viewportBottom - elementTop > $(this_).outerHeight() * .5;
  }
}

//stop video if not in viewport or in slide not active
function ct_play_stop_video() {
  $('.ct_space .ct_assets__container video.lazy-loaded').each(function () {
    if ($(this)[0].muted === false && !ct_in_viewport(this) || $(this)[0].loop === true && !ct_in_viewport(this)) {
      $(this).parents('.ct_assets__container').find('.ct_play_pause').removeClass('ct_playing');
      $(this)[0].pause();
    }
    if ($(this)[0].muted && ct_in_viewport(this) && $(this).attr('data-autoplay') === 'true' && $(this)[0].paused && !$(this).hasClass('ct_paused')) {
      setTimeout(function () {
        if ($(this).parent('.ct_banner__slider').length > 0) {} else {
          if ($(this).data('restart') === undefined || $(this).data('restart') === false) {
            $(this).attr('data-autoplay', false);
          }
          $(this).parents('.ct_assets__container').find('.ct_play_pause').addClass('ct_playing');
          $(this)[0].play();
        }
      }.bind(this), 500);
    }
    if ($(this).parent('.ct_banner__slider').length > 0) {
      $(this).attr('data-autoplay', true);
      $(this).parents('.ct_assets__container').find('.ct_play_pause').removeClass('ct_playing');
      $(this)[0].pause();
    }
  });
}

//change video source from mobile to desk and viceversa
function ct_video_resize() {
  $('.ct_space .ct_assets__container video.lazy-loaded').each(function () {
    if (ct_is_mobile()) {
      if ($(this).hasClass('ct_d__video')) {
        $(this).removeClass('ct_d__video');
        $(this).addClass('ct_m__video');
        $(this).attr('src', $(this).data('video-src-mob'));
        $(this).attr('poster', $(this).data('poster-mob'));
      }
    } else {
      if ($(this).hasClass('ct_m__video')) {
        $(this).removeClass('ct_m__video');
        $(this).addClass('ct_d__video');
        $(this).attr('src', $(this).data('video-src-desk'));
        $(this).attr('poster', $(this).data('poster-desk'));
      }
    }
  });
}

//play video on slide change
function ct_video_slider() {
  $('.ct_space .slick-slider').each(function () {
    if ($(this).find('video').length > 0) {
      $(this).on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        if ($(this).find('[data-slick-index=' + nextSlide + '] video').length > 0 && $(this).find('[data-slick-index=' + nextSlide + '] video')[0].paused) {
          $(this).find('[data-slick-index=' + nextSlide + '] .ct_play_pause').addClass('ct_playing');
          $(this).find('[data-slick-index=' + nextSlide + '] video')[0].play();
        } else {}
      });
    }
  });
}
function ct_brands_slider() {
  if ($().slick != undefined) {
    $('.ct_row.ct_brands__slider').slick({
      slidesToShow: 6,
      dots: false,
      speed: 600,
      arrows: true,
      infinite: true,
      prevArrow: '<button tabindex=0 class="slick-prev" aria-label="Previous" type="button"><div><svg class="ct_icon"><use xlink:href="#arrowSX"></use></svg></div></button>',
      nextArrow: '<button tabindex=0  class="slick-next" aria-label="Previous" type="button"><div><svg class="ct_icon"><use xlink:href="#arrowDX"></use></svg></div></button>',
      responsive: [{
        breakpoint: 1441,
        settings: {
          slidesToShow: 5
        }
      }, {
        breakpoint: 1080,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '24vw'
        }
      }]
    });
  }
}
function ct_services_slider() {
  if (ct_is_mobile()) {
    if ($('.ct_row.ct_services__slider.slick-slider').length === 0) {
      if ($().slick != undefined) {
        $('.ct_row.ct_services__slider').slick({
          dots: true,
          speed: 600,
          arrows: false,
          infinite: true
        });
      }
    }
  } else {
    if ($('.ct_row.ct_services__slider.slick-slider').length > 0) {
      if ($().slick != undefined) {
        $('.ct_services__slider.slick-slider').slick('unslick');
      }
    }
  }
}

//service slider
function ct_services_myaccount__slider() {
  if ($().slick != undefined && $('.ct_space .ct_services_myAccount .ct_services__list').length > 0) {
    $('.ct_space .ct_services_myAccount .ct_services__list').slick({
      slidesToShow: 1,
      dots: false,
      arrows: false,
      infinite: false,
      accessibility: false
    });
  }
}

//needs module
function ct_needs_slider() {
  if (ct_is_mobile()) {
    if ($('.ct_row.ct_needs .ct_needs__slider.slick-slider').length === 0) {
      if ($().slick != undefined) {
        $('.ct_row.ct_needs .ct_needs__slider').slick({
          dots: true,
          speed: 600,
          arrows: false,
          infinite: false,
          responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 2
            }
          }, {
            breakpoint: 767,
            settings: {
              slidesToShow: 1
            }
          }]
        });
      }
    }
  } else {
    if ($('.ct_row.ct_needs .ct_needs__slider.slick-slider').length > 0) {
      if ($().slick != undefined) {
        $('.ct_needs__slider.slick-slider').slick('unslick');
      }
    }
  }
}
function ct_trends() {
  $('.ct_trends__select .ct_list .ct_list__item a').click(function () {
    var ct_this = $(this);
    var ct_thisID = $(ct_this).data('trends');
    var ct_slidesContainer = $(ct_this).closest('.ct_trends').find('.ct_trends__slider .ct_list');
    var ct_thisSlide = $(ct_slidesContainer).find('.ct_list__item[data-trends="' + ct_thisID + '"');
    var ct_currentSlide = $(ct_slidesContainer).find('.ct_list__item.ct_active');
    var ct_currentItem = $(ct_this).parent().parent().find('.ct_active');
    $(ct_currentSlide).removeClass('ct_active');
    $(ct_thisSlide).addClass('ct_active');
    $(ct_currentItem).removeClass('ct_active');
    $(ct_this).parent().addClass('ct_active');
  });
}
function ct_collection_slider() {
  if ($().slick != undefined) {
    $('.ct_banner__slider').slick({
      dots: true,
      speed: 600,
      prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><svg class="ct_icon"><use xlink:href="#arrowSX"></use></svg></button>',
      nextArrow: '<button class="slick-next" aria-label="Previous" type="button"><svg class="ct_icon"><use xlink:href="#arrowDX"></use></svg></button>'
    });
  }
}
var ct_show_panels = function ct_show_panels(ct_this) {
  $(ct_this).toggleClass('ct_show');
};
var ct_hide_panels = function ct_hide_panels(ct_this) {
  $(ct_this).removeClass('ct_show');
};
var ct_is_view = function ct_is_view() {
  var ct_windowTop = $(window).scrollTop();
  $('.ct_space .ct_shopimg').each(function () {
    if (ct_windowTop > $(this).offset().top + $(this).height() - window.innerHeight) {
      if (ct_windowTop < $(this).offset().top + $(this).height()) {
        if (!$(this).hasClass('ct_inview')) {
          $(this).addClass('ct_inview');
        }
      } else {
        if ($(this).hasClass('ct_inview')) {
          $(this).removeClass('ct_inview');
          $(this).find('.ct_shopimg__container').removeClass('ct_show');
        }
      }
    } else {
      if ($(this).hasClass('ct_inview')) {
        $(this).removeClass('ct_inview');
        $(this).find('.ct_shopimg__container').removeClass('ct_show');
      }
    }
  });
};
var ct_message__oos = '<strong>Coming back soon</strong> This frame is in <br>high demand';
var ct_printProducts = function ct_printProducts(ct_json__products) {
  var ct_template__shop_container = document.getElementById('ct_template__shopimg_container').innerHTML;
  var ct_template__shop_item = document.getElementById('ct_template__shopimg_item').innerHTML;
  for (var element in ct_page__products.elements) {
    var ct_shopimg__container = $('.ct_space .ct_shopimg[data-shopimg-id="' + element + '"] .ct_assets__container');
    $(ct_shopimg__container).append(ct_template__shop_container);
    var ct_shopimg__container_products = $(ct_shopimg__container).find('.ct_pin__container');
    var _loop = function _loop() {
      var ct_shopimg__pin = ct_page__products.elements[element][product];
      var ct_json__prod = ct_json__products.filter(function (e) {
        return e.upc == ct_shopimg__pin.upc;
      })[0];
      if (ct_json__prod) {
        if (ct_shopimg__pin.img_default) {
          var ct_default__img_url = 'https://assets.glasses.com/is/image/Glasses/' + ct_json__prod.upc + ct_shopimg__pin.img_default + '.png?impolicy=CT_GL_Products&width';
          var ct_hover__img_url = 'https://assets.glasses.com/is/image/Glasses/' + ct_json__prod.upc + ct_shopimg__pin.img_hover + '.png?impolicy=CT_GL_Products&width';
          $(ct_shopimg__container).find('.ct_img__default').html('\
                        <source  media="(max-width: 500px)" data-image-src="' + ct_default__img_url + '=500 1x, ' + ct_default__img_url + '=800 2x" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEElEQVQYV2M8c+bMfwYgAAAVyQNl0LG6GwAAAABJRU5ErkJggg==">\
                        <source  media="(orientation: portrait) and (max-width: 1024px)" data-image-src="' + ct_default__img_url + '=1000" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEElEQVQYV2M8c+bMfwYgAAAVyQNl0LG6GwAAAABJRU5ErkJggg==">\
                        <source  media="(orientation: landscape) and (max-width: 1023px)" data-image-src="' + ct_default__img_url + '=1000" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEElEQVQYV2M8c+bMfwYgAAAVyQNl0LG6GwAAAABJRU5ErkJggg==">\
                        <source  media="(max-width: 1400px)" data-image-src="' + ct_default__img_url + '=1000 1x, ' + ct_default__img_url + '=2000 2x" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEElEQVQYV2M8c+bMfwYgAAAVyQNl0LG6GwAAAABJRU5ErkJggg==">\
                        <img  data-image-src="' + ct_default__img_url + '=2000" data-image-srcset="' + ct_default__img_url + '?=1200 1x, ' + ct_default__img_url + '=2000 2x" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEElEQVQYV2M8c+bMfwYgAAAVyQNl0LG6GwAAAABJRU5ErkJggg==">\
                    ');
          $(ct_shopimg__container).find('.ct_img__hover').html('\
                        <source  media="(max-width: 500px)" data-image-src="' + ct_hover__img_url + '=500 1x, ' + ct_hover__img_url + '=800 2x" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEElEQVQYV2M8c+bMfwYgAAAVyQNl0LG6GwAAAABJRU5ErkJggg==">\
                        <source  media="(orientation: portrait) and (max-width: 1024px)" data-image-src="' + ct_hover__img_url + '=1000" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEElEQVQYV2M8c+bMfwYgAAAVyQNl0LG6GwAAAABJRU5ErkJggg==">\
                        <source  media="(orientation: landscape) and (max-width: 1023px)" data-image-src="' + ct_hover__img_url + '=1000" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEElEQVQYV2M8c+bMfwYgAAAVyQNl0LG6GwAAAABJRU5ErkJggg==">\
                        <source  media="(max-width: 1400px)" data-image-src="' + ct_hover__img_url + '=1000 1x, ' + ct_hover__img_url + '=2000 2x" srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEElEQVQYV2M8c+bMfwYgAAAVyQNl0LG6GwAAAABJRU5ErkJggg==">\
                        <img  data-image-src="' + ct_hover__img_url + '=2000" data-image-srcset="' + ct_hover__img_url + '?=1200 1x, ' + ct_hover__img_url + '=2000 2x" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEElEQVQYV2M8c+bMfwYgAAAVyQNl0LG6GwAAAABJRU5ErkJggg==">\
                    ');
          $(ct_shopimg__container).find('picture').addClass('lazy-lo');
        } else {
          if (ct_is_mobile()) {
            ct_position__left = ct_shopimg__pin.left.mob ? ct_shopimg__pin.left.mob : ct_shopimg__pin.left;
            ct_position__top = ct_shopimg__pin.top.mob ? ct_shopimg__pin.top.mob : ct_shopimg__pin.top;
            ct_position__panel = ct_shopimg__pin.panel_position.mob ? ct_shopimg__pin.panel_position.mob : ct_shopimg__pin.panel_position;
          } else {
            ct_position__left = ct_shopimg__pin.left.desk ? ct_shopimg__pin.left.desk : ct_shopimg__pin.left;
            ct_position__top = ct_shopimg__pin.top.desk ? ct_shopimg__pin.top.desk : ct_shopimg__pin.top;
            ct_position__panel = ct_shopimg__pin.panel_position.desk ? ct_shopimg__pin.panel_position.desk : ct_shopimg__pin.panel_position;
          }
        }

        // oos panel class
        if (ct_json__prod.unavailable === 'true') {
          ct_oos = 'ct_panel__oos';
          ct_json__prod.pdpURL = 'javascript:void(0)';
        } else {
          ct_oos = '';
        }

        // price pst
        if (ct_json__prod.promotionalFlag === 0) {
          ct_current__price = '' + ct_json__prod.price.replace(' ', '');
        } else {
          ct_current__price = ct_json__prod.price.replace(' ', '') + ' <span class="ct_price__pst">' + ct_json__prod.listPrice.replace(' ', '') + '</span>';
        }
      } else {
        ct_oos = 'ct_panel__oos_full';
        ct_current__price = '';
        ct_json__prod = {
          pdpURL: 'javascript:void(0)',
          upc: 'oos',
          brand: ''
        };
        if (ct_is_mobile()) {
          ct_position__left = ct_shopimg__pin.left.mob ? ct_shopimg__pin.left.mob : ct_shopimg__pin.left;
          ct_position__top = ct_shopimg__pin.top.mob ? ct_shopimg__pin.top.mob : ct_shopimg__pin.top;
          ct_position__panel = ct_shopimg__pin.panel_position.mob ? ct_shopimg__pin.panel_position.mob : ct_shopimg__pin.panel_position;
        } else {
          ct_position__left = ct_shopimg__pin.left.desk ? ct_shopimg__pin.left.desk : ct_shopimg__pin.left;
          ct_position__top = ct_shopimg__pin.top.desk ? ct_shopimg__pin.top.desk : ct_shopimg__pin.top;
          ct_position__panel = ct_shopimg__pin.panel_position.desk ? ct_shopimg__pin.panel_position.desk : ct_shopimg__pin.panel_position;
        }
      }
      var ct_this__item = ct_template__shop_item.replace('{{left}}', ct_position__left + '%').replace('{{top}}', ct_position__top + '%').replace('{{panel_position}}', ct_position__panel).replace('{{delay}}', Number(product) / 5 + 's').replace('{{pdpURL}}', ct_json__prod.pdpURL).replace('{{oos}}', ct_oos).replace('{{pageID}}', ct_page__products.pageID).replace('{{section}}', element).replace('{{description}}', ct_json__prod.upc).replace('{{label}}', ct_json__prod.upc + ' shop now').replace('{{brand}}', ct_json__prod.brand).replace('{{price}}', ct_current__price).replace('{{message}}', ct_message__oos);
      $(ct_shopimg__container_products).append(ct_this__item);
    };
    for (var product in ct_page__products.elements[element]) {
      var ct_position__left, ct_position__top, ct_position__panel, ct_position__left, ct_position__top, ct_position__panel, ct_oos, ct_oos, ct_current__price, ct_current__price, ct_oos, ct_current__price, ct_position__left, ct_position__top, ct_position__panel, ct_position__left, ct_position__top, ct_position__panel;
      _loop();
    }
    lazyLo();
  }
};
function ct_shopimg() {
  if (typeof ct_page__products !== 'undefined') {
    $.ajax({
      type: 'GET',
      url: ct_page__products.url,
      dataType: 'html',
      success: function success(html) {
        var ct_products = JSON.parse(html);
        ct_printProducts(ct_products.products.products.product);
        console.log('%cProducts printed', "background: green; color: white; display: inline-block; border-radius: 2px; padding: 2px 5px;");
      }
    });
    ct_is_view();
    $(document).scroll(function () {
      ct_is_view();
    });
  }
}

//lens module
function ct_lens_click() {
  var ct_current_item;
  $('.ct_lens__types button').click(function () {
    if (!$(this).hasClass('ct_active')) {
      var ct_last_video = $('.ct_row.ct_lens video.ct_active')[0];
      $('.ct_lens__types button.ct_active,.ct_assets__container video.ct_active,.ct_assets__container picture.ct_active,.ct_descriptions__container .ct_description.ct_active').removeClass('ct_active');
      ct_current_item = $(this).data('item');
      $('.ct_lens__types button[data-item="' + ct_current_item + '"],.ct_assets__container video[data-item-img="' + ct_current_item + '"],.ct_assets__container picture[data-item-img="' + ct_current_item + '"],.ct_descriptions__container .ct_description[data-item-descr="' + ct_current_item + '"]').addClass('ct_active');
      var ct_current_video = $('.ct_row.ct_lens video.ct_active')[0];
      if (ct_is_mobile()) {
        //    console.log( $(this).offset().left);
        setTimeout(function () {
          $('.ct_lens__types').stop().animate({
            scrollLeft: $(this).offset().left + $('.ct_lens__types').scrollLeft() - 24
          }, 300, 'linear', function () {});
        }.bind(this), 300);
      }
      try {
        ct_lens_onchange__playvideo(ct_last_video, ct_current_video);
      } catch (error) {
        console.log(error);
      }
    }
  });
}

/* play video in new feature opned and paused in last feature */
function ct_lens_onchange__playvideo(last_video, current_video) {
  last_video.pause();
  last_video.currentTime = 0;
  current_video.play();
}
if (ct_is_mobile()) {
  var ct_width;
  var ct_newScrollLeft;
  var ct_scrollWidth;
  var ct_offset;
  $('.ct_space .ct_lens__types').scroll(function () {
    ct_width = $(this).width();
    ct_newScrollLeft = $(this).scrollLeft();
    ct_scrollWidth = $(this).get(0).scrollWidth;
    ct_offset = 45;
    if (ct_scrollWidth - ct_newScrollLeft - ct_width < ct_offset) {
      $('.ct_row.ct_lens').addClass('ct_ended');
    } else {
      $('.ct_row.ct_lens').removeClass('ct_ended');
    }
  });
}
function ct_show__scroll_button() {
  if ($('.ct_dash_button__container').length > 0) {
    var elem = $('.ct_dash_button__container');
  }
  if (elem) {
    if (elem[0].scrollWidth - 20 > elem[0].clientWidth) {
      $('.ct_dash_button__container_wrap').addClass('ct_scrollable');
      ct_scroll_button__scroll_handler(elem);
    } else {
      $('.ct_dash_button__container_wrap').removeClass('ct_scrollable');
    }
  }
}
function ct_scroll_button__scroll_handler(elem) {
  if (elem.scrollLeft() === elem[0].scrollWidth - elem[0].clientWidth) {
    // console.log( 'HIDE DX SCROLL')
    $('.ct_scroll__button__container.ct_dx').removeClass('ct_show');
  } else {
    // console.log( 'SHOW DX SCROLL')
    $('.ct_scroll__button__container.ct_dx').addClass('ct_show');
  }
  if ($(this).scrollLeft() > 80) {
    //console.log('SHOW SX SCROLL')
    $('.ct_scroll__button__container.ct_sx').addClass('ct_show');
  } else {
    //console.log('HIDE SX SCROLL')
    $('.ct_scroll__button__container.ct_sx').removeClass('ct_show');
  }
  $(elem).on('scroll', function () {
    //    //console.log($(this).scrollLeft());

    if (elem.scrollLeft() === elem[0].scrollWidth - elem[0].clientWidth) {
      // console.log( 'HIDE DX SCROLL')
      $('.ct_scroll__button__container.ct_dx').removeClass('ct_show');
    } else {
      // console.log( 'SHOW DX SCROLL')
      $('.ct_scroll__button__container.ct_dx').addClass('ct_show');
    }
    if ($(this).scrollLeft() > 80) {
      //console.log('SHOW SX SCROLL')
      $('.ct_scroll__button__container.ct_sx').addClass('ct_show');
    } else {
      //console.log('HIDE SX SCROLL')
      $('.ct_scroll__button__container.ct_sx').removeClass('ct_show');
    }
  });
}
function ct_scroll_button__click_handler() {
  if ($('.ct_scroll__button__container .ct_scroll__button').length > 0) {
    $('.ct_scroll__button__container .ct_scroll__button').click(function () {
      if ($(this).parents('.ct_scroll__button__container').hasClass('ct_sx')) {
        $('.ct_dash_button__container').stop().animate({
          scrollLeft: 0
        }, 300, 'linear');
      }
      if ($(this).parents('.ct_scroll__button__container').hasClass('ct_dx')) {
        $('.ct_dash_button__container').stop().animate({
          scrollLeft: $('.ct_dash_button__container')[0].scrollWidth - $('.ct_dash_button__container')[0].clientWidth
        }, 300, 'linear');
      }
    });
  }
}
function ct_lens__dash_seup() {
  if ($('.ct_dash_button__container_wrap').length > 0 && $('.header-strip-global-container').length > 0 && $('.header-strip-global-container').hasClass('stick')) {
    $('.ct_dash_button__container_wrap').addClass('ct_sticky');
  }
  if ($('.ct_dash_button__container_wrap').length > 0 && $('#filterBar').length > 0) {
    $('.ct_dash_button__container_wrap').addClass('ct_filter');
  }
  if ($(window).width() > 1024) {
    ct_show__scroll_button();
    ct_scroll_button__click_handler();
  }
}

// Hide Header on scroll to section
function scroll_to_section() {
  try {
    if (window.location.hash) {
      setTimeout(function () {
        if ($(window).scrollTop() > 150) {
          $('body').addClass('inverse-translate');
        }
      }, 300);
    }
  } catch (error) {}
}

//PDP Modules

$('#ct_about_collection .ct_about_collection__title').click(function () {
  var ct_container = $(this).parent();
  var ct_content_wrap = $(this).parent().find('.ct_about_collection__content_wrap');
  var ct_content = $(this).parent().find('.ct_about_collection__content_wrap .ct_about_collection__content');
  if (ct_container.hasClass('ct_open')) {
    ct_container.removeClass('ct_open');
    ct_content_wrap.css('height', 0);
  } else {
    ct_content_wrap.css('height', ct_content.outerHeight());
    ct_container.addClass('ct_open');
  }
});
function ct_lens__slider() {
  if ($().slick != undefined) {
    $('.ct_space .ct_section__lenses_details').slick({
      slidesToShow: 1,
      dots: false,
      arrows: false,
      infinite: false,
      accessibility: false
    });
  }
}
function ct_pdp__video__slider() {
  if ($().slick != undefined && $('#ct_pdp__video_carousel').length > 0) {
    $('.ct_space #ct_pdp__video_carousel').slick({
      slidesToShow: 1,
      fade: true,
      cssEase: 'linear',
      dots: true,
      arrows: true,
      infinite: false,
      accessibility: false,
      prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><svg class="ct_icon"><use xlink:href="#arrowSX"></use></svg></button>',
      nextArrow: '<button class="slick-next" aria-label="Previous" type="button"><svg class="ct_icon"><use xlink:href="#arrowDX"></use></svg></button>',
      responsive: [{
        breakpoint: 1024,
        settings: {
          fade: false
        }
      }]
    });
    var _ct_video_slider = document.querySelector('#ct_pdp__video_carousel');
    var slides_n = $('.ct_space #ct_pdp__video_carousel').slick("getSlick").slideCount;
    _ct_video_slider.style.setProperty('--arrow-spacer', slides_n * 42 + 'px');
  }
}
$(document).ready(function () {
  lazyLo();
  scroll_to_section();
  ct_set_videos_control();
  ct_brands_slider();
  ct_services_slider();
  ct_needs_slider();
  ct_trends();
  ct_collection_slider();
  ct_shopimg();
  ct_lens_click();
  ct_lens__dash_seup();
  ct_pdp__video__slider();
  if (ct_is_mobile()) {
    ct_lens__slider();
  }
  if (!(!!window.MSInputMethodContext && !!document.documentMode)) {
    ct_play_stop_video();
  }
});
$(window).on('load', function () {
  ct_video_slider();
});
$(document).scroll(function () {
  lazyLo();
  if (!(!!window.MSInputMethodContext && !!document.documentMode)) {
    ct_play_stop_video();
  }
});
$(window).on('resize', function () {
  ct_video_resize();
  ct_services_slider();
});
if ($(window).width() > 1024) {
  $(window).on('resize', function () {
    ct_show__scroll_button();
  });
}

// Icon Sprite import CHANGE IT WHEN ON SITE
$.ajax({
  type: 'GET',
  url: "https://media.glasses.com/DesignSystem/icons/generic/sprite_2022_07_13.svg",
  dataType: 'html',
  success: function success(html) {
    $("body").append(html.replace('<svg ', '<svg style="display:none;width:0;height:0;" '));
    console.log('%cSVG sprite success', "background: green; color: white; display: inline-block; border-radius: 2px; padding: 2px 5px;");
  },
  error: function error() {
    console.log('%cSVG sprite error', "background: red; color: white; display: inline-block; border-radius: 2px; padding: 2px 5px;");
  }
});
function ct_download_hp_brand_logo() {
  $.ajax({
    type: 'GET',
    url: "https://media.glasses.com/2021/LOGOS/HP/SPRITE.svg",
    dataType: 'html',
    success: function success(html) {
      $("body").append(html.replace('<svg ', '<svg style="display:none;width:0;height:0;" '));
      console.log('%cSVG sprite success', "background: green; color: white; display: inline-block; border-radius: 2px; padding: 2px 5px;");
    },
    error: function error() {
      console.log('%cSVG sprite error', "background: red; color: white; display: inline-block; border-radius: 2px; padding: 2px 5px;");
    }
  });
}

},{}]},{},[1]);
