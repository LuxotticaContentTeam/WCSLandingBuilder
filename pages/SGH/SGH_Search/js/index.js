import { calcCoordinates } from "./utils";

window.ct_wow__search = {
  container:null,
  prod_list:null,
  placeholdersUtils:{
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
          <a href="/${prod.upc}">
              <div class="ct_wow_search__img_container">
                  <img src="https://assets.sunglasshut.com/is/image/LuxotticaRetail/${prod.upc}__STD__shad__fr.png?impolicy=SGH_bgtransparent&width=640" alt="">
              </div>
          </a>
      </li>
      `
    })
  },
  setPlaceholders:function(){
    const setMainCircle = (first)=>{
      let container = document.querySelector('#ct_wow__search .ct_wow__search__pos_placeholders__main_results ')
      if (first){
        for (let i=0; i<3;i++){
          container.innerHTML+=`
            <div class="ct_wow__search__pos_placeholders__main_result__placeholder"></div>
          `
        }
      }
      
      let coordinates = calcCoordinates(3,container.clientWidth / 2,container.clientWidth / 2,container.clientWidth / 2)
      container.querySelectorAll('div').forEach((elem,i)=>{
        elem.style.top = coordinates[i].y+'px'
        elem.style.left = coordinates[i].x+'px'
      })
    }
    const setFirstCircle = (first)=>{
      let container = this.placeholdersUtils.firstCircle.container = document.querySelector('#ct_wow__search .ct_wow__search__pos_placeholders__first_circle ')
      if (first){
        for (let i=0; i<this.placeholdersUtils.firstCircle.prodsCount;i++){
          container.innerHTML+=`
            <div class="ct_wow__search__pos_placeholders__first_circle__placeholder"></div>
          `
        }
      }
      this.placeholdersUtils.firstCircle.radius = container.clientWidth / 2;
      let coordinates = calcCoordinates(this.placeholdersUtils.firstCircle.prodsCount,this.placeholdersUtils.firstCircle.radius,this.placeholdersUtils.firstCircle.radius,this.placeholdersUtils.firstCircle.radius)
      container.querySelectorAll('div').forEach((elem,i)=>{
        elem.style.top = coordinates[i].y+'px'
        elem.style.left = coordinates[i].x+'px'
      })
    }
    const setSecondCircle=(first)=>{
      let container = this.placeholdersUtils.secondCircle.container = document.querySelector('#ct_wow__search .ct_wow__search__pos_placeholders__second_circle ')
      if(first){
        for (let i=0; i<this.placeholdersUtils.secondCircle.prodsCount;i++){
          container.innerHTML+=`
            <div class="ct_wow__search__pos_placeholders__second_circle__placeholder"></div>
          `
        }
      }
      this.placeholdersUtils.secondCircle.radius = container.clientWidth / 2;
      let coordinates = calcCoordinates(this.placeholdersUtils.secondCircle.prodsCount,this.placeholdersUtils.secondCircle.radius,this.placeholdersUtils.secondCircle.radius,this.placeholdersUtils.secondCircle.radius)
      container.querySelectorAll('div').forEach((elem,i)=>{
        elem.style.top = coordinates[i].y+'px'
        elem.style.left = coordinates[i].x+'px'
      })
    }
    const refreshCoordinates = () =>{
      setMainCircle(false);
      setFirstCircle(false);
      setSecondCircle(false);
    }

    setMainCircle(true);
    setFirstCircle(true);
    setSecondCircle(true);

    window.addEventListener('resize',refreshCoordinates)
  },


  entry:function(){
    // this.container.classList.add('in');
    document.body.style.overflow = 'hidden'
  }
}


document.addEventListener('DOMContentLoaded',()=>{
  window.ct_wow__search.init();
})