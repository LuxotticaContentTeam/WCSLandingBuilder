

const ct_rtr__data = {
  data: {
    selector: '#ct_rtr',
    products: [
      {
        upc: '8056597837170',
        img: 'https://assets.sunglasshut.com/is/image/LuxotticaRetail/8056597837187__STD__shad__cfr.png?impolicy=ContentImQuery&im=Resize,width=250',
        // title_img: 'https://media.ray-ban.com/2022/063DCAROUSEL/3D_RTR/mega_clubmaster.svg',
        name: 'Ray-Ban'
      },
      {
        upc: '888392601629',
        img: 'https://assets.sunglasshut.com/is/image/LuxotticaRetail/888392601629__STD__shad__cfr.png?impolicy=ContentImQuery&im=Resize,width=250',
        // title_img: 'https://media.ray-ban.com/2022/063DCAROUSEL/3D_RTR/mega_wayfarer.svg',
        name: 'Oakley'
      },
      {
        upc: '8056597744430',
        img: 'https://assets.sunglasshut.com/is/image/LuxotticaRetail/8056597744430__STD__shad__cfr.png?impolicy=ContentImQuery&im=Resize,width=250',
        // title_img: 'https://media.ray-ban.com/2022/063DCAROUSEL/3D_RTR/mega_wayfarer.svg',
        name: 'Prada'
      },
      {
        upc: '8056597895651',
        img: 'https://assets.sunglasshut.com/is/image/LuxotticaRetail/8056597895651__STD__shad__cfr.png?impolicy=ContentImQuery&im=Resize,width=250',
        // title_img: 'https://media.ray-ban.com/2022/063DCAROUSEL/3D_RTR/mega_wayfarer.svg',
        name: 'Versace'
      }
    ],
    hdr: 'https://media.ray-ban.com/utilities/WebEFX/RTR/hdr/panorama_2_1.hdr',
    img_sx:{
      d: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjuHnpzH8ACHYDd/HVOUQAAAAASUVORK5CYII=',
      m: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAAXNSR0IArs4c6QAAAB5JREFUOE9jvHhkz38GCgDjqAEMo2HAMBoGDIMhDACVnDHATGTYawAAAABJRU5ErkJggg==' // 15:16
    },
    img_dx:{
      d: 'https://media.sunglasshut.com/2023/utility/RTR/SNGH_3D-1.jpg',
      m: 'https://media.sunglasshut.com/2023/utility/RTR/SGH_3D_bottom_5_RTR.png' // 75:56
    },
    img_dx_loader:{
      d: 'https://media.sunglasshut.com/2023/utility/RTR/SNGH_3D-1_loader.jpg',
      m: 'https://media.sunglasshut.com/2023/utility/RTR/SGH_3D_bottom_5_loader.png'
    }
  },
  labels: {
    headline:{
      "en":"VIEW 3D PRODUCTS"
    },
    bottom_text:{
      "en":"Expertly crafted shades from every angle."
    },
    shop_now: {
      "en": "Shop now"
    },
    rotate: {
      'en': 'DRAG TO ROTATE THE GLASSES'
    },
    cursor: {
      'en': 'DRAG'
    }
  },
  links: {
    '8056597837170': {
      'en': '/ray-ban/rb0316s-8056597837187?rtrpdp'
    },
    '888392601629': {
      'en': '/oakley/oo9235-888392601629?rtrpdp'
    },
    '8056597744430': {
      'en': '/prada/pr-13zs-8056597744430?rtrpdp'
    },
    '8056597895651': {
      'en': '/versace/ve4425u-8056597895651?rtrpdp'
    }
  },
  libraries: [
    {
      url : 'https://rtr-viewer.luxottica.com/lib/v/2.2.1/main.js',
      callback: ()=>{
        console.log(`RTR BANNER - rtr viewer loaded - ${window.rtrViewer}`);
      }
    },
    {
      url: 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.3/dist/lazyload.min.js',
      callback: ()=>{
        //lazy execution of whole function
        var ct_rtr__lazyImage = document.createElement("img");
        ct_rtr__lazyImage.classList.add('lazy_rtr');
        ct_rtr__lazyImage.id = "ct_rtr__lazyImage";
        ct_rtr__lazyImage.setAttribute('data-src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHPmzH8ACDADZKt3GNsAAAAASUVORK5CYII=');

        document.querySelector(ct_rtr__data.data.selector).appendChild(ct_rtr__lazyImage);

        ct_rtr__lazy();
      }
    }
  ]
}

function ct_rtr__lazy(){
  console.log('RTR BANNER - lazy init');
  window.lazyLoadInstance = new LazyLoad({
    unobserve_entered: true,
     elements_selector: ".lazy_rtr",
    callback_error: (img) => {
      console.log('RTR BANNER - Error loading image', img);
    },
    callback_enter: () => {
      console.log('RTR BANNER - lazy callback enter');
      if(!document.querySelector('.ct_rtr__container') && window.rtrViewer){
        console.log('RTR BANNER - lazy callback');
        ct_rtr__init();
      }else{
        const checkRtrViewer = setInterval(() => {
          if(window.rtrViewer && window.wcs_config){
            clearInterval(checkRtrViewer);
            ct_rtr__init();
          }
        },200);
      }
    }
  });
  
  window.lazyLoadInstance.update();
}

function ct_rtr__init(){

  let ct_rtr__device = window.outerWidth > 768 ? 'd' : 'm';
  let ct_rtr__lang = wcs_config.locale.toLowerCase();
  let ct_rtr__lang_short = wcs_config.locale.match("^[^_]+")[0];
  let ct_rtr__baseurl = location.origin + location.pathname;
  console.log(ct_rtr__device,ct_rtr__lang,ct_rtr__lang_short,ct_rtr__baseurl)
  var ct_rtr__val = {
    data: {
        selector: '.ct_rtr__container .ct_rtr__view .ct_rtr__viewer',
        showBackground: true,
        showEnvironment: false,
        upc: ct_rtr__data.data.products[0].upc,
        backgroundPath: ct_rtr__data.data.img_dx[ct_rtr__device],
        environmentPath: ct_rtr__data.data.hdr,
        settings: {
            pixelRatio: window.devicePixelRatio,
            backgroundFit: 'cover',
            autoResetCamera: false, // <----- QUESTO DISABILITA IL RESET DELLA CAMERA AL LOADING
            cameraRotationInitial: { // <----- QUESTO IMPOSTA LA ROTAZIONE INIZIALE DELLA CAMERA (IN GRADI)
                phi: 0, // rage [-90, 90]
                theta: 0, // range [-180 - 180]
            },
            cameraRotationReset: { // <----- QUESTO LA TARGET ROTATION (IN GRADI)
                phi: 20,
                theta: 40,
            },
        },
    },
    metadata: {
        env: 'production',
    },
    callbacks: {
      onError: ({ code, context, error }) =>  {
        ct_rtr__init_viewer();
        console.log('Error code:', code);
        console.log('Error context:', context);
        console.error(error);
      },
      onRendered: () => {
        console.log('aaa------');
        document.querySelector('.ct_rtr__container .ct_rtr__view').classList.remove('ct_loading');
        
        if ( document.querySelector('.ct_rtr__container .ct_rtr__view').classList.contains('ct_first') ) {
          ct_rtr__interaction();
          ct_rtr__intersection();
        } else {
          rtrViewer.resetCamera();
        }
      }
    }
  };

  var ct_rtr__text = document.createElement("div");
  ct_rtr__text.innerHTML = `<div class="text-module text-module--theme-dark text-module--text-align-center text-module--vertical-spacing-large" content-position="center" style="padding-top: 0;">
    <div class="text-module__container text-module__title-and-excerpt-container">
      <div class="text-module__title">
        <h2> This is a new arrival</h2>
      </div>
      <div class="text-module__excerpt">
        <p> View it at every angle.</p>
      </div>
    </div>
  </div>`;
  // document.querySelector(ct_rtr__data.data.selector).appendChild(ct_rtr__text);

  var ct_rtr__container = document.createElement("div");
  ct_rtr__container.className = 'ct_rtr__container';
  ct_rtr__container.innerHTML = `
    <div class="ct_rtr__content">
      <picture>
        <source srcset="${ct_rtr__data.data.img_sx.m}" media="(max-width: 768px)">
        <img class="ct_rtr__bg" src="${ct_rtr__data.data.img_sx.d}" alt="3d background" />
      </picture>
      <div class="ct_rtr__text">
        <h3 class="ct_rtr__headline">${ct_rtr__data.labels.headline["en"]}</h3>
        <div class="ct_rtr__products"></div>
        <div class="ct_rtr__titles"></div>
        <div class="ct_rtr__cta">
          <a href="${ ct_rtr__data.links[ct_rtr__data.data.products[0].upc][ct_rtr__lang] !== undefined ? ct_rtr__baseurl + ct_rtr__data.links[ct_rtr__data.data.products[0].upc][ct_rtr__lang] : ct_rtr__baseurl + ct_rtr__data.links[ct_rtr__data.data.products[0].upc][ct_rtr__lang_short] }" 
          data-element-id="X_HomePage_Placement10_ShopNow" class="ct_cta ct_cta__black ct_cta__large" data-description="${ ct_rtr__data.data.products[0].upc }">
            ${ ct_rtr__data.labels.shop_now[ct_rtr__lang] !== undefined ? ct_rtr__data.labels.shop_now[ct_rtr__lang] : ct_rtr__data.labels.shop_now[ct_rtr__lang_short] }
          </a>
        </div>
        <div class="ct_rtr__bottom_text"> ${ ct_rtr__data.labels.bottom_text[ct_rtr__lang] !== undefined ? ct_rtr__data.labels.bottom_text[ct_rtr__lang] : ct_rtr__data.labels.bottom_text[ct_rtr__lang_short] }</div>
      </div>
    </div>
    <div class="ct_rtr__view ct_loading ct_first">
      <div class="ct_rtr__loader">
        <picture>
          <source srcset="${ct_rtr__data.data.img_dx_loader.m}" media="(max-width: 768px)">
          <img class="ct_rtr__loader_bg" src="${ct_rtr__data.data.img_dx_loader.d}" alt="3d background" />
        </picture>
        <div class="ct_rtr__loader_cube">
          <div class="cube"><div class="cube__face cube__face--front show-front"></div><div class="cube__face cube__face--back  show-back"></div><div class="cube__face cube__face--right show-right"></div><div class="cube__face cube__face--left  show-left"></div></div>
        </div>
      </div>
      <div class="ct_rtr__viewer"></div>
      <div class="ct_rtr__icon">
        ${ ct_rtr__data.labels.rotate[ct_rtr__lang] !== undefined ? ct_rtr__data.labels.rotate[ct_rtr__lang] : ct_rtr__data.labels.rotate[ct_rtr__lang_short] }
        <img src="https://media.sunglasshut.com/2023/utility/WOW/rtr/459.svg">
      </div>
      <p id="ct_rtr__besideMouse">
        ${ ct_rtr__data.labels.cursor[ct_rtr__lang] !== undefined ? ct_rtr__data.labels.cursor[ct_rtr__lang] : ct_rtr__data.labels.cursor[ct_rtr__lang_short] }
      </p>
    </div>
  `;
  document.querySelector(ct_rtr__data.data.selector).appendChild(ct_rtr__container);

  $('.ct_rtr__container .ct_rtr__view').mousemove(function(e){
    var cpos = { top: e.pageY - 8, left: e.pageX + 16 };
      $('#ct_rtr__besideMouse').offset(cpos);
  });
  $('.ct_rtr__container .ct_rtr__view').mouseenter(function(e){
    $('#ct_rtr__besideMouse').show();
  });
  $('.ct_rtr__container .ct_rtr__view').mouseleave(function(e){
    $('#ct_rtr__besideMouse').hide();
  });

  ct_rtr__data.data.products.forEach((product, index) => {
    let ct_rtr__active_class = index === 0 ? 'ct_active' : '';

    document.querySelector('.ct_rtr__container .ct_rtr__text .ct_rtr__titles').innerHTML += `
      <div class="ct_rtr__title ${ct_rtr__active_class}" data-upc="${product.upc}">
        <h2>${product.name}</h2>
      </div>
    `;
    document.querySelector('.ct_rtr__container .ct_rtr__text .ct_rtr__products').innerHTML += `
      <a class="ct_rtr__product ${ct_rtr__active_class}" data-upc="${product.upc}" href="javascript:void(0)" data-element-id="X_HomePage_Placement10" data-description="${product.name}">
        <img src="${product.img}" alt="${product.upc}">
      </a>
    `;

    window.lazyLoadInstance.update();

  });

  ct_rtr__init_viewer(ct_rtr__val);

  document.querySelectorAll('.ct_rtr__container .ct_rtr__products .ct_rtr__product').forEach(title => {
    title.addEventListener('click', function() {
      document.querySelector('.ct_rtr__container .ct_rtr__view').classList.add('ct_loading');
      rtrViewer.setUpc(this.dataset.upc);
      
      document.querySelector('.ct_rtr__container .ct_rtr__title.ct_active').classList.remove('ct_active');
      document.querySelector('.ct_rtr__container .ct_rtr__product.ct_active').classList.remove('ct_active');

      this.classList.add('ct_active');
      document.querySelector('.ct_rtr__container .ct_rtr__cta a').href = ct_rtr__data.links[this.dataset.upc][ct_rtr__lang] !== undefined ? ct_rtr__baseurl + ct_rtr__data.links[this.dataset.upc][ct_rtr__lang] : ct_rtr__baseurl + ct_rtr__data.links[this.dataset.upc][ct_rtr__lang_short];
      document.querySelector('.ct_rtr__container .ct_rtr__cta a').dataset.description = this.dataset.upc;
      document.querySelector('.ct_rtr__container .ct_rtr__title[data-upc="'+this.dataset.upc+'"]').classList.add('ct_active');
    });
  });

}
function ct_rtr__init_viewer(ct_rtr__val){
  const rtrViewer = window.rtrViewer;
  rtrViewer.init(ct_rtr__val);
}

function ct_rtr__analytics_rotate() {
  tealium_data2track.push({
    'id':'Click',
    'Tracking_Type': 'link',
    'data_element_id': 'X_HomePage_Placement10_Rotate', // max 25 characters
    'data_description': document.querySelector('.ct_rtr__container .ct_rtr__cta a').dataset.description, // max 25 characters
    'data_analytics_available_call':"1"
  });

  window.monetateQ.push(["trackEvent",["User_RTR_Rotate"]]);

  document.querySelector('.ct_rtr__container canvas').removeEventListener('click', ct_rtr__analytics_rotate);
}
function ct_rtr__analytics_zoom() {
  tealium_data2track.push({
    'id':'Click',
    'Tracking_Type': 'link',
    'data_element_id': 'X_HomePage_Placement10_Zoom', // max 25 characters
    'data_description': document.querySelector('.ct_rtr__container .ct_rtr__cta a').dataset.description, // max 25 characters
    'data_analytics_available_call':"1"
  });

  window.monetateQ.push(["trackEvent",["User_RTR_Zoom"]]);

  document.querySelector('.ct_rtr__container canvas').removeEventListener('wheel', ct_rtr__analytics_zoom);
}

function ct_rtr__interaction(){
  // document.querySelector('.ct_rtr__container .ct_rtr__view').addEventListener("mousedown", function(){
  //   this.classList.add('ct_interact');
  // });
  // document.querySelector('.ct_rtr__container .ct_rtr__view').addEventListener("mouseup", function(){
  //   this.classList.remove('ct_interact');
  // });

  document.querySelector('.ct_rtr__container canvas').addEventListener('click', ct_rtr__analytics_rotate);
  document.querySelector('.ct_rtr__container canvas').addEventListener('wheel', ct_rtr__analytics_zoom);
}

function ct_rtr__intersection(){
  let options = {
    threshold: 0.9,
  };
  
  let callback = function (entries, observer) {
    if (entries[0].isIntersecting === true) {
      document.querySelector('.ct_rtr__container .ct_rtr__view').classList.remove('ct_first');
      rtrViewer.resetCamera();
      window.monetateQ.push(["trackEvent",["User_RTR_View"]]);

      observer.unobserve(target);
    }
  };
  
  let observer = new IntersectionObserver(callback, options);
  
  let target = document.querySelector(".ct_rtr__container .ct_rtr__view");
  
  observer.observe(target);
}

function ct_rtr__load_script(){

  ct_rtr__data.libraries.forEach(function(library){

  var ct_rtr__script = document.createElement("script");
      ct_rtr__script.className = 'ct_rtr__script';
      ct_rtr__script.type = "text/javascript";
      ct_rtr__script.src = library.url;

      ct_rtr__script.addEventListener("load", function() {
        console.log("RTR BANNER - script loaded :)");
        if (!document.querySelector('.ct_rtr__content')) {
          library.callback();
        }
      });

      document.body.appendChild(ct_rtr__script);
  });
}

(function(){

  if (!document.querySelector('.ct_rtr__script')) {
    ct_rtr__load_script();
  }

  // document.querySelector('.pdp-product-gallery__items > .pdp-product-gallery__item.pdp-product-gallery__item--wide').addEventListener("click", function(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  // });
}());