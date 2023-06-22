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
  ct_wow__search__download_script('https://media.sunglasshut.com/2023/utility/WOW/search/json/data.min.js','data');
  ct_wow__search__download_script('https://media.sunglasshut.com/2023/utility/WOW/search/js/main.min.js','core');
} 

function ct_wow__search__download_style(){

  var ct_linkforCSSfile = document.createElement("link");
  ct_linkforCSSfile.href = 'https://media.sunglasshut.com/2023/utility/WOW/search/style/main.min.css';
  ct_linkforCSSfile.type = 'text/css';
  ct_linkforCSSfile.rel = 'stylesheet';
  document.body.appendChild(ct_linkforCSSfile);
}




window.ct_wow__search = {
  init:false,
  opening:false,
  start:null,
  structure:{},
  inputManagement:{},
  config:{
    selector:'body',
    openingElem:'#heroBanner'
  },
  initTemplate:'',
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

window.ct_wow__search.initTemplate = `
<div id="ct_wow__search" class="ct_space " style="opacity:0;pointer-events:none;">
  <div id="ct_wow__search__loader">
      <div class="ct_wow__search__results_loader__img_container">
          <img src="https://media.sunglasshut.com/2023/utility/WOW/search/first.png"/>
      </div>
      <div class="ct_wow__search__results_loader__img_container">
          <img src="https://media.sunglasshut.com/2023/utility/WOW/search/second.png"/>
      </div>
      <div class="ct_wow__search__results_loader__img_container">
          <img src="https://media.sunglasshut.com/2023/utility/WOW/search/third.png"/>
      </div>
      <h3></h3>
  </div>
  <button id="ct_wow__search__close">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.75 11.4167L28.5833 10.25L20 18.8333L11.4167 10.25L10.25 11.4167L18.8333 20L10.25 28.5833L11.4167 29.75L20 21.1667L28.5833 29.75L29.75 28.5833L21.1667 20L29.75 11.4167Z" fill="black"/>
      </svg>
  </button>
</div>
`



window.ct_wow__search.start = function(e){
  let this_ = this;
  this_.style.pointerEvents = 'none';
  if (!document.querySelector('#ct_wow__search') && window.ct_wow__search.init === false){
    console.log('MONETATE INJECT SEARCH')
    window.ct_wow__search.init = true;
    ct_wow__search__download_style();
    window.ct_wow__search.data.storeInfo.lang = window.wcs_config ? wcs_config.locale.toLowerCase().replace('_','-'):undefined;
    window.ct_wow__search.data.storeInfo.lang_short = window.wcs_config ? wcs_config.locale.match("^[^_]+")[0]:undefined;
    let div = document.createElement('div')
    div.id = "ct_wow__search__container";
    div.innerHTML= window.ct_wow__search.initTemplate;
    document.querySelector(window.ct_wow__search.config.selector).appendChild(div);
    
    ct_wow__search__download_scripts();
    setTimeout(function(){
      this_.style.pointerEvents = 'all';
    },600);
    
  }else{
    if (!window.ct_wow__search.opening){
      window.ct_wow__search.structure.init({reopen:true});
      setTimeout(function(){
        this_.style.pointerEvents = 'all';
      })
    }
  }
}

if(document.querySelector(window.ct_wow__search.config.openingElem)){
  document.querySelector(window.ct_wow__search.config.openingElem).addEventListener('click',window.ct_wow__search.start)
}
