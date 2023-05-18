import { loader } from "./modules/loader";
import { storeInfo } from "./modules/storeInfo";
import { calcCoordinates, customLog, debounce } from "./modules/utils";

window.ct_wow__search__start = function(){
  if (!window.ct_wow__search_structure.container){
    const SELECTOR="body";
    let div = document.createElement('div')
    div.id = "ct_wow__search__container"
    div.innerHTML= window.ct_wow__search__template;
    document.querySelector(SELECTOR).appendChild(div)
    loader.init(true)
    window.ct_wow__search_structure.init();
  }else{
    
    window.ct_wow__search_structure.init({reopen:true});
  }

}


window.ct_wow__search_structure = {
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
    coordinates:[]
  },
  init: async function(reopen){
    customLog('WOW SEARCH INIT');
    if (!reopen){
      this.container = document.querySelector('#ct_wow__search');
      this.prod_list_container = document.querySelector('.ct_wow__search__products_list')
      this.buildHtml();
      this.setPlaceholders(true);
    }
    this.entry();
    
   
   
   
    if (!reopen){
      this.setMouseMove();
      this.setCloseHandler()
      window.addEventListener('resize',debounce( this.refreshPositions));
      document.addEventListener('loaderOut',this.animationIn)
      let wcs_config = await storeInfo.getInfo();
      if(wcs_config){
        ct_wow__search_questions.init();
      }else{
        console.log('NOT WCS CONFIG')
      }
    }
    
    
  },
  buildHtml:function(){
    /**
     * Insert Products in HTML
     */
    window.ct_wow__search__data_products.forEach(prod=>{
    
      this.prod_list_container.innerHTML+=`
      <li class="ct_wow_search__product">
        <div class="ct_wow_search__product__wrap">
          <a href="/${prod.upc}">
              <div class="ct_wow_search__img_container">
                  <img src="https://assets.sunglasshut.com/is/image/LuxotticaRetail/${prod.upc}__STD__shad__fr.png?impolicy=SGH_bgtransparent&width=640" alt="">
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
    document.body.style.overflow = 'hidden'
  },
  shuffle:function(missingValues){
    /**
     * random positioning the products
     * creating a clone of the original prods and pos(placeholders) arrays
     * get a random prod and a random pos, then remove the prod positioned and the placeholder used
     * recall recursively the function until all prods are positioned
     */
    if (missingValues === this.prod_list.length-1){    
      this.shuffleData.missingProd=[...this.prod_list];
      this.shuffleData.missingPos=[...this.placeholders.coordinates];
    }
    if (missingValues < 0){
      return
    }
   
    else{
      let prod_n = Math.floor(Math.random()*missingValues);
      let pos_n = Math.floor(Math.random()*missingValues);
      
      //saving for each prod the position asigned in absolute value [0,1,2...n-1]
      let currentProd = this.shuffleData.missingProd[prod_n]
      this.prod_list[this.prod_list.indexOf(currentProd)] = {...this.prod_list[this.prod_list.indexOf(currentProd)],elemPos:this.shuffleData.missingPos[pos_n].pos}
      
      //positioning the prod 
      this.shuffleData.missingProd[prod_n].elem.style.transform = `
        translate(
          ${this.shuffleData.missingPos[pos_n].x - this.shuffleData.missingProd[prod_n].x }px,
          ${this.shuffleData.missingPos[pos_n].y - this.shuffleData.missingProd[prod_n].y }px
        )`;
      
      //scaling the prod
      if (this.shuffleData.missingPos[pos_n].pos < 3){
        this.shuffleData.missingProd[prod_n].scalingElem.style.transform = "translate(-50%,-50%) scale(2)";
      }
      if (this.shuffleData.missingPos[pos_n].pos >= 3 && this.shuffleData.missingPos[pos_n].pos < (this.placeholders.utils.secondCircle.prodsCount + 3) ){
        this.shuffleData.missingProd[prod_n].scalingElem.style.transform = "translate(-50%,-50%) scale(1.1)";
      }
      if( this.shuffleData.missingPos[pos_n].pos >= (this.placeholders.utils.secondCircle.prodsCount + 3) ){
        this.shuffleData.missingProd[prod_n].scalingElem.style.transform = "translate(-50%,-50%) scale(.6)";
      }
    
      
      //removing from the clone arrays the prod positioned and the position used
      this.shuffleData.missingProd.splice(prod_n,1)    
      this.shuffleData.missingPos.splice(pos_n,1)    
      this.shuffle(missingValues-1)
      
    }
   
    
    
    this.prod_list;
    this.placeholders.coordinates;
  },
  refreshPositions:function(){
    console.log('refresh')
   
    ct_wow__search_structure.setPlaceholders(false);
    ct_wow__search_structure.refreshProdPos();
    ct_wow__search_structure.adjustProdPos();
    
  },
  adjustProdPos:function(){
    
    this.prod_list.forEach(prod=>{
      prod.elem.style.transform = `
      translate(
        ${this.placeholders.coordinates[prod.elemPos].x - prod.x }px,
        ${this.placeholders.coordinates[prod.elemPos].y - prod.y }px
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
  animationIn:function(){
    customLog('animationIIN')
    window.ct_wow__search_structure.prod_list_container.classList.add('ct_in')
  },
  setCloseHandler:function(){
    this.container.querySelector('#ct_wow__search__close').addEventListener('click',()=>{
      this.container.classList.remove('ct_in');
      document.body.style.overflow = 'auto'
      this.resetStructure();
      window.ct_wow__search_questions.resetQuestions();
    });
   
  },
  resetStructure:function(){
    customLog('rest')
    this.prod_list_container.querySelectorAll('.ct_wow_search__product__wrap').forEach(prod=>{
      prod.style.transform = "none";
      prod.querySelector('a').style.transform = "translate(-50%,-50%)";
    });
  }
}

window.ct_wow__search_questions = {
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
    state:{}
  },
  buttons:{
    next:null,
    prev:null
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
    this.buttons.next = document.querySelector('.ct_wow__search__input_commands__next')
    this.buttons.prev = document.querySelector('.ct_wow__search__input_commands__prev')

  },
  fillData:function(){
    this.stepsCount = ct_wow__search__data_question.length;
    this.progress.container.querySelector('.ct_wow__search__input_progress__current + span').innerHTML = ` /${this.stepsCount}`
    this.updateProgress()
    this.updateQuestionCopy();
    this.buildAnswers();
    this.updateAnswer()
  },
  setButtonsHandler:function(){
    this.buttons.prev.addEventListener('click',()=>{this.changeQuestions('prev')});
    this.buttons.next.addEventListener('click',()=>{this.changeQuestions('next')});
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
  updateQuestionCopy:function(){
    this.questions.container.querySelector('h3').style.opacity = 0;
    setTimeout(()=>{
      this.questions.container.querySelector('h3').innerHTML = window.ct_wow__search__data_question[this.progress.state - 1].question["en"];
      this.questions.container.querySelector('h3').style.opacity = 1;
    },400)
   
  },
  buildAnswers:function(){
    let answers="";
    window.ct_wow__search__data_question.forEach((question,i)=>{
      answers+=`<div class="ct_wow__search__input_answer" data-answer="${i}">`
      
      question.answers.forEach(answer=>{
        answers += `
        <button class="ct_cta ct_cta__white ">${answer["en"]}</button>
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
          
          window.ct_wow__search_structure.shuffle(29);
          if(button.parentNode.querySelector('button.ct_active')){
            button.parentNode.querySelector('button.ct_active').classList.remove('ct_active');
          }
          button.classList.add('ct_active');
          button.parentNode.classList.add('ct_aswered');
          this.container.classList.add('ct_can_proceed');
          if (this.progress.state < 5){

            this.changeQuestions('next');
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
  changeQuestions:function(dir){
  
    if (!this.blockerActive){
      if (dir ==='next'){
        this.progress.state+= 1;
        if (this.progress.state === this.stepsCount && !this.buttons.next.classList.contains('ct_disabled') ){
          this.buttons.next.classList.add('ct_disabled')
        }
        if (!this.answers.container.querySelector(`.ct_wow__search__input_answer[data-answer="${this.progress.state-1}"]`).classList.contains('ct_aswered')){
          this.container.classList.remove('ct_can_proceed');
        }
        if(this.buttons.prev.classList.contains('ct_disabled')){
          this.buttons.prev.classList.remove('ct_disabled')
        }
         
      }else{
        this.progress.state-= 1;
        if (this.progress.state === 1 && !this.buttons.prev.classList.contains('ct_disabled')){
          this.buttons.prev.classList.add('ct_disabled')
        }
        if(this.buttons.next.classList.contains('ct_disabled')){
          this.buttons.next.classList.remove('ct_disabled')
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
  resetQuestions:function(){
    customLog('resetQuestions');
    this.progress.state = 0;
    this.answers.container.querySelectorAll('button.ct_active').forEach(button=>button.classList.remove('ct_active'))
    this.answers.container.querySelectorAll('ct_aswered').forEach(aswered=>aswered.classList.remove('ct_aswered'))
    this.container.classList.remove('ct_can_proceed');
    this.changeQuestions('next')
  }
  
}




