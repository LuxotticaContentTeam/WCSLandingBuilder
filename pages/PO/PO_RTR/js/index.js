const Styles = {
  
  products:{},
  modelsN:0,
  selector_positions:[],
  currentModel:'',
  currentUpc:'',
  defaultProd:'',
  updateQueue:[],
  init:function(){
    this.container = document.querySelector('#styles');
    // this.setData();
    // this.build();
    // scrollManager.addEvent(document.querySelector('#styles'), this.scroll.bind(this),'');
    // this.setElements();
    // this.selectorHandler();
    window.Styles = Styles
  },
 
  setData:function(){
    this.contents = window.ct_SUPERNOVA.translations.styles;
    this.products = this.contents.products;
    this.productsInfo = window.ct_SUPERNOVA.config.prod_info
    this.defaultProd = this.contents.default;
    
  },
  build:function(){
    //HTML
    let selectorHtml='';
    let variantsHtml = '';
    
    Object.keys(this.products).forEach(model=>{
      selectorHtml+= buildHtmlFromTemplate('model_selector__template',{
        model:model,
        upc:Object.keys(this.products[model])[0]
      })
      variantsHtml+=buildHtmlFromTemplate('variant_selector__template',{model:model})
    })
    this.container.querySelector('.model_selector ul').innerHTML = selectorHtml;
    this.container.querySelector('.variant_selector').innerHTML = variantsHtml;
    this.container.querySelector('.desc_container').innerHTML = buildHtmlFromTemplate('desc__template',this.contents.desc)
    this.container.querySelector('.tutorial > span').innerHTML = checkTrad(ct_SUPERNOVA.config.rtr.drag,ct_SUPERNOVA.lang)
    
    let prodHtml = '';
    Object.keys(this.products).forEach(model=>{
      prodHtml = '';
      Object.keys(this.products[model]).forEach(prod=>{
          prodHtml+=buildHtmlFromTemplate('variant_selector_btn__template',{
            model:model,
            prod:prod,
            color:this.productsInfo[prod].swatch.length > 1 
              ? `linear-gradient(135deg, ${this.productsInfo[prod].swatch[0]} 0%, ${this.productsInfo[prod].swatch[1]} 100%);`
              : this.productsInfo[prod].swatch[0]
            
          })
      })
      this.container.querySelector(`.variant_selector [data-model="${model}"]`).innerHTML = prodHtml;
      
  
    
    })
  
 
    this.container.querySelector('.cta_container').innerHTML = buildHtmlFromTemplate('cta__template',{ buyNow:ct_SUPERNOVA.translations.common.buyNow})
    this.container.querySelector('.prescription').innerHTML = this.contents.prescription ? this.contents.prescription : '';

    loadScript('https://rtr-viewer.luxottica.com/lib/v/5.0.0/main.js',()=>{ Rtr.init()})
  },
  setElements:function(){
    this.updateProd(this.container.querySelector(`.model_selector button[data-model="${this.defaultProd.model}"]`))
    this.currentModel = this.defaultProd.model
    this.currentUpc = this.defaultProd.upc
  },
  scroll:function(){
    if (ct_SUPERNOVA.device.isMobile){
      // this.sectionAnchoring();
    }
    if (scrollManager.currentElements['styles'].progress > .1){
      this.container.classList.add('active')
    }else{
      this.container.classList.remove('active')
    }
    if (scrollManager.currentElements['styles'].progress > .35 && !Rtr.firstPosition){
      Rtr.inSection();
      Rtr.firstPosition = true;
    }
  },
  selectorHandler:function(){
    this.container.querySelectorAll('.model_selector button').forEach(btn=>{
      btn.addEventListener('click',()=>{this.updateProd(btn)})
    })
    this.container.querySelectorAll('.variant_selector button').forEach(btn=>{
      btn.addEventListener('click',()=>{this.updateProd(btn)})
    })
  },
  updateSelectorPos:function(btn){
    let btnPos = btn.getClientRects()[0].x;
    let btnWidth = btn.clientWidth;
    let selectorPos = this.container.querySelector('.model_selector').getClientRects()[0].x;
    let deltaPost = btnPos - selectorPos;
    Styles.container.querySelector('.selection_pointer').style.transform = `translateX(${deltaPost}px)`;
    Styles.container.querySelector('.selection_pointer').style.width = `${btnWidth}px`;
  },
  updateProd:function(btn){
    if(!Rtr.rendering){
      if (this.currentModel != btn.dataset.model){
        this.currentModel = btn.dataset.model
        this.updateModel(btn);
      }
      if (this.currentUpc != btn.dataset.prod){
        
        if(this.currentUpc != ''){
          this.updateAsset(btn.dataset.prod);
        }
        this.currentUpc = btn.dataset.prod;
        this.updateVariantList(btn.dataset.model,btn.dataset.prod);
        this.updateDetails(btn.dataset.model,btn.dataset.prod)
      }
    }
   
  },
  updateModel:function(btn){
    if ( this.container.querySelector('.model_selector button.active')){
      this.container.querySelector('.model_selector button.active').classList.remove('active');
    }
    btn.classList.add('active');
    this.updateSelectorPos(btn)
  },
  updateAsset:function(upc){
    this.updateQueue.push(upc)
    this.container.querySelector('.loader .icon_container').classList.add('rotate');
    
    Rtr.update(upc);
  },
  updateVariantList:function(model,prod){
    if(   this.container.querySelector('.variant_selector ul.active')){
      this.container.querySelector('.variant_selector ul.active').classList.remove('active');
    }
    this.container.querySelector(`.variant_selector ul[data-model="${model}"]`).classList.add('active');
    if( this.container.querySelector(`.variant_selector ul[data-model="${model}"] button.active` )){
      this.container.querySelector(`.variant_selector ul[data-model="${model}"] button.active` ).classList.remove('active');
      this.container.querySelector(`.variant_selector ul[data-model="${model}"] button[data-prod="${prod}"]` ).classList.add('active');
    }else{
      this.container.querySelector(`.variant_selector ul[data-model="${model}"] button[data-prod="${prod}"]` ).classList.add('active');
    }


  },
  updateDetails:function(model,prod){
    this.container.querySelector('.frame_type').innerHTML = this.products[model][prod].frame_type;
    this.container.querySelector('.lens_type').innerHTML = this.products[model][prod].lens_type;
    if (this.products[model][prod].oos === "true"){
      this.container.querySelector('.cta_container .cta').setAttribute('href', 'javascript:void(0)');
      this.container.querySelector('.cta_container .cta').classList.add('cta--oos');
      this.container.querySelector('.cta_container .cta').innerHTML = ct_SUPERNOVA.translations.common.soldOut
    }else{
      this.container.querySelector('.cta_container .cta').setAttribute('href', checkTrad(this.productsInfo[prod].url,ct_SUPERNOVA.lang));
      this.container.querySelector('.cta_container .cta').classList.remove('cta--oos');
      this.container.querySelector('.cta_container .cta').innerHTML = ct_SUPERNOVA.translations.common.buyNow
    }
    // this.container.querySelector('.cta_container .cta').setAttribute('aria-label',`${ checkTrad(ct_SUPERNOVA.config.buyNow,ct_SUPERNOVA.lang) + ' ' + prod} `);
  },

  sectionAnchoring:function(){
    //Section Anchoring
    let stick_el =this.container.querySelector('.scroll_wrap');
    let delta = 0;
    if(scrollManager.scrollProgress - delta <scrollManager.currentElements['styles'].top){
        stick_el.classList.remove('fixed');
    }
    if(scrollManager.scrollProgress - delta >= scrollManager.currentElements['styles'].top && scrollManager.scrollProgress - delta <= (scrollManager.currentElements['styles'].bottom + (window.ct_SUPERNOVA.device.height - stick_el.offsetHeight)) ){
    
        if (!stick_el.classList.contains('fixed')) {
            stick_el.classList.add('fixed');
            if (stick_el.classList.contains('bottom')) {
            stick_el.classList.remove('bottom');
            }
        }
    }
    if(scrollManager.scrollProgress  >= (scrollManager.currentElements['styles'].bottom - stick_el.offsetHeight)){
    
        if (stick_el.classList.contains('fixed')) {
            stick_el.classList.remove('fixed');
            if (!stick_el.classList.contains('bottom')) {
            stick_el.classList.add('bottom');
            }
        } 
    }
  }

  
}

const Rtr = {
  container:'',
  viewer:null,
  active:false,
  currentUpc:null,
  dragging:false,
  dragTimer:null,
  tutorialTimer:null,
  camera:false,
  analyticsSent:false,
  rendering:false,
  isInSection:false,
  firstRender:false,
  tutorialViewed:false,
  renderUsed: false,
  data:{
    selector: '#rtr',
    showEnvironment: false,
    id: {
      type: 'upc',
      value: '', // <----------
  },
    environmentPath: '',
    settings: {
      autoRotateCamera: false,
      clearColor: '#fff',
      showBackground: false,
      pixelRatio: window.devicePixelRatio,
      autoResetCamera: false, // <----- QUESTO DISABILITA IL RESET DELLA CAMERA AL LOADING
      cameraRotationInitial: { // <----- QUESTO IMPOSTA LA ROTAZIONE INIZIALE DELLA CAMERA (IN GRADI)
          phi: 0, // rage [-90, 90]
          theta: 0, // range [-180 - 180]
      },
      cameraRotationReset: { // <----- QUESTO LA TARGET ROTATION (IN GRADI)
          phi: 0,
          theta: 0,
      },
      gestures: {
        mouse: {
            left: 'rotate',
            middle: 'pan',
            right: 'pan',
            wheel: 'dolly',
        },
        touches: {
            one: 'rotate',
            two: 'rotate',
            three: 'dolly-pan',
        },
      },
    }
  },
  metadata: {
    env: 'production',
    qa:false
  },
  callbacks:{},
  firstPosition:false,
  hotPositions:[
    [0.00,0.00,.65], //front
    [.65,0.00,0.00], //side left
    [-.65,0.00,0.00], //side right
    [0.00,-.40,.50], //front 3/4
    [-.32,-.34,.6]
  ],
 
  init:function(){
  
    this.container = document.querySelector('#rtr');
    this.setElements();
    this.viewer = window.rtrViewer;
    // this.prepareFiles();
    this.viewer.init({data:this.data,metadata:this.metadata,callbacks:this.callbacks});
   
    window.RTR = Rtr;
  },
  setElements:function(){
 
    // this.data.environmentPath= '@testAssetsPath@/panorama_red_andre.hdr',
    this.data.environmentPath= '../img/panorama_2_1.hdr',
    // this.data.environmentPath= '@testAssetsPath@/panorama_2_11.hdr',
    this.data.id.value = "827934480285";
    this.currentUpc ="827934480285";
    this.callbacks ={
      onError: ({ code, context, error }) =>  { this.onError(code,context,error)},
      onRendered: () => { this.onRendered() }
    }
  },
  onRendered:function(){
    // customLog(`[RTR] Redered [${this.currentUpc}]`);
    this.rendering = false;
    if(!this.firstRender){
      this.firstRender=true;
    }
    if (this.isInSection && !this.tutorialViewed && !this.renderUsed){
      this.setTutorial();
    }
    if(!this.camera){
      this.camera = this.viewer.getCameraControls();
      this.camera.camera.near = 0.04;
      this.camera.camera.updateProjectionMatrix();
    }
    this.container.style.opacity = 1;
    this.camera.setPosition(-.32,-.34,.6,true)
    this.active = true;
    this.animationHandler();
    setTimeout(function(){
      // Styles.container.querySelector('.loader .icon_container').classList.remove('rotate');

    },600)
  },
  onError:function(code,context,error){
    // customLog(`[RTR] Err  ${this.currentUpc}`,'','err')
    console.log(code,context,error);
    
    this.active = false;
  },
  update:function(upc){
    this.currentUpc = upc;
    this.container.style.opacity = 0;
    //customLog(`[RTR] Requested [${upc}]`,'','wait')
    this.rendering =true;
    this.viewer.setId({
      type: 'upc',
      value: upc,
    });
  },

  inSection:function(){
    // this.viewer.resetCamera();
    this.isInSection = true;
    if(this.camera){
      this.camera.setPosition(-.32,-.34,.6,true);
    }
    if(this.firstRender){
      // this.setTutorial();
    }
   
    // setTimeout(()=>{
    //   // this.viewer.setAutoRotateCamera(true);
    // },2000)
  },
  animationHandler:function(){
    if (window.innerWidth > 1080){
      this.container.addEventListener('mousedown',e=>{
        if(!this.analyticsSent){
          // Analytics.analyticsPush({
          //   'id':'Click',
          //   'Tracking_Type': 'link',
          //   'data_element_id': 'X_SupernovaSmartGlasses_RTRPlacementClp_Rotate', // max 25 characters
          //   'data_description': "Rotate",
          //   'data_analytics_available_call':"1"
          // })
          this.analyticsSent = true;
        }
        this.dragging = true;
        this.renderUsed = true;
        clearTimeout(this.dragTimer);
        Styles.container.querySelector('.rtr_container').classList.remove('tutorial_on');
        clearTimeout(this.tutorialTimer)
      })
      Styles.container.addEventListener('mousemove',e=>{
        if(this.dragging){
          
        }
      })
      Styles.container.addEventListener('mouseup',e=>{
        if(this.dragging){
          // this.dragTimer = setTimeout(this.setHotPosition.bind(this),1000)
          this.dragging = false;
        }
      })
    }else{
      this.container.addEventListener('touchstart',e=>{
        this.dragging = true;
        clearTimeout(this.dragTimer)
        Styles.container.querySelector('.rtr_container').classList.remove('tutorial_on');
        clearTimeout(this.tutorialTimer)
      })
      Styles.container.addEventListener('touchmove',e=>{
        if(this.dragging){
         
        }
      })
      Styles.container.addEventListener('touchend',e=>{
        if(this.dragging){
          // this.dragTimer = setTimeout(this.setHotPosition.bind(this),1000)
          this.dragging = false;
        }
      })
    }
   
  },
  setHotPosition:function(){
    let currentPos = this.camera.getPosition();
    let closestPoint = getClosestPoint([currentPos.x,currentPos.y,currentPos.z],this.hotPositions)
    this.camera.setPosition(closestPoint[0],closestPoint[1],closestPoint[2],true);

   
      if (this.camera.getTarget().y > 0.0005 ){
        this.viewer.resetCamera();
      }
   
     
  
    //customLog('[RTR] SET HOT POSITION','','')
  },
  isAnHotPosition:function(currentPos){
    console.log(window.currentPos = currentPos)
    let currentPosArray = [parseFloat(currentPos.x.toFixed(2)),parseFloat(currentPos.y.toFixed(2)),parseFloat(currentPos.z.toFixed(2))]
    let foundPos = false;
    
    this.hotPositions.forEach(pos=>{
   
      if (JSON.stringify(pos) === JSON.stringify(currentPosArray)){
        console.log('IS AN HOT POSITION')
        foundPos = true
      }else{
     
      }
    }) 
    return foundPos
   
  },
  setTutorial:function(){
    this.tutorialTimer = setTimeout(()=>{
      if(!this.rendering && !this.tutorialViewed){
       
        Styles.container.querySelector('.rtr_container').classList.add('tutorial_on');
        this.tutorialViewed =true;
        setTimeout(() => {
          Styles.container.querySelector('.rtr_container').classList.remove('tutorial_on');
        }, 4000);
      }else{
        this.setTutorial();
      }
    },4000)
  },
  setPosition:function(x,y,z){
    this.camera.setPosition(x,y,z,true);
  }
  // prepareFiles:function(){
  //   getAjax(`https://rtr-viewer.luxottica.com/${Styles.defaultProd.upc}/webGL/${Styles.defaultProd.upc}_LOD0/${Styles.defaultProd.upc}.glb`,()=>{
  //     customLog('[Styles][prepareFiles] GLB model downloaded')
  //   })
  //   getAjax(`@testAssetsPath@/panorama_red4.hdr`,()=>{
  //     customLog('[Styles][prepareFiles] GLB model downloaded')
  //   })
  // }
}

const loadScript = (url,callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.className = 'rtr-viewer';
  script.src = url;
  script.addEventListener('load',function(){
    //customLog('Script RTR Loaded','','')
    callback();
  })
  document.body.appendChild(script);
}


Styles.init();
loadScript('https://rtr-viewer.luxottica.com/lib/v/4.1.0/main.js',()=>{ Rtr.init()})



 const getClosestPoint=(currentPos,posList) =>{
  let minDist = null;
  let minDistIndex = null;
  let currentDist = 0;

  posList.forEach((pos,i)=>{
    currentDist = Math.pow(currentPos[0]-pos[0],2)+ Math.pow(currentPos[1]-pos[1],2)+ Math.pow(currentPos[2]-pos[2],2);
    if (!minDist || currentDist < minDist){
      minDist = currentDist;
      minDistIndex = i;
    }
  })
  return posList[minDistIndex]
}

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('#details button').forEach(button=>{
      button.addEventListener('click',()=>{
        Rtr.setPosition(button.dataset.x,button.dataset.y,button.dataset.z)
      })
    })
})