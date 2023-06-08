import LazyLoad from "vanilla-lazyload";


var ct_cos__data = {
    container: '#ct_wow_module',
    dataElement: "X_X_MainPlacement18_CardOnSlider",
    // dataElement: "X_X_MainPlacement18_Banner-CTA0",
  
    lang: "",
    lang_short: "",
    homeUrl: location.origin + location.pathname,
    items: [
     
      {
        title: {
            "en": "Women",
            "fr":"Femme",
            "es":"Mujer",
            "de":"Damen",
           
        },
        logo: "https://media.sunglasshut.com/2023/utility/WOW/SGH_sun.svg",
        image: "https://media.sunglasshut.com/2023/utility/WOW/women_d.jpg",
        imageM: "https://media.sunglasshut.com/2023/utility/WOW/women_m.jpg",
        link: {
          "en": "/womens-sunglasses",
          "fr":"/lunettes-de-soleil-femme",
          "es-mx":"/lentes-de-sol-mujer",
          "de":"/damen-sonnenbrillen",
          "es":"/gafas-de-sol-mujer"
        }
      },
      {
        title: {
            "en": "Men",
            "fr":"Homme",
            "es":"Hombre",
            "de":"Herren",
        },
        logo: "https://media.sunglasshut.com/2023/utility/WOW/SGH_sun.svg",
        image: "https://media.sunglasshut.com/2023/utility/WOW/men_d.jpg",
        imageM: "https://media.sunglasshut.com/2023/utility/WOW/men_m.jpg",
        link: {
            "en": "/mens-sunglasses",
            "fr":"/lunettes-de-soleil-homme",
            "es-mx":"/lentes-de-sol-hombre",
            "de":"/herren-sonnenbrillen",
            "es":"/gafas-de-sol-hombre"
        }
      },
    //   {
    //     title: {
    //       "en": "Kids"
    //     },
    //     logo: "https://media.ray-ban.com/2022/063DCAROUSEL/CardOnSlider/Logo1.svg",
    //     image: "https://media.ray-ban.com/2022/063DCAROUSEL/CardOnSlider/kids_d.png",
    //     imageM: "https://media.ray-ban.com/2022/063DCAROUSEL/CardOnSlider/kids.png",
    //     link: {
    //       "en": "/usa/sunglasses/junior"
    //     }
    //   }
    ],
  
    labels: {
      "en" : {
        shopNow : "Shop now"
      },
      "fr" : {
        shopNow : "Acheter maintenant"
      },
      "fr-ca" : {
        shopNow : "Magasinez maintenant"
      },
      "es" : {
        shopNow : "Compra ya"
      },
      "es-mx" : {
        shopNow : "Compra ahora"
      },
      "de" : {
        shopNow : "Jetzt kaufen"
      },
      "pt" : {
        shopNow : "Compre agora"
      }
    },
  
    libraries: [
      {
        url: 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.3/dist/lazyload.min.js',
        callback: () => {
          //lazy execution of whole function
          console.log('COS - lazyload script loaded!');
  
          //lazy execution of whole function
         
        }
      }
    ]
  };
  
  
  var ct_cos__list, ct_cos__card;
  
  function ct_cos__html() {
    document.querySelector(ct_cos__data.container).innerHTML = `
      <div class="ct_wow">
        <div class="ct_wow__container ct_cos" data-element-id="${ct_cos__data.dataElement}">
          <div class="ct_cos__list"></div>
          <div class="ct_cos__card">
            <div class="ct_cos__card_overf"></div>
          </div>
          <div class="ct_cos__card_cursor">
            <span>${ct_cos__get_lang(ct_cos__data.labels).shopNow}</span>
          </div>
        </div>
      </div>
    `;
  
    ct_cos__list = document.querySelector(ct_cos__data.container).querySelector('.ct_cos__list');
    ct_cos__card = document.querySelector(ct_cos__data.container).querySelector('.ct_cos__card .ct_cos__card_overf');
  
    ct_cos__data.items.forEach((item, index) => {
      ct_cos__list.innerHTML += `
        <a class="ct_cos__list_item" data-cos-item="${index}" href="${ct_cos__data.homeUrl + ct_cos__get_lang(item.link)}" data-description="${item.title["en"]}" aria-label="${ct_cos__get_lang(item.title)}">
          <h3></h3>
        </a>
      `;
      ct_cos__populate(item, index);
  
      if (window.innerWidth >= 1024) {
        ct_cos__card.innerHTML += `
          <div class="ct_cos__card_item" data-cos-item="${index}">
            <div class="ct_cos__card_image">
              <img src="${item.image}" alt="${ct_cos__get_lang(item.title)}" aria-hidden>
            </div>
          </div>
        `;
      } else {
        ct_cos__list.querySelector(`.ct_cos__list_item[data-cos-item="${index}"]`).innerHTML += `
          <div class="ct_cos__card_item" data-cos-item="${index}">
            <div class="ct_cos__card_image">
              <img src="${item.imageM}" alt="${ct_cos__get_lang(item.title)}" aria-hidden>
            </div>
          </div>
        `;
      }
  
      window.lazyLoadInstance_COS.update();
      
    });
  
    }
  
  function ct_cos__populate(item, index) {
    let ct_cos__list_item = ct_cos__list.querySelector(`.ct_cos__list_item[data-cos-item="${index}"]`);
    let ct_cos__list_item_h3 = ct_cos__list_item.querySelector(`h3`);
    if ( ct_cos__list_item_h3.offsetWidth <= ct_cos__list_item.offsetWidth * 2) {
      ct_cos__list_item_h3.innerHTML += `
        <span>${ct_cos__get_lang(item.title)}</span>
        <img src="${item.logo}" alt="spacer logo">
      `;
      if ( ct_cos__list_item_h3.offsetWidth > ct_cos__list_item.offsetWidth * 2) {
        ct_cos__list_item_h3.querySelector('img:last-child').remove();
        ct_cos__list_item_h3.querySelector('span:last-child').remove();
        // ct_cos__list_item_h3.style.minWidth = '300%';
        ct_cos__list_item_h3.style.animationDuration = (ct_cos__list_item_h3.offsetWidth * 0.02 ) + 's';
        let ct_cos__list_item_h3_2 = ct_cos__list_item_h3.cloneNode(true);
        ct_cos__list_item.appendChild(ct_cos__list_item_h3_2);
      } else {
        if ( ct_cos__list_item_h3.querySelectorAll('span').length < 100 ) {
          ct_cos__populate(item, index);
        }
      }
    }
  }
  
  
  function ct__show_card(ct_item) {
    ct_cos__card.querySelectorAll('.ct_cos__card_item').forEach(item => {
      item.classList.remove('ct_show');
    });
    ct_cos__card.querySelector('.ct_cos__card_item[data-cos-item="'+ct_item+'"]').classList.add('ct_show');
  }
  
  
  function ct_cos__load_script() {
    
    ct_cos__data.libraries.forEach(function (library) {
  
      var ct_cos__script = document.createElement("script");
      ct_cos__script.className = 'ct_cos__script';
      ct_cos__script.type = "text/javascript";
      ct_cos__script.src = library.url;
  
      ct_cos__script.addEventListener("load", function () {
        library.callback();
      });
  
      document.body.appendChild(ct_cos__script);
    });
  }
  
  function ct_cos__get_lang(field){
    let keys = Object.keys(field);
    if (keys.includes(ct_cos__data.lang)){
        return field[ct_cos__data.lang]
    }
    if (keys.includes(ct_cos__data.lang_short)){
        return field[ct_cos__data.lang_short]
    }
    return field['en']
  }

  function ct_get_info_store(){
    let time = 0;
    return new Promise((resolve, reject) => {
        let cos_interval = setInterval(() => {
            time+=200;
            if (window.wcs_config){
                ct_cos__data.lang = wcs_config.locale.toLowerCase().replace('_','-');
                ct_cos__data.lang_short = wcs_config.locale.match("^[^_]+")[0];
                clearInterval(cos_interval)
            
                resolve(true)
            
            }else{
                if (time >= 10000){
                    clearInterval(cos_interval)
                    resolve(false)
                }
            }
        }, 400);
    });
  

  }

  async function ct_cos__init(){
    let wcs_config = await ct_get_info_store();
    if (wcs_config){
        ct_cos__html()
        if (window.innerWidth >= 1024) {
      
          ct_cos__list.addEventListener('mouseleave', (event) => {
            document.querySelector('.ct_cos .ct_cos__card').classList.remove('ct_show');
            document.querySelector('.ct_cos .ct_cos__card_cursor').classList.remove('ct_show');
          });
        
          ct_cos__list.querySelectorAll('.ct_cos__list_item').forEach(item => {
            item.addEventListener('mouseenter', event => {
              ct__show_card(item.dataset.cosItem);
            });
          });
        
          
          var ct_cursor = document.querySelector('.ct_cos .ct_cos__card_cursor');
          var ct_cursor_card = document.querySelector('.ct_cos .ct_cos__card');
          
          document.querySelector('.ct_cos .ct_cos__list').addEventListener('mousemove', function(e){
            var move_x = e.clientX;
            var move_y = e.clientY;
            ct_cursor.style.transform = `translate(${move_x}px, ${move_y}px)`;
            ct_cursor_card.style.transform = `translate(${move_x}px, ${move_y}px)`;
        
            if (!document.querySelector('.ct_cos .ct_cos__card').classList.contains('ct_show')) {
              document.querySelector('.ct_cos .ct_cos__card').classList.add('ct_show');
              document.querySelector('.ct_cos .ct_cos__card_cursor').classList.add('ct_show');
            }
          });
      
        }
    }else{
        console.log('NOT WCS CONFIG')
    }
  }

  const lazyLoadCallback = () => {
  
    window.lazyLoadInstance_COS = new LazyLoad({
      unobserve_entered: true,
      elements_selector: ".lazy_cos",
      callback_error: (img) => {
        console.log('COS - Error loading image', img);
      },
      callback_enter: () => {

        console.log('COS - lazy callback');
        ct_cos__init();
       
      
      }
    });
  
  };
  


  document.addEventListener('DOMContentLoaded',()=>{
    var ct_cos__lazyImage = document.createElement("img");
    ct_cos__lazyImage.classList.add('lazy_cos');
    ct_cos__lazyImage.id = "ct_cos__lazyImage";
    ct_cos__lazyImage.setAttribute('data-src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHPmzH8ACDADZKt3GNsAAAAASUVORK5CYII=');

    document.querySelector(ct_cos__data.container).appendChild(ct_cos__lazyImage);

    lazyLoadCallback();
    // test()    
  })


  async function test(){
    console.log('test start')
    let x = await  testWait()
    console.log(x)
    
   
  }

    function testWait() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('WAAAAIT')
                resolve(3)
            }, 5000)
        });
    }
  