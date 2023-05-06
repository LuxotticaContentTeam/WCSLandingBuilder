import { calcCoordinates } from "./utils";

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
    this.setPlaceholders();
    this.entry();
    this.shuffle(this.prod_list.length-1);
    
  },
  buildHtml:function(){
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
    document.querySelectorAll( '#ct_wow__search .ct_wow_search__product .ct_wow_search__product__wrap').forEach(elem=>{
      
      this.prod_list.push({
        elem,
        x:elem.getBoundingClientRect().x + elem.clientWidth/2,
        y:elem.getBoundingClientRect().y + elem.clientHeight/2,
      })
    })
   
   
  },
 
  setPlaceholders:function(){
    const setPlaceholderCircle = (first) =>{
      let circles = Object.keys(this.placeholders.utils);
      let comulativePos = 0;
      circles.forEach((circleID,circleN)=>{
        
        let container = this.placeholders.utils[circleID].container = document.querySelector(`#ct_wow__search .ct_wow__search__pos_placeholders__${circleID} `)
        if (first){
          for (let i=0; i<this.placeholders.utils[circleID].prodsCount;i++){
            container.innerHTML+=`
              <div class="ct_wow__search__pos_placeholders__${circleID}__placeholder"></div>
            `
          }
        }
        this.placeholders.utils[circleID].radius = container.clientWidth / 2;
        let coordinates = calcCoordinates(this.placeholders.utils[circleID].prodsCount,this.placeholders.utils[circleID].radius)
        
        container.querySelectorAll('div').forEach((elem,i)=>{
          elem.style.top = coordinates[i].y+'px'
          elem.style.left = coordinates[i].x+'px'

          this.placeholders.coordinates.push({
            elem,
            x:elem.getBoundingClientRect().x + elem.clientWidth/2,
            y:elem.getBoundingClientRect().y + elem.clientHeight/2,
            pos: i + comulativePos
          })
        })
        comulativePos += this.placeholders.utils[circleID].prodsCount;
      })
    
    }
    const refreshCoordinates = () =>{
      setPlaceholderCircle(false);
    }

   
    setPlaceholderCircle(true);
    window.addEventListener('resize',refreshCoordinates)
  },


  entry:function(){
    // this.container.classList.add('in');
    document.body.style.overflow = 'hidden'
  },
  shuffle:function(missingValues){
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
      
      let currentProd = this.shuffleData.missingProd[prod_n]
      this.prod_list[this.prod_list.indexOf(currentProd)] = {...this.prod_list[this.prod_list.indexOf(currentProd)],elemPos:this.shuffleData.missingPos[pos_n].pos}
      this.shuffleData.missingProd[prod_n].elem.style.transform = `
        translate(
          ${this.shuffleData.missingPos[pos_n].x - this.shuffleData.missingProd[prod_n].x }px,
          ${this.shuffleData.missingPos[pos_n].y - this.shuffleData.missingProd[prod_n].y }px
        )`;
      
      this.shuffleData.missingProd.splice(prod_n,1)    
      this.shuffleData.missingPos.splice(pos_n,1)    
      this.shuffle(missingValues-1)
      
    }
   
    
    
    this.prod_list;
    this.placeholders.coordinates;
  }
}


document.addEventListener('DOMContentLoaded',()=>{
  window.ct_wow__search.init();
 
  // console.log({pos1:pos1,left:pos1.getBoundingClientRect().x,top:pos1.getBoundingClientRect().y})

  // ct_wow__search.prod_list[0].elem.style.transform =
  //  `translate(
  //     ${ct_wow__search.placeholders.coordinates[0].x - ct_wow__search.prod_list[0].x}px,
  //     ${ct_wow__search.placeholders.coordinates[0].y - ct_wow__search.prod_list[0].y}px
  //   )`;
})