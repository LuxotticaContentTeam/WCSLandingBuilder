export const accessibility={
    init:function(active){
        if (active){
            window.ct_wow__search.structure.accessibility_mode = true;
            window.ct_wow__search.structure.prod_list_container.querySelector('.ct_wow_search__product:nth-child(2) a').focus();
            window.ct_wow__search.structure.container.classList.add('ct_wow__search__accessibility_mode')
        }else{
            console.log('not active')
        }
    } 
}