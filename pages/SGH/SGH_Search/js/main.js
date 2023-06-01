import { loader } from "./modules/loader";
import { storeInfo } from "./modules/storeInfo";
import { calcCoordinates, customLog, debounce, getDevice } from "./modules/utils";



window.ct_wow__search.structure = { 
  device:getDevice(),
  container:null,
  prod_list_container:null,
  prod_list:[],
  shuffleData:{
    missingProd:null,
    missingPos:null
  },
  placeholders:{
    utils:{
      mainCircle:{
        container:null,
        prodsCount:3,
        radius:null
      },
      firstCircle:{
        container:null,
        prodsCount:13,
        radius:null
      },
      secondCircle:{
        container:null,
        prodsCount:14,
      }
    },
    coordinates:[],
  },
  init: function(reopen){
    customLog('WOW SEARCH INIT');
    storeInfo.getInfo();
    
    if (!reopen){
      this.container = document.querySelector('#ct_wow__search');
      this.setCloseHandler();
      this.prod_list_container = document.querySelector('.ct_wow__search__products_list');
      if (this.device === 'D'){
        this.setMouseMove();
      }
    }

    if (this.device != 'D'){
      this.calcHeight();
    }
  
    if (!reopen){
      this.buildHtml();
      this.setPlaceholders(true);
      ct_wow__search.inputManagement.init(); 
    }
    this.entry();
    window.addEventListener('resize', this.refreshPositionsDebounced);

    // if (this.device === "M"){
    //   this.zoomHandler()
    // }
   
    
  },
  calcHeight:function(){
    customLog('Calc Height')
    window.ct_wow__search.structure.container.style.setProperty("--ct-wow-search-height", `${window.innerHeight}px`)
  },
  buildHtml:function(){
    /**
     * Insert Products in HTML
     */
    let url_first_part = 'https://www.sunglasshut.com/us'//tochange
    Object.keys(window.ct_wow__search.data.products).forEach(upc=>{
    
      this.prod_list_container.innerHTML+=`
      <li class="ct_wow_search__product" data-upc="${upc}">
        <div class="ct_wow_search__product__wrap">
          <a href="${url_first_part+window.ct_wow__search.data.products[upc].url}" aria-label="shop now ${upc}" data-element-id="X_X_WowSearch_Banner" data-description-="${upc}">
              <div class="ct_wow_search__img_container">
                  <img src="${window.ct_wow__search.data.products[upc].img?window.ct_wow__search.data.products[upc].img: "https://assets.sunglasshut.com/is/image/LuxotticaRetail/"+ upc+"__STD__shad__fr.png?impolicy=SGH_bgtransparent&width=640"}" alt="${upc}">
              </div>
          </a>
        </div>
      </li>
      `;
      
    });
     /**
     * define start position for each prod
     */
    document.querySelectorAll( '#ct_wow__search .ct_wow_search__product').forEach(elem=>{
      
      this.prod_list.push({
        originElem:elem,
        elem:elem.querySelector('.ct_wow_search__product__wrap'),
        x:elem.getBoundingClientRect().x + elem.clientWidth/2,
        y:elem.getBoundingClientRect().y + elem.clientHeight/2,
        scalingElem:elem.querySelector('.ct_wow_search__product__wrap a'),
        upc: elem.dataset.upc,
        pos:null,
        score:0,
      })
    })
   
   
  },
  refreshProdPos:function(){
    this.prod_list.forEach(prod=>{
      prod.x = prod.originElem.getBoundingClientRect().x + prod.originElem.clientWidth/2,
      prod.y = prod.originElem.getBoundingClientRect().y + prod.originElem.clientWidth/2
    })
  },
  setPlaceholders:function(first){
    /**
     *  set placeholders, to positioning the products
     */
    const setPlaceholderCircle = (first) =>{
      let circles = Object.keys(this.placeholders.utils);
      let comulativePos = 0; 

      /**
       * inserting placeholders in the HTML
       * 3 circle based on the matching values of the aswsers
       * using function also for ripositioning the placeholder on resize
       */
      circles.forEach((circleID,circleN)=>{
        
        let container = this.placeholders.utils[circleID].container = document.querySelector(`#ct_wow__search .ct_wow__search__pos_placeholders__${circleID} `)
        if (first){ // inserting placeholder in the HTML just the first time
          for (let i=0; i<this.placeholders.utils[circleID].prodsCount;i++){
            container.innerHTML+=`
              <div class="ct_wow__search__pos_placeholders__${circleID}__placeholder"></div>
            `
          }
        }
        /**
         * disposing the placeholders in circles
         */
        this.placeholders.utils[circleID].radius = container.clientWidth / 2;
        let coordinates = calcCoordinates(this.placeholders.utils[circleID].prodsCount,this.placeholders.utils[circleID].radius)
        
        container.querySelectorAll('div').forEach((elem,i)=>{
          elem.style.top = coordinates[i].y+'px'
          elem.style.left = coordinates[i].x+'px'

          /**
           * saving each placeholder positions
           * if first set elem, coordinates and position
           * if !first so on risize, refresh coordinates values
           */
          if(first){
            this.placeholders.coordinates.push({
              elem,
              x:elem.getBoundingClientRect().x + elem.clientWidth/2,
              y:elem.getBoundingClientRect().y + elem.clientHeight/2,
              pos: i + comulativePos //adjust the correct position based on the current cirlce
            })
          }
          else{
            this.placeholders.coordinates[i + comulativePos].x = this.placeholders.coordinates[i + comulativePos].elem.getBoundingClientRect().x + this.placeholders.coordinates[i + comulativePos].elem.clientWidth/2;
            this.placeholders.coordinates[i + comulativePos].y = this.placeholders.coordinates[i + comulativePos].elem.getBoundingClientRect().y + this.placeholders.coordinates[i + comulativePos].elem.clientHeight/2;
          }
        })
        comulativePos += this.placeholders.utils[circleID].prodsCount;
      })
    
    }

    setPlaceholderCircle(first);
    
  },

  entry:function(){
    this.container.classList.add('ct_in');
    document.body.style.overflow = 'hidden';
    document.addEventListener('loaderOut', ()=>{ 
      window.ct_wow__search.structure.prod_list_container.classList.add('ct_in')
    })
    loader.init(1500)
  },
  // shuffle:function(missingValues){
  //   /**
  //    * random positioning the products
  //    * creating a clone of the original prods and pos(placeholders) arrays
  //    * get a random prod and a random pos, then remove the prod positioned and the placeholder used
  //    * recall recursively the function until all prods are positioned
  //    */
  //   if (missingValues === this.prod_list.length-1){    
  //     this.shuffleData.missingProd=[...this.prod_list];
  //     this.shuffleData.missingPos=[...this.placeholders.coordinates];
   
  //   }
  //   if (missingValues < 0){
  //     return
  //   }
   
  //   else{
  //     let prod_n = Math.floor(Math.random()*missingValues);
  //     let pos_n = Math.floor(Math.random()*missingValues);
      
  //     //saving for each prod the position asigned in absolute value [0,1,2...n-1]
  //     let currentProd = this.shuffleData.missingProd[prod_n]
  //     this.prod_list[this.prod_list.indexOf(currentProd)] = {...this.prod_list[this.prod_list.indexOf(currentProd)],elemPos:this.shuffleData.missingPos[pos_n].pos}
      
  //     //positioning the prod 
  //     this.shuffleData.missingProd[prod_n].elem.style.transform = `
  //       translate(
  //         ${this.shuffleData.missingPos[pos_n].x - this.shuffleData.missingProd[prod_n].x }px,
  //         ${this.shuffleData.missingPos[pos_n].y - this.shuffleData.missingProd[prod_n].y }px
  //       )`;
      
  //     //scaling the prod
  //     if (this.shuffleData.missingPos[pos_n].pos < 3){
  //       this.shuffleData.missingProd[prod_n].scalingElem.style.transform = "translate(-50%,-50%) scale(2)";
  //     }
  //     if (this.shuffleData.missingPos[pos_n].pos >= 3 && this.shuffleData.missingPos[pos_n].pos < (this.placeholders.utils.secondCircle.prodsCount + 3) ){
  //       this.shuffleData.missingProd[prod_n].scalingElem.style.transform = "translate(-50%,-50%) scale(1.1)";
  //     }
  //     if( this.shuffleData.missingPos[pos_n].pos >= (this.placeholders.utils.secondCircle.prodsCount + 3) ){
  //       this.shuffleData.missingProd[prod_n].scalingElem.style.transform = "translate(-50%,-50%) scale(.6)";
  //     }
    
      
  //     //removing from the clone arrays the prod positioned and the position used
  //     this.shuffleData.missingProd.splice(prod_n,1)    
  //     this.shuffleData.missingPos.splice(pos_n,1)    
  //     this.shuffle(missingValues-1)
      
  //   }
   
    
  //   if (missingValues === this.prod_list.length-1){    
      
  //     if (this.device != 'D'){
  //       window.ct_wow__search.structure.prod_list_container.style.transform = `scale(1)`
  //       this.prod_list_container.parentNode.scrollTop = 0;
  //       this.prod_list_container.parentNode.scrollLeft = this.prod_list_container.parentNode.clientWidth / 4;
  //     }
      
  //     this.refreshPositions()
  //     window.addEventListener('resize', this.refreshPositionsDebounced);
  //   }
  //   // this.prod_list;
  //   // this.placeholders.coordinates;
  // },
  rankingProducts:function(qIndex,aIndex){
    window.ct_wow__search.inputManagement.answers.state[qIndex] = parseInt( aIndex)
    // console.log({question:qIndex,answer:aIndex});
    //calc each product score
    this.prod_list.forEach(prod=>{
       prod.score = this.calcScore(prod.upc);
    })
    //ordering based on score
    this.prod_list.sort((a,b)=>(a.score < b.score)?1:-1);

    //positioning and scaling products based on order
    this.prod_list.forEach((prod,i)=>{
      prod.elem.style.transform = `
      translate(
        ${this.placeholders.coordinates[i].x - prod.x }px,
        ${this.placeholders.coordinates[i].y - prod.y  }px
      )`;

      if (i < 3){
        prod.scalingElem.style.transform = "translate(-50%,-50%) scale(2)";
      }
      if(i>=3 && i<this.placeholders.utils.secondCircle.prodsCount + 3){
        prod.scalingElem.style.transform = "translate(-50%,-50%) scale(1.1)";
      }
      if(i>=this.placeholders.utils.secondCircle.prodsCount + 3){
        prod.scalingElem.style.transform = "translate(-50%,-50%) scale(.6)";
      }
    });
   
    window.ct_wow__search.inputManagement.results.state = [
      this.prod_list[0].upc,
      this.prod_list[1].upc,
      this.prod_list[2].upc,
      this.prod_list[3].upc,
    ]
  },
  calcScore:function(upc){
    let score = 0;
    window.ct_wow__search.inputManagement.answers.state.forEach((answer,question)=>{
      score += window.ct_wow__search.data.products[upc].specs[question][answer]
    })
    return score
  },
  /**
   * apply debounce function to resize refresh, 
   * so it refresh the position only when the resize it's ended
   */
 
  refreshPositionsDebounced:debounce(()=>{ 
    if (ct_wow__search.structure.device != 'D'){
      ct_wow__search.structure.prod_list_container.parentNode.scrollTop = 0;
      ct_wow__search.structure.prod_list_container.parentNode.scrollLeft = ct_wow__search.structure.prod_list_container.parentNode.clientWidth / 4;
    }
    if (ct_wow__search.structure.container.classList.contains('ct_shuffled')){
      ct_wow__search.structure.setPlaceholders(false);
      ct_wow__search.structure.refreshProdPos();
      ct_wow__search.structure.adjustProdPos();
    }
    
  }),
  refreshPositions:function(){ 
    if (ct_wow__search.structure.device != 'D'){
      ct_wow__search.structure.prod_list_container.parentNode.scrollTop = 0;
      ct_wow__search.structure.prod_list_container.parentNode.scrollLeft = ct_wow__search.structure.prod_list_container.parentNode.clientWidth / 4;
    }
    if (this.container.classList.contains('ct_shuffled')){
      ct_wow__search.structure.setPlaceholders(false);
      ct_wow__search.structure.refreshProdPos();
      ct_wow__search.structure.adjustProdPos();
    }
    
  },
  adjustProdPos:function(){
    
    this.prod_list.forEach((prod,i)=>{
      prod.elem.style.transform = `
      translate(
        ${this.placeholders.coordinates[i].x - prod.x }px,
        ${this.placeholders.coordinates[i].y - prod.y }px
      )`;
    })
  },
  setMouseMove:function(){
    this.prod_list_container.addEventListener('mousemove',e=>{
      this.prod_list_container.style.transform = `translate(${-(e.clientX - window.innerWidth/2)*.01}px,${-(e.clientY - window.innerHeight/2)*.01}px)`
    })
    document.querySelector('#ct_wow__search__input').addEventListener('mouseenter',e=>{
      this.prod_list_container.style.transform = `translate(0,0)`
    })
  },
  // zoomHandler:function(){
  //   var scaling = false;
  //   function touchHandler(event){
  //     if(event.touches.length > 1){
      
  //       console.log('start pinch',event)
  //       scaling = true;
  //       event.preventDefault()
  //     }
  //   }
  //   function touchMove(event){
  //     if(scaling){
  //       console.log('moving',event.scale)

  //       if (event.scale > 1){
  //         window.ct_wow__search_structure.prod_list_container.style.transform = `scale(${Math.min(1.25,event.scale)})`

  //       }else{
  //         window.ct_wow__search_structure.prod_list_container.style.transform = `scale(${Math.max(1,event.scale)})`
  //       }
  //     }
  //   }
  //   function touchEnd(event){
  //     if (scaling) {
  //       console.log('end',event)
  //       scaling = false;
  //     }
  //   }
  //   this.prod_list_container.addEventListener("touchstart", touchHandler, false);
  //   this.prod_list_container.addEventListener("touchmove", touchMove, false);
  //   this.prod_list_container.addEventListener("touchend", touchEnd, false);
    
    

  // },
 
  setCloseHandler:function(){
    this.container.querySelector('#ct_wow__search__close').addEventListener('click',()=>{
      this.container.classList.remove('ct_in');
      document.body.style.overflow = 'auto'
      //reset structure
      this.resetStructure();
      //reset questions
      window.ct_wow__search.inputManagement.resetQuestions();
      window.removeEventListener('resize',window.ct_wow__search.structure.refreshPositionsDebounced)
    });
   
  },
  resetStructure:function(){
    customLog('- RESET Structure -')
    window.ct_wow__search.structure.prod_list_container.style.transform = `scale(1)`
    this.prod_list_container.querySelectorAll('.ct_wow_search__product__wrap').forEach(prod=>{
      prod.style.transform = "none";
      prod.querySelector('a').style.transform = "translate(-50%,-50%)";
    });
  }
}

window.ct_wow__search.inputManagement = {
  container:null,
  stepsCount:0,
  blockerActive:false,
  progress:{
    container:null,
    current:null,
    state:1,
    style:null
  },
  questions:{
    container:null,
    state:0
  },
  answers:{
    container:null,
    state:[]
  },
  buttons:{
    next:null,
    prev:null,
    results:null,
    restart:null
  },
  results:{
    container:null,
    state:[]
  },
  init:function(reopen){
    
    this.setElements()
    this.fillData();
    this.setButtonsHandler();

  },
  setElements:function(){
    this.container = document.querySelector('#ct_wow__search__input');
    this.progress.container = document.querySelector('.ct_wow__search__input_progress'); 
    this.progress.current = document.querySelector('.ct_wow__search__input_progress .ct_wow__search__input_progress__current'); 
    this.questions.container = document.querySelector('.ct_wow__search__input_questions');
    this.answers.container = document.querySelector('.ct_wow__search__input_answers');
    
    this.buttons.next = document.querySelector('.ct_wow__search__input_commands__next');
    this.buttons.prev = document.querySelector('.ct_wow__search__input_commands__prev');
    this.buttons.results = document.querySelector('.ct_wow__search__input_commands__results');
    this.buttons.restart = document.querySelector('.ct_wow__search__restart');

    this.results.container = document.querySelector('#ct_wow__search__results');

  },
  fillData:function(){
    this.stepsCount = ct_wow__search.data.questions.length;
    this.progress.container.querySelector('.ct_wow__search__input_progress__current + span').innerHTML = ` /${this.stepsCount}`
    this.updateProgress();
    this.setButtonCopy();
    this.updateQuestionCopy();
    this.buildAnswers();
    this.updateAnswer();
    this.setResultsCopy();
  },
  setButtonsHandler:function(){
    this.buttons.prev.addEventListener('click',()=>{this.changeQuestions('prev')});
    this.buttons.next.addEventListener('click',()=>{this.changeQuestions('next')});
    this.buttons.results.addEventListener('click',()=>{this.showResult()});
    this.buttons.restart.addEventListener('click',()=>{this.restartQuiz()});
  },
  updateProgress:function(dir){
    this.blockerActive = true;
   
    if (dir){
      //set element positioning
      this.progress.current.dataset.next = this.progress.state; 
      this.progress.container.style.setProperty('--ct-wow-search-input-progress-before-opacity',"1");
      this.progress.container.style.setProperty('--ct-wow-search-input-progress-after-opacity',"0");
      this.progress.current.querySelector('span').style.opacity = 0;
      this.progress.container.style.setProperty('--ct-wow-search-input-progress-before-translate',"translateY(0)");
      if (dir ==='next'){
        this.progress.container.style.setProperty('--ct-wow-search-input-progress-after-translate',"translateY(-100%)");  
      }else{
         this.progress.container.style.setProperty('--ct-wow-search-input-progress-after-translate',"translateY(100%)");  
      }

      setTimeout(()=>{
        // start animation
        this.progress.current.classList.add('ct_animation');
        this.progress.container.style.setProperty('--ct-wow-search-input-progress-after-translate',"translateY(0%)");  
        this.progress.container.style.setProperty('--ct-wow-search-input-progress-after-opacity',"1");  
        if (dir ==='next'){
          this.progress.container.style.setProperty('--ct-wow-search-input-progress-before-translate',"translateY(100%)");
        }else{
          this.progress.container.style.setProperty('--ct-wow-search-input-progress-before-translate',"translateY(-100%)");
        }
        this.progress.container.style.setProperty('--ct-wow-search-input-progress-before-opacity',"0");
      },10)
     
    }
    
    setTimeout(()=>{
      this.progress.container.querySelector('.ct_wow__search__input_progress__current span').innerHTML = this.progress.state;
      this.progress.current.dataset.current =this.progress.state;
      this.progress.current.querySelector('span').style.opacity = 1;
      this.progress.current.classList.remove('ct_animation');
      this.blockerActive = false;
    },410)
    
  
   
    
   
  },
  setButtonCopy:function(){
    this.buttons.prev.querySelector('span').innerHTML = storeInfo.getLang(window.ct_wow__search.data.copy.inputs.next);
    this.buttons.next.querySelector('span').innerHTML = storeInfo.getLang(window.ct_wow__search.data.copy.inputs.prev);
    this.buttons.results.querySelector('span').innerHTML = storeInfo.getLang(window.ct_wow__search.data.copy.inputs.showResults);
    this.buttons.restart.innerHTML = storeInfo.getLang(window.ct_wow__search.data.copy.results.restart);
  },
  updateQuestionCopy:function(){
    this.questions.container.querySelector('h3').style.opacity = 0;
    setTimeout(()=>{
      this.questions.container.querySelector('h3').innerHTML = storeInfo.getLang( window.ct_wow__search.data.questions[this.progress.state - 1].question);
      this.questions.container.querySelector('h3').style.opacity = 1;
    },400)
   
  },
  buildAnswers:function(){
    let answers="";
  
    window.ct_wow__search.data.questions.forEach((question,qindex)=>{
      answers+=`<div class="ct_wow__search__input_answer" data-answer="${qindex}">`
      question.answers.forEach((answer,aindex)=>{
        answers += `
        <div class="ct_wow__search__button_wrap">
          <button class="ct_cta ct_cta__white " data-q="${ qindex }" data-a="${aindex}">${storeInfo.getLang( answer)}</button>
        </div>
        `
      })
      answers+="</div>"
    })
    this.answers.container.innerHTML = answers;
    this.answersButtonHandler();
  },
  answersButtonHandler:function(){
    this.answers.container.querySelectorAll('button').forEach(button=>{
      button.addEventListener('click',()=>{
        if (!button.classList.contains('ct_active')){
          
          if (!window.ct_wow__search.structure.container.classList.contains('ct_shuffled')){
            window.ct_wow__search.structure.container.classList.add('ct_shuffled')
          }
          window.ct_wow__search.structure.refreshPositions()
          window.ct_wow__search.structure.rankingProducts(button.dataset.q,button.dataset.a);
          
          if(button.parentNode.parentNode.querySelector('button.ct_active')){
            button.parentNode.parentNode.querySelector('button.ct_active').classList.remove('ct_active');
          }
          button.classList.add('ct_active');
          button.parentNode.parentNode.classList.add('ct_aswered');
          this.container.classList.add('ct_can_proceed');
          if (this.progress.state < this.stepsCount){

            this.changeQuestions('next');
          }else{
            this.buttons.results.classList.remove('ct_disabled');
          }
        }

      })
    })
  },
  updateAnswer:function(){
    if(this.answers.container.querySelector('.ct_wow__search__input_answer.ct_active')){
      this.answers.container.querySelector('.ct_wow__search__input_answer.ct_active').classList.remove('ct_active')
    }
    this.answers.container.querySelector(`.ct_wow__search__input_answer[data-answer="${this.progress.state - 1}"]`).classList.add('ct_active')
  },
  setResultsCopy:function(){
    this.results.container.querySelector('h2').innerHTML = storeInfo.getLang(window.ct_wow__search.data.copy.results.title);
    this.results.container.querySelector('p').innerHTML = storeInfo.getLang(window.ct_wow__search.data.copy.results.subtitle);
    this.results.container.querySelector('.ct_cta.ct_cta__black').innerHTML = storeInfo.getLang(window.ct_wow__search.data.copy.results.viewAll.label);
    this.results.container.querySelector('.ct_cta.ct_cta__black').href = storeInfo.getLang(window.ct_wow__search.data.copy.results.viewAll.url);
  },
  changeQuestions:function(dir){
  
    if (!this.blockerActive){
      if (dir ==='next'){
        this.progress.state+= 1;
        if (this.progress.state === this.stepsCount && !this.buttons.next.classList.contains('ct_disabled') ){
          this.buttons.next.classList.add('ct_disabled');
          if (this.answers.container.querySelector(`.ct_wow__search__input_answer[data-answer="${this.progress.state-1}"]`).classList.contains('ct_aswered')){
            this.buttons.results.classList.remove('ct_disabled');
          }
        }
      
        if (!this.answers.container.querySelector(`.ct_wow__search__input_answer[data-answer="${this.progress.state-1}"]`).classList.contains('ct_aswered')){
          this.container.classList.remove('ct_can_proceed');
        }
        if(this.buttons.prev.classList.contains('ct_disabled')){
          this.buttons.prev.classList.remove('ct_disabled')
        }
        if (this.progress.state === 1 ){
          this.buttons.results.classList.add('ct_disabled');
          this.buttons.next.classList.remove('ct_disabled');
          this.buttons.prev.classList.add('ct_disabled');
        } 

      }else{
        this.progress.state-= 1;
        if (this.progress.state === 1 && !this.buttons.prev.classList.contains('ct_disabled')){
          this.buttons.prev.classList.add('ct_disabled')
        }
        if(this.buttons.next.classList.contains('ct_disabled')){
          this.buttons.next.classList.remove('ct_disabled');
          this.buttons.results.classList.add('ct_disabled');
        }
        if (this.answers.container.querySelector(`.ct_wow__search__input_answer[data-answer="${this.progress.state-1}"]`).classList.contains('ct_aswered')){
          this.container.classList.add('ct_can_proceed');
        }
       
      }
      this.updateProgress(dir);
      this.updateQuestionCopy();
      this.updateAnswer();
    }
  
  },
  showResult:function(){
    this.results.container.classList.add('ct_in');
    this.results.container.classList.add('ct_loader_in');
    loader.loaderIn(2000,"results");
  
    this.setResult();
    setTimeout(()=>{
      this.results.container.classList.remove('ct_loader_in')
    },2000)
  },
  setResult:function(){
    let productsContainer = this.results.container.querySelector('#ct_wow__search__results_products');
    productsContainer.innerHTML=''
   
    let url_first_part = 'https://www.sunglasshut.com/us'//tochange
  
    this.results.state.forEach(upc=>{
      
      productsContainer.innerHTML+=`
      <a href="${url_first_part+window.ct_wow__search.data.products[upc].url}" class="ct_wow__search__results_product">
          <img src="${window.ct_wow__search.data.products[upc].img?window.ct_wow__search.data.products[upc].img: "https://assets.sunglasshut.com/is/image/LuxotticaRetail/"+ upc+"__STD__shad__fr.png?impolicy=SGH_bgtransparent&width=640"}" alt="${upc}">
          <span>${window.ct_wow__search.data.products[upc].brand}</span>
        </a>
      `
    })

  },
  restartQuiz:function(){
    loader.loaderIn(1000,"restart");
  
    setTimeout(()=>{
      window.ct_wow__search.structure.resetStructure();
      this.resetQuestions();
      this.results.container.classList.remove('ct_in')
      this.results.container.classList.add('ct_loader_in')
    },400)
    
  },
  resetQuestions:function(){
    customLog('resetQuestions');
    this.progress.state = 0;
    this.answers.container.querySelectorAll('button.ct_active').forEach(button=>button.classList.remove('ct_active'))
    this.answers.container.querySelectorAll('.ct_aswered').forEach(aswered=>aswered.classList.remove('ct_aswered'))
    this.answers.state = [];
    this.container.classList.remove('ct_can_proceed');
    window.ct_wow__search.structure.container.classList.remove('ct_shuffled');
    this.results.container.classList.remove('ct_in');
    
    this.changeQuestions('next')
  }
  
}

if (!window.ct_wow__search.structure?.container){
  let div = document.createElement('div')
  div.id = "ct_wow__search__container";
  if(!window.ct_wow__search.template){

  }else{
    div.innerHTML= window.ct_wow__search.template;
    document.querySelector(window.ct_wow__search.config.selector).appendChild(div);
   
    window.ct_wow__search.structure.init();

  }
}


