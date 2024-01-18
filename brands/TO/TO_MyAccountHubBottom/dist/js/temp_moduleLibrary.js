(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var ct_icons = {
  "mute": '<svg class="ct_volume_off" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">    <path d="M28 45.7549L10.239 29.7699C9.687 29.2729 8.974 28.9999 8.232 28.9999H2V18.9999H8.232C8.974 18.9999 9.687 18.7269 10.238 18.2299L28 2.24487V13.9999H30V2.24487C30 1.44387 29.545 0.743872 28.814 0.417872C28.083 0.0918723 27.258 0.221872 26.662 0.757872L8.902 16.7429C8.717 16.9089 8.48 16.9999 8.232 16.9999H2C0.897 16.9999 0 17.8969 0 18.9999V28.9999C0 30.1029 0.897 30.9999 2 30.9999H8.232C8.48 30.9999 8.717 31.0909 8.901 31.2559L26.662 47.2409C27.04 47.5819 27.511 47.7589 27.992 47.7589C28.268 47.7589 28.547 47.7009 28.813 47.5819C29.545 47.2559 30 46.5559 30 45.7539V33.9999H28V45.7549Z" />    <path d="M35.707 18.707L34.293 17.293L29 22.586L23.707 17.293L22.293 18.707L27.586 24L22.293 29.293L23.707 30.707L29 25.414L34.293 30.707L35.707 29.293L30.414 24L35.707 18.707Z" />    </svg>    ',
  "pause": '<svg class="ct_pause" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">    <path d="M24 0C10.767 0 0 10.767 0 24C0 37.233 10.767 48 24 48C37.233 48 48 37.233 48 24C48 10.767 37.233 0 24 0ZM24 46C11.869 46 2 36.131 2 24C2 11.869 11.869 2 24 2C36.131 2 46 11.869 46 24C46 36.131 36.131 46 24 46Z" /><path d="M19 14H17V34H19V14Z" /><path d="M31 14H29V34H31V14Z" /></svg>',
  "play": '<svg class="ct_play" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 0C10.767 0 0 10.767 0 24C0 37.233 10.767 48 24 48C37.233 48 48 37.233 48 24C48 10.767 37.233 0 24 0ZM24 46C11.869 46 2 36.131 2 24C2 11.869 11.869 2 24 2C36.131 2 46 11.869 46 24C46 36.131 36.131 46 24 46Z" /><path d="M33.286 22.304L19.06 13.412C18.722 13.201 18.359 13.105 18.004 13.105C16.962 13.105 16 13.936 16 15.108V32.891C16 34.063 16.963 34.894 18.004 34.894C18.358 34.894 18.722 34.798 19.06 34.587L33.286 25.695C34.54 24.913 34.54 23.087 33.286 22.304ZM18 32.891L18.008 15.113L32.226 24L18 32.891Z" /></svg>',
  "volume": '<svg class="ct_volume_on" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.536 20.4638C33.48 21.4088 34 22.6648 34 23.9998C34 25.3348 33.48 26.5908 32.536 27.5358L33.95 28.9498C35.272 27.6268 36 25.8698 36 23.9998C36 22.1308 35.272 20.3728 33.95 19.0498L32.536 20.4638Z" /><path d="M38.192 14.8076L36.778 16.2216C38.856 18.2996 40 21.0616 40 23.9996C40 26.9376 38.856 29.6996 36.778 31.7776L38.192 33.1916C40.648 30.7356 42 27.4716 42 23.9996C42 20.5276 40.648 17.2636 38.192 14.8076Z" /><path d="M42.435 10.5649L41.021 11.9789C44.232 15.1899 46 19.4589 46 23.9999C46 28.5409 44.232 32.8099 41.021 36.0209L42.435 37.4349C46.024 33.8469 48 29.0749 48 23.9999C48 18.9249 46.024 14.1529 42.435 10.5649Z" /><path d="M28.814 0.417826C28.083 0.0908256 27.258 0.221826 26.662 0.757826L8.902 16.7428C8.717 16.9088 8.48 16.9998 8.232 16.9998H2C0.897 16.9998 0 17.8968 0 18.9998V28.9998C0 30.1028 0.897 30.9998 2 30.9998H8.232C8.48 30.9998 8.717 31.0908 8.901 31.2558L26.662 47.2408C27.04 47.5818 27.511 47.7588 27.992 47.7588C28.268 47.7588 28.547 47.7008 28.813 47.5818C29.545 47.2558 30 46.5558 30 45.7538V2.24483C30 1.44383 29.545 0.743826 28.814 0.417826ZM28 45.7548L10.239 29.7698C9.687 29.2728 8.974 28.9998 8.232 28.9998H2V18.9998H8.232C8.974 18.9998 9.687 18.7268 10.238 18.2298L28 2.24483V45.7548Z" /></svg>'
};
var ct_lazyLo = function ct_lazyLo() {
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
function ct_is_mobile() {
  if ($(window).width() > 1024) {
    return false;
  } else {
    return true;
  }
}
window.ct_is_mobile = ct_is_mobile;
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

//SEE DETAILS
function ct_seedetails() {
  console.log('SEE DETAILS');
  $('.ct_see_details__content').click(function (e) {
    e.preventDefault();
  });
  $('.ct_see_details__container button').click(function (e) {
    e.preventDefault();
    $(this).parents('.ct_see_details__container').find('.ct_see_details__close').attr('disabled') ? $(this).parents('.ct_see_details__container').find('.ct_see_details__close').removeAttr('disabled') : $(this).parents('.ct_see_details__container').find('.ct_see_details__close').attr('disabled', 'disabled');
    $(this).parents('.ct_see_details__container').find('.ct_see_details__content').toggleClass('ct_show');
  });
}

//VIDEOS

//insert video controls
function ct_set_videos_control() {
  var ct_controls_settings;
  var ct_volume;
  var ct_controls_pos;
  $('.ct_space video[data-controls="true"]').each(function () {
    $(this).parents('.ct_assets__container').addClass('ct_video_controls');
    ct_controls_settings = $(this).data('controls');
    ct_volume = $(this).data('volume');
    ct_controls_pos = $(this).data('controls-pos');
    var ct_is__playing = !$(this)[0].paused && $(this)[0].muted;
    var ct_controls = ct_build__controls(ct_controls_pos, ct_volume, ct_is__playing);
    $(this).parents('.ct_assets__container').append(ct_controls);
    $(this)[0].addEventListener('ended', function () {
      $(this).parents('.ct_assets__container').find('.ct_play_pause').removeClass('ct_playing');
    });
  });
}
function ct_build__controls(position, volume, playing) {
  var ct_video__controls = '\
        <div class="ct_video__controls ct_' + (position ? position : "right") + ' ">' + '<button class="ct_play_pause' + (playing ? "ct_playing" : "") + '">' + ct_icons.play + ct_icons.pause + '</button>' + '<button class="ct_volume_on_off ct_muted ' + (volume ? "" : "ct_disabled") + '">' + ct_icons.mute + ct_icons.volume + '</button>' + '</div>';
  return ct_video__controls;
}

//controls  play pause button on videos
function ct_play_pause__handler() {
  $('.ct_play_pause').click(function (e) {
    e.preventDefault();
    if ($(this).parents('.ct_assets__container').find('video')[0].paused) {
      $(this).addClass('ct_playing');
      $(this).parents('.ct_assets__container').find('video')[0].play();
    } else {
      $(this).removeClass('ct_playing');
      $(this).parents('.ct_assets__container').find('video')[0].pause();
    }
  });
}

//controls  mute unmute button on videos
function ct_mute_unmute__handler() {
  $('.ct_volume_on_off').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('ct_disabled')) return;
    if ($(this).parents('.ct_assets__container').find('video')[0].muted) {
      $(this).removeClass('ct_muted');
      $(this).parents('.ct_assets__container').find('video')[0].muted = false;
    } else {
      $(this).addClass('ct_muted');
      $(this).parents('.ct_assets__container').find('video')[0].muted = true;
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

  return elementBottom > viewportTop && elementTop < viewportBottom && elementBottom - viewportTop > $(this_).outerHeight() * .5 && viewportBottom - elementTop > $(this_).outerHeight() * .5;
}

//stop video if not in viewport or in slide not active
function ct_play_stop_video() {
  $('.ct_space .ct_assets__container video.lazy-loaded').each(function () {
    if ($(this)[0].muted === false && !ct_in_viewport(this) || $(this)[0].loop === true && !ct_in_viewport(this)) {
      $(this).parents('.ct_assets__container').find('.ct_play_pause').removeClass('ct_playing');
      $(this)[0].pause();
    }
    if ($(this)[0].muted && ct_in_viewport(this) && $(this).attr('data-autoplay') === 'true' && $(this)[0].paused) {
      setTimeout(function () {
        $(this).attr('data-autoplay', false);
        $(this).parents('.ct_assets__container').find('.ct_play_pause').addClass('ct_playing');
        $(this)[0].play();
      }.bind(this), 1000);
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

//service slider
function ct_services__slider() {
  if ($().slick != undefined && $('.ct_space .ct_services__list').length > 0) {
    $('.ct_space .ct_services__list').slick({
      slidesToShow: 1,
      dots: false,
      arrows: false,
      infinite: false,
      accessibility: false
    });
  }
}
function ct_set_banner_height() {
  var card = document.querySelector('.results_grid .item .catEntryThumbnail');
  if (!!card) {
    document.querySelector(':root').style.setProperty('--ct-grid-banner-height', card.offsetHeight + 'px');
  }
}
window.ct_scrollTo = ct_scroll_to_seciton;
function ct_scroll_to_seciton(elem, offset) {
  console.log(elem, offset);
  var sectionTop = document.querySelector(elem).getBoundingClientRect().top;
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: sectionTop + window.scrollY + offset
  });
}
window.ct_accordion = ct_accordion;
function ct_accordion(button) {
  var accordion_wrap = button.parentNode.querySelector('.ct_accordion__content_wrap');
  var accordion_content = accordion_wrap.querySelector('.ct_accordion__content');
  var accordion_icon = button.parentNode.querySelector('.ct_accordion__icon');
  if (accordion_wrap.clientHeight === 0) {
    accordion_wrap.style.height = "".concat(accordion_content.clientHeight, "px");
    if (accordion_icon) {
      accordion_icon.classList.add('ct_active');
    }
  } else {
    accordion_wrap.style.height = 0;
    if (accordion_icon) {
      accordion_icon.classList.remove('ct_active');
    }
  }
}
var ct_banner_in_page = false;
var ct_banner_in_page_time = 0;
$(document).ready(function () {
  ct_lazyLo();
  ct_seedetails();
  ct_set_videos_control();
  ct_set_banner_height();
  if (ct_is_mobile()) {
    ct_services__slider();
  }
  if (!(!!window.MSInputMethodContext && !!document.documentMode)) {
    ct_play_stop_video();
    ct_play_pause__handler();
    ct_mute_unmute__handler();
  }
});
$(document).scroll(function () {
  ct_lazyLo();
  if (!(!!window.MSInputMethodContext && !!document.documentMode)) {
    ct_play_stop_video();
  }
});
$(window).resize(function () {
  ct_video_resize();
  if ($('.ct_banner.ct_banner__grid').length > 0) {
    ct_set_banner_height();
  }
});

},{}]},{},[1]);
