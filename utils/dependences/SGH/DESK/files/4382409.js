/**
 * Load Engine
 */
var canIuse = false;
var Sku = Sku ? Sku : false;
var selectorCatEntryID = Sku ? Sku : false;
var engineEP = 'https://media.sunglasshut.com/utilities/historytracker/engine.min.js';

//SOME CONFIG ACTIONS
window.uhtConfig = {};
window.uhtConfig.AddToCart = document.querySelectorAll('.ajaxAddToCart');


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
var ct_SetCookieUHT = function(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
async function trackerCallback() {
  var a = await loadScript(engineEP);
  historyEngine.init().then(()=>{
    canIuse = true;
	//console.clear();
	console.log('----------->uht engine loaded');
    if(localStorage.getItem('pdpH') != null){
      var itemsLength = parseInt(JSON.parse(localStorage.getItem('pdpH')).orderBy.chrono.length);
      ct_SetCookieUHT('UserTrackingProducts', itemsLength, 1);
    }
  });
}
trackerCallback();