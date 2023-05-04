import { calcCoordinates } from "./utils";

window.ct_wow__search = {
  container:null,
  prod_list:null,
  placeholders:{
    utils:{
      mainCircle:{
        container:null,
        prodsCount:3,
        radius:null
      },
      firstCircle:{
        container:null,
        prodsCount:15,
        radius:null
      },
      secondCircle:{
        container:null,
        prodsCount:17,
      }
    },
    coordinates:[]
  },
  init:function(){
    console.log('WOW SEARCH INIT')
    this.prod_list = document.querySelector('.ct_wow__search__products_list')
    this.buildHtml();
    this.setPlaceholders();
    this.entry();
  
    
  },
  buildHtml:function(){
    window.ct_wow__search__products.forEach(prod=>{
    
      this.prod_list.innerHTML+=`
      <li class="ct_wow_search__product">
        <div class="ct_wow_search__product__wrap">
          <a href="/${prod.upc}">
              <div class="ct_wow_search__img_container">
                  <img src="https://assets.sunglasshut.com/is/image/LuxotticaRetail/${prod.upc}__STD__shad__fr.png?impolicy=SGH_bgtransparent&width=640" alt="">
              </div>
          </a>
        </div>
      </li>
      `
    })
  },
  setPlaceholders:function(){
    const setPlaceholderCircle = (first) =>{
      let circles = Object.keys(this.placeholders.utils);
      circles.forEach(circleID=>{
        let container = this.placeholders.utils[circleID].container = document.querySelector(`#ct_wow__search .ct_wow__search__pos_placeholders__${circleID} `)
        if (first){
          for (let i=0; i<this.placeholders.utils[circleID].prodsCount;i++){
            container.innerHTML+=`
              <div class="ct_wow__search__pos_placeholders__${circleID}__placeholder"></div>
            `
          }
        }
        this.placeholders.utils[circleID].radius = container.clientWidth / 2;
        let coordinates = calcCoordinates(this.placeholders.utils[circleID].prodsCount,this.placeholders.utils[circleID].radius,this.placeholders.utils[circleID].radius,this.placeholders.utils[circleID].radius)
        
        container.querySelectorAll('div').forEach((elem,i)=>{
          elem.style.top = coordinates[i].y+'px'
          elem.style.left = coordinates[i].x+'px'
        })
      })
    
    }
    const refreshCoordinates = () =>{
      setPlaceholderCircle(true);
    }

   
    setPlaceholderCircle(true);
    window.addEventListener('resize',refreshCoordinates)
  },


  entry:function(){
    // this.container.classList.add('in');
    document.body.style.overflow = 'hidden'
  }
}


document.addEventListener('DOMContentLoaded',()=>{
  window.ct_wow__search.init();
  window.prod = document.querySelector('#ct_wow__search > div > ul > li:nth-child(4)')
  console.log({prod:prod,left:prod.getBoundingClientRect().x,top:prod.getBoundingClientRect().y})
  window.pos1 = document.querySelector('#ct_wow__search > div > div > div > div.ct_wow__search__pos_placeholders__mainCircle > div:nth-child(3)')
  console.log({pos1:pos1,left:pos1.getBoundingClientRect().x,top:pos1.getBoundingClientRect().y})

  window.prod = prod.querySelector('.ct_wow_search__product__wrap').style.transform = `translate(${pos1.getBoundingClientRect().x-prod.getBoundingClientRect().x - prod.clientWidth/2 + pos1.clientWidth/2}px,${pos1.getBoundingClientRect().y-prod.getBoundingClientRect().y-prod.clientHeight/2 + pos1.clientHeight/2}px)`
})