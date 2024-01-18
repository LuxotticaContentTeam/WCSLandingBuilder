var paramsConfig = {
  'welcomeParam' : 'welcomeReminder',
  'promoParam' : 'welcomeCap',
  'birthdayParam' : 'birthdayPromo',
};
window.wrEligible = false; //welcome reminder
window.exitEligible = false; //exit intent
window.promoEligible = false; //promo cap
console.log('ct_DataCollectPopup');
var ct_DataCollectPopup = (function () {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var init = () => {  
    if (urlParams.get(paramsConfig.birthdayParam) == 'true') {
      //check if cookie is false set cookie welcome reminder
      if(ct_GetCookie('bdPromo') == false){
        window.wrEligible = true;
        ct_SetCookie('bdPromo', true, 360);
        monetateRetrack();
      } 
      else if(ct_GetCookie('bdPromo') == 'false'){
        window.exitEligible = true;
        monetateRetrack();
      }
    } else if (urlParams.get(paramsConfig.welcomeParam) == 'true') {
      //check if cookie is false set cookie welcome reminder
      if(ct_GetCookie('wrEligible') == false){
        window.wrEligible = true;
        ct_SetCookie('wrEligible', true, 360);
        monetateRetrack();
      } 
      else if(ct_GetCookie('wrEligible') == 'false'){
        window.exitEligible = true;
        monetateRetrack();
      }
    } else if (urlParams.get(paramsConfig.promoParam) == 'true') {
      if(ct_GetCookie('promoEligible') == false){
        window.promoEligible = true;
        ct_SetCookie('promoEligible', true, 360);
        monetateRetrack();
      } 
      else if(ct_GetCookie('promoEligible') == 'false'){
        window.exitEligible = true;
        monetateRetrack();
      }
    } else if (ct_GetCookie('wrElibigle') !== 'true' && ct_GetCookie('promoEligible') !== 'true' && ct_GetCookie('bdPromo') !== 'true'){
      window.exitEligible = true;
      monetateRetrack();
    }else {
      monetateRetrack();
    }
  };
  var monetateRetrack = function(){
    window.monetateQ.push([ "setPageType", pageType ? pageType : null ]);
    window.monetateQ.push([
      "trackData"
    ]);
  };
  var ct_GetCookie = function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return false;
  };
  var ct_SetCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  return {
    init: init
  };
})();
ct_DataCollectPopup.init();