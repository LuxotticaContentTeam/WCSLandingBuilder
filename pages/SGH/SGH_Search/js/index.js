window.ct_wow__search = {
  container:null,
  prod_list:null,
  init:function(){
    console.log('WOW SEARCH INIT')
    this.prod_list = document.querySelector('.ct_wow__search__products_list')
    this.buildHtml();
   
    this.entry();
  
    
  },
  buildHtml:function(){
    window.ct_wow__search__products.forEach(prod=>{
      console.log(prod)
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
  entry:function(){
    // this.container.classList.add('in');
    document.body.style.overflow = 'hidden'
  }
}


document.addEventListener('DOMContentLoaded',()=>{
  window.ct_wow__search.init();
})