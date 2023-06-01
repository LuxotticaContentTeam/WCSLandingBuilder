function ct_wow__search__download_script(url,name){
  var script = document.createElement("script");
  script.className = `ct_wow__search__${name}_script`;
  script.type = "text/javascript";
  script.src = url;
  script.addEventListener("load", function() {
    console.log(`WOW SEARCH - ${name} script loaded :)`);
  });
  document.body.appendChild(script);
}
function ct_wow__search__download_scripts(){
  ct_wow__search__download_script('./json/data.js','data');
  ct_wow__search__download_script('./js/main.min.js','core');
} 


window.ct_wow__search = {
  start:null,
  structure:{},
  inputManagement:{},
  config:{
    selector:'body'
  },
  template:{},
  data:{
    products:[],
    questions:[],
    storeInfo:{
      lang:'',
      lang_short: ''
    }
  }
}
  
window.ct_wow__search.start = function(){
  if (!window.ct_wow__search.structure?.container){
    window.ct_wow__search.data.storeInfo.lang = window.wcs_config ? wcs_config.locale.toLowerCase().replace('_','-'):undefined,
    window.ct_wow__search.data.storeInfo.lang_short = window.wcs_config ? wcs_config.locale.match("^[^_]+")[0]:undefined
    ct_wow__search__download_scripts()
  }else{
    window.ct_wow__search.structure.init({reopen:true});
  }
}

