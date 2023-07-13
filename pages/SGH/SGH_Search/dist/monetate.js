function ct_wow__search__download_script(url,name){
  var script = document.createElement("script");
  script.className = `ct_wow__search__${name}_script`;
  script.type = "text/javascript";
  script.src = url;
  script.addEventListener("load", function() {
    
  });
  document.body.appendChild(script);
}
function ct_wow__search__download_scripts(){
  // ct_wow__search__download_script('./json/data.js','data');
  // ct_wow__search__download_script('./js/main.min.js','core');
  ct_wow__search__download_script('https://media.sunglasshut.com/2023/utility/WOW/search/json/data.min.js','data');
  ct_wow__search__download_script('https://media.sunglasshut.com/2023/utility/WOW/search/js/main.min.js','core');
} 

function ct_wow__search__download_style(){

  var ct_linkforCSSfile = document.createElement("link");
  ct_linkforCSSfile.href = 'https://media.sunglasshut.com/2023/utility/WOW/search/style/main.min.css';
  // ct_linkforCSSfile.href = './style/main.min.css';
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
    openingElem:['#quiz_cta']
  },
  template:'',
  data:{
    loaded:false,
    products:[],
    questions:[],
    storeInfo:{
      lang:'',
      lang_short: ''
    }
  }
}

window.ct_wow__search.template = `
<div id="ct_wow__search" class="ct_space " style="opacity:0;pointer-events:none;  transform: translateY(100%);">
  <div id="ct_wow__search__loader" class="ct_in">
      <div class="ct_wow__search__results_loader__img_container_wrap">
        <div class="ct_wow__search__results_loader__img_container">
            <img src="https://media.sunglasshut.com/2023/utility/WOW/search/first.png" alt="eyeglasses and sunglasses in circle 1"/>
        </div>
      </div>
      <div class="ct_wow__search__results_loader__img_container_wrap">
        <div class="ct_wow__search__results_loader__img_container">
            <img src="https://media.sunglasshut.com/2023/utility/WOW/search/second.png" alt="eyeglasses and sunglasses in circle 2"/>
        </div>
      </div>
      <div class="ct_wow__search__results_loader__img_container_wrap">
        <div class="ct_wow__search__results_loader__img_container">
            <img src="https://media.sunglasshut.com/2023/utility/WOW/search/third.png" alt="eyeglasses and sunglasses in circle 3"/>
        </div>
      </div>
      <h3></h3>
  </div>
  <button id="ct_wow__search__close">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.75 11.4167L28.5833 10.25L20 18.8333L11.4167 10.25L10.25 11.4167L18.8333 20L10.25 28.5833L11.4167 29.75L20 21.1667L28.5833 29.75L29.75 28.5833L21.1667 20L29.75 11.4167Z" fill="black"/>
      </svg>
  </button>
  <div class="ct_wow__search__products_container">
  <ul class="ct_wow__search__products_list">
      <div class="ct_wow_search__input_placeholder" ></div>
  </ul>
  <div class="ct_wow__search__pos_placeholders">
      <div class="ct_wow__search__pos_placeholders__wrapper">
          <div class="ct_wow__search__pos_placeholders__mainCircle">
             
          </div>
          <div class="ct_wow__search__pos_placeholders__firstCircle">
            
          </div>
          <div class="ct_wow__search__pos_placeholders__secondCircle"></div>
      </div>
  </div>
  <div id="ct_wow__search__input">
      <div class="ct_wow__search__input_container">
          <div class="ct_wow__search__input_progress">
              <span class="ct_wow__search__input_progress__current" data-next="2" data-current="1"><span></span> </span>
              <span></span>
          </div>
          <div class="ct_wow__search__input_questions">
              <h3></h3>
          </div>
          <div class="ct_wow__search__input_answers">
           
          </div>
          <div class="ct_wow__search__input_commands">
              <button class="ct_wow__search__input_commands__prev ct_disabled">
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.64672 11.8535L2.79297 5.99998L8.64672 0.146484L9.35372 0.853484L4.20747 5.99998L9.35372 11.1465L8.64672 11.8535Z" />
                  </svg>
              </button>
              <button class="ct_wow__search__input_commands__next">
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.35348 11.8535L3.64648 11.1465L8.79273 5.99998L3.64648 0.853484L4.35348 0.146484L10.2072 5.99998L4.35348 11.8535Z" />
                  </svg>    
              </button>
              <button class="ct_wow__search__input_commands__results ct_disabled">
                  <span></span>
              </button>
          </div>
      </div>  
  </div>
</div>
<div id="ct_wow__search__results">
  <div class="ct_wow__search__results_container">
      <h2></h2>
      <p></p>
      <div id="ct_wow__search__results_products">
         
          
      </div>
      <a class="ct_cta ct_cta__black" aria-label="view all" data-element-id="X_X_Search_Banner" data-description="view all"></a><br>
      <button class="ct_wow__search__restart"></button>
  </div>
</div>

<div id="ct_wow__search__sprite">
  <?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><symbol fill="none" viewBox="0 0 13 12" id="018-bold" xmlns="http://www.w3.org/2000/svg"><path d="M4.353 11.854l-.707-.707L8.793 6 3.646.853l.707-.707L10.207 6l-5.854 5.854z" fill="#555"/></symbol><symbol fill="none" viewBox="0 0 13 12" id="020-bold" xmlns="http://www.w3.org/2000/svg"><path d="M8.647 11.854L2.793 6 8.647.146l.707.707L4.207 6l5.147 5.146-.707.707z"/></symbol><symbol fill="none" viewBox="0 0 48 48" id="039" xmlns="http://www.w3.org/2000/svg"><path d="M24 0C10.767 0 0 10.767 0 24s10.767 24 24 24 24-10.767 24-24S37.233 0 24 0zm0 46C11.869 46 2 36.131 2 24S11.869 2 24 2s22 9.869 22 22-9.869 22-22 22z"/><path d="M19 14h-2v20h2V14zM31 14h-2v20h2V14z"/></symbol><symbol fill="none" viewBox="0 0 48 48" id="040" xmlns="http://www.w3.org/2000/svg"><path d="M24 0C10.767 0 0 10.767 0 24s10.767 24 24 24 24-10.767 24-24S37.233 0 24 0zm0 46C11.869 46 2 36.131 2 24S11.869 2 24 2s22 9.869 22 22-9.869 22-22 22z"/><path d="M33.286 22.304L19.06 13.412a1.981 1.981 0 00-1.056-.307c-1.042 0-2.004.831-2.004 2.003v17.783c0 1.172.963 2.003 2.004 2.003.354 0 .718-.096 1.056-.307l14.226-8.892c1.254-.782 1.254-2.608 0-3.391zM18 32.891l.008-17.778L32.226 24 18 32.891z"/></symbol><symbol fill="none" viewBox="0 0 48 48" id="183" xmlns="http://www.w3.org/2000/svg"><path d="M47.732 23l-4.619-8a1.999 1.999 0 00-1.732-1h-9.238c-.715 0-1.375.381-1.732 1l-2.043 3.539A6.975 6.975 0 0024 17a6.975 6.975 0 00-4.368 1.539L17.588 15a2 2 0 00-1.732-1H6.619c-.715 0-1.375.381-1.732 1L.268 23a2.001 2.001 0 000 2l4.619 8a2 2 0 001.732 1h9.238c.715 0 1.375-.381 1.732-1l4.619-8a2.001 2.001 0 000-2l-1.56-2.702a4.98 4.98 0 016.705 0L25.793 23a2.001 2.001 0 000 2l4.619 8a2 2 0 001.732 1h9.238c.715 0 1.375-.381 1.732-1l4.619-8a2.004 2.004 0 00-.001-2zm-31.876 9H6.619L2 24l4.619-8h9.238l4.619 8-4.62 8zm25.525 0h-9.238l-4.619-8 4.619-8h9.238L46 24l-4.619 8z" fill="#000"/></symbol><symbol fill="none" viewBox="0 0 48 48" id="184" xmlns="http://www.w3.org/2000/svg"><path d="M38.605 16.003c-1.15 0-2.323.09-3.467.317-3.184.629-6.54 2.305-8.131 4.508A5.959 5.959 0 0024 20a5.95 5.95 0 00-3.015.816c-1.594-2.197-4.944-3.868-8.122-4.495a17.95 17.95 0 00-3.467-.317c-4.894 0-9.368 1.656-9.368 1.656 0 8.533 4.716 14.338 12.49 14.338s10.055-5.157 9.367-9.172c-.01-.061-.032-.121-.045-.182A3.95 3.95 0 0124 22c.776 0 1.523.223 2.163.635-.014.064-.036.126-.047.19-.687 4.015 1.593 9.172 9.367 9.172 7.774 0 12.49-5.805 12.49-14.338 0 0-4.474-1.656-9.368-1.656zM18.764 27.725c-1.253 1.486-3.414 2.272-6.247 2.272-6.05 0-9.957-4.133-10.44-10.891 1.59-.453 4.383-1.103 7.319-1.103 1.104 0 2.14.094 3.079.279 3.768.744 7.105 2.933 7.438 4.88.289 1.69-.13 3.354-1.149 4.563zm16.719 2.272c-2.833 0-4.993-.786-6.247-2.272-1.02-1.21-1.439-2.872-1.149-4.563.333-1.947 3.67-4.136 7.438-4.88a16.027 16.027 0 013.08-.28c2.921 0 5.722.653 7.317 1.106-.483 6.757-4.39 10.889-10.439 10.889z" fill="#000"/></symbol><symbol fill="none" viewBox="0 0 48 48" id="186" xmlns="http://www.w3.org/2000/svg"><path d="M46 13H28a2 2 0 00-2 2v3.363a6.173 6.173 0 00-4 0V15a2 2 0 00-2-2H2a2 2 0 00-2 2v18a2 2 0 002 2h18a2 2 0 002-2V20.549a4.075 4.075 0 014 .001V33a2 2 0 002 2h18a2 2 0 002-2V15a2 2 0 00-2-2zM20 33H2V15h18v18zm26 0H28V15h18v18z" fill="#000"/></symbol><symbol fill="none" viewBox="0 0 48 48" id="188" xmlns="http://www.w3.org/2000/svg"><path d="M37 13c-4.88 0-9.023 3.197-10.458 7.605a6.25 6.25 0 00-5.084.001C20.023 16.197 15.88 13 11 13 4.935 13 0 17.935 0 24s4.935 11 11 11 11-4.935 11-11c0-.471-.04-.933-.098-1.389 1.263-.762 2.934-.763 4.195-.001-.057.456-.097.918-.097 1.39 0 6.065 4.935 11 11 11s11-4.935 11-11-4.935-11-11-11zM11 33c-4.962 0-9-4.037-9-9s4.038-9 9-9 9 4.037 9 9-4.038 9-9 9zm26 0c-4.962 0-9-4.037-9-9s4.038-9 9-9 9 4.037 9 9-4.038 9-9 9z" fill="#000"/></symbol><symbol fill="none" viewBox="0 0 48 48" id="191" xmlns="http://www.w3.org/2000/svg"><path d="M47.58 20.523c-.915-3.487-3.238-5.759-6.393-6.235A33.544 33.544 0 0037 14.007V14H11v.007c-1.453.007-2.892.11-4.206.284-3.136.474-5.459 2.746-6.374 6.233-1.179 4.495.239 9.686 3.297 12.073 1.189.928 2.626 1.398 4.196 1.398.936 0 1.918-.167 2.924-.505 4.595-1.542 8.975-6.338 10.739-11.652 1.395-1.056 3.449-1.057 4.845-.001 1.752 5.3 6.139 10.109 10.741 11.653 1.006.337 1.988.505 2.924.505 1.57 0 3.007-.471 4.196-1.398 3.059-2.388 4.476-7.578 3.298-12.074zm-27.645-.156c-1.353 5.066-5.446 9.789-9.733 11.228-1.441.483-3.52.775-5.253-.574-2.426-1.895-3.565-6.282-2.593-9.99.413-1.574 1.577-4.285 4.72-4.76a31.574 31.574 0 013.925-.273V16h.416c3.732.034 6.777.81 8.002 2.165.559.619.721 1.328.516 2.202zm2.061-1.013a4.163 4.163 0 00-1.095-2.53 5.59 5.59 0 00-.962-.823h8.12a5.583 5.583 0 00-.961.823 4.161 4.161 0 00-1.092 2.531A5.97 5.97 0 0024 19c-.69 0-1.365.127-2.004.354zm21.056 11.667c-1.733 1.35-3.813 1.058-5.253.574-4.287-1.439-8.381-6.161-9.727-11.199-.212-.903-.05-1.612.51-2.231 1.227-1.356 4.278-2.132 8.008-2.165H37v-.001c1.247.007 2.561.091 3.907.269 3.161.478 4.325 3.189 4.738 4.763.972 3.707-.167 8.095-2.593 9.99z" fill="#000"/></symbol><symbol fill="none" viewBox="0 0 40 40" id="close" xmlns="http://www.w3.org/2000/svg"><path d="M29.75 11.417l-1.167-1.167L20 18.833l-8.583-8.583-1.167 1.167L18.833 20l-8.583 8.583 1.167 1.167L20 21.167l8.583 8.583 1.167-1.167L21.167 20l8.583-8.583z" fill="#000"/></symbol></svg>
</div>
</div>
`



window.ct_wow__search.start = function(e){
  let this_ = this;
  this_.style.pointerEvents = 'none';
  if ( window.ct_wow__search.init === false){
    window.ct_wow__search.init = true;
    ct_wow__search__download_style();
    window.ct_wow__search.data.storeInfo.lang = window.wcs_config ? wcs_config.locale.toLowerCase().replace('_','-'):undefined;
    window.ct_wow__search.data.storeInfo.lang_short = window.wcs_config ? wcs_config.locale.match("^[^_]+")[0]:undefined;
  
    ct_wow__search__download_scripts();
   
    
  }else{
    if (!window.ct_wow__search.opening){
      window.ct_wow__search.structure.init({reopen:true});
      setTimeout(function(){
        this_.style.pointerEvents = 'all';
      },600)
    }
  }
  setTimeout(function(){
    this_.style.pointerEvents = 'all';
  },600);
}

function ct_wow__search__start(){
  if(!document.querySelector('#ct_wow__search')){
    let div = document.createElement('div')
    div.id = "ct_wow__search__container";
    div.innerHTML= window.ct_wow__search.template;
    document.querySelector(window.ct_wow__search.config.selector).appendChild(div);
  }
 
  if(document.querySelector(window.ct_wow__search.config.openingElem)){
    if( window.ct_wow__search.config.openingElem.length > 0){
      window.ct_wow__search.config.openingElem.forEach(element => {
        document.querySelector(element).addEventListener('click',window.ct_wow__search.start)
      });
      
    }
  }
  
}

$('.sgh-search-suggestions ').after(`
  <div id="quiz">
    <h3>Can’t decide?</h3>
    <p>Head to our quiz to find our expert shade recommendations.</p>
    <div id="quiz_cta" tabindex="0" aria-label="START SHOPPING">START SHOPPING</div>
  </div>`);


ct_wow__search__start()
