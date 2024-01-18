let checkSubScription = (function () {
  let init = () => {
    console.log(sessionStorage.getItem('subscribed_from'));
    console.log(sessionStorage.getItem('subscribed_pushed'));
    if (sessionStorage.getItem('subscribed_from') && sessionStorage.getItem('subscribed_pushed')) {
      pushEvents();
    } else if(sessionStorage.getItem('subscribed_from') && !sessionStorage.getItem('subscribed_pushed')){
      window.monetateQ.push(['trackEvent', ['UserSubscription']]);
      sessionStorage.setItem('subscribed_pushed', true);
      console.log('push event -> UserSubscription');
      pushEvents();
    } else {
      let checkCWTestIndex = 0;
      let checkCWTest = setInterval(
        () => {
          checkCWTestIndex++;
          if (window.CWTestActive == true) {
            clearInterval(checkCWTest);
            handleEvents();
          } else if (checkCWTestIndex >= 20) {
            clearInterval(checkCWTest);
            handleEvents();
          }
        }, 100
      );
    }
  };
  let handleEvents = () => {
    
    if (document.querySelector('[data-element-id="X_X_1_Banner-CTA0"]')) {
      //HeroBanner DONE
      document.querySelector('[data-element-id="X_X_1_Banner-CTA0"]').addEventListener('click', () => {
        sessionStorage.setItem('subscribed_access', 'HeroBanner');
        console.log('HeroBanner');
      });
    }
    if (document.querySelector('[data-element-id="X_X_MainPlacement6_Banner-CTA0"]')) {
      //BannerMiddle DONE
      document.querySelector('[data-element-id="X_X_MainPlacement6_Banner-CTA0"]').addEventListener('click', () => {
        sessionStorage.setItem('subscribed_access', 'BannerMiddle');
        console.log('BannerMiddle');
      });
    }
    if (document.querySelector('[data-element-id="X_X_Footer_Newsletter_Banner"] .sgh-popup-newsletter__open-button')) {
      //Footer DONE
      document.querySelector('[data-element-id="X_X_Footer_Newsletter_Banner"] .sgh-popup-newsletter__open-button').addEventListener('click', () => {
        sessionStorage.setItem('subscribed_access', 'Footer');
        console.log('Footer');
      });
    }
    if (document.querySelector('.benefit-bar')) {
      //BenefitBar DONE
      document.querySelectorAll('.benefit-bar').forEach(
        (benefitbar) => {
          benefitbar.addEventListener('click', () => {
            sessionStorage.setItem('subscribed_access', 'BenefitBar');
            console.log('benefitbar');
          });
        }
      );
    }

    if (document.querySelector('#ch_carouselCTA')) {
      //CarouselHP DONE
      document.querySelector('#ch_carouselCTA').addEventListener('click', () => {
        sessionStorage.setItem('subscribed_access', 'CarouselHP');
        console.log('CarouselHP');
      });
    }
    if (document.querySelector('.sgh-popup-newsletter__mini .sgh-popup-newsletter__mini-openbtn')) {
      //MiniPopup DONE 
      document.querySelector('.sgh-popup-newsletter__mini .sgh-popup-newsletter__mini-openbtn').addEventListener('click', () => {
        sessionStorage.setItem('subscribed_access', 'MiniPopup');
        console.log('MiniPopup');
      });
    }

    if (location.href.indexOf('us/sunglasses/subscription') > -1) {
      if (document.querySelector('.sgh-earlyaccess button')) {
        //EALanding DONE
        document.querySelector('.sgh-earlyaccess button').addEventListener('click', () => {
          if (!sessionStorage.getItem('subscribed_from')) {
            sessionStorage.setItem('subscribed_from', 'EALanding');
            console.log('EALanding');
          }
        });
      }
    } else {
      if (document.querySelector('.sgh-earlyaccess button')) {
        //EAPopup DONE
        document.querySelector('.sgh-earlyaccess button').addEventListener('click', () => {
          if (!sessionStorage.getItem('subscribed_from')) {
            sessionStorage.setItem('subscribed_from', 'EAPopup');
            console.log('EAPopup');
          }
        });
      }
    }
    checkSubScription();
  };
  let pushEvents = () => {
    if (!sessionStorage.getItem('subscribed_from_pushed')) {
      console.log('--> pushEvents');
      let subscribed_from = sessionStorage.getItem('subscribed_from');
      let subscribed_access = sessionStorage.getItem('subscribed_access');
      window.monetateQ.push(['trackEvent', [`UserSubscription_${subscribed_from}`]]);
      if(subscribed_access){
        window.monetateQ.push(['trackEvent', [`UserSubscription_${subscribed_access}`]]);
      }
      sessionStorage.setItem('subscribed_from_pushed', true);
      console.log('push event -> user subscribed from: ', subscribed_from);
      console.log('push event -> user subscribed subscribed_access: ', subscribed_access);
    }
  };
  let checkSubScription = () => {
    console.log('--> checkSubScription');
    const usersubscription = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
      this.addEventListener('load', function () {
        if (this.responseURL.indexOf('/wcs/resources/store/10152/user/subscribe') > -1 && this.status == 200) {
          window.monetateQ.push(['trackEvent', ['UserSubscription']]);
          sessionStorage.setItem('subscribed_pushed', true);
          console.log('push event -> UserSubscription');
          pushEvents();
        }
      });
      return usersubscription.apply(this, arguments);
    };
  };
  return {
    init: init
  };
})();
checkSubScription.init();