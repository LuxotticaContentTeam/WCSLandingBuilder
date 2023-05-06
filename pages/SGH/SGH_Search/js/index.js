import { calcCoordinates, debounce } from "./utils";

window.ct_wow__search = {
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
  init:function(){
    console.log('WOW SEARCH INIT')
    this.prod_list_container = document.querySelector('.ct_wow__search__products_list')
    this.buildHtml();
    this.setPlaceholders(true);
    this.entry();
    this.shuffle(this.prod_list.length-1);
    
    window.addEventListener('resize',debounce( this.refreshPositions))
    
  },
  buildHtml:function(){
    
    /**
     * Insert Products in HTML
     */
    window.ct_wow__search__products.forEach(prod=>{
    
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
    // this.container.classList.add('in');
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
   
    ct_wow__search.setPlaceholders(false);
    ct_wow__search.refreshProdPos();
    ct_wow__search.adjustProdPos();
    
  },
  adjustProdPos:function(){
    
    this.prod_list.forEach(prod=>{
      prod.elem.style.transform = `
      translate(
        ${this.placeholders.coordinates[prod.elemPos].x - prod.x }px,
        ${this.placeholders.coordinates[prod.elemPos].y - prod.y }px
      )`;
    })
  }
}


document.addEventListener('DOMContentLoaded',()=>{
  window.ct_wow__search.init();
 
})

