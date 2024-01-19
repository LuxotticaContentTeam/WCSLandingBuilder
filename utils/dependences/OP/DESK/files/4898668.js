/**
 * Load Engine
 */
 var ct_SetCookie = function(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
  

var engineEP = 'https://media.oliverpeoples.com/utilities/historytracker/engine.min.js';

var selectorCatEntryID = document.querySelector('[name="pageIdentifier"]').content ? document.querySelector('[name="pageIdentifier"]').content : false; 

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    var s;
    s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function trackerCallback() {
  var a = await loadScript(engineEP);
  historyEngine.init().then(()=>{
    if(localStorage.getItem('pdpH') != null){
      var itemsLength = parseInt(JSON.parse(localStorage.getItem('pdpH')).orderBy.chrono.length);
      ct_SetCookie('UserTrackingProducts', itemsLength, 1);
    }
    console.info('Now you can use pdpH object from local storage to do things');
  });
}
trackerCallback();