
window.ls = 0;
 function getScrollDir(){
        var st = window.pageYOffset || document.documentElement.scrollTop; 
        let dir;
        if (st > window.ls || window.scrollY == 0) {    
            dir ='down'
        } else{
            dir = 'up'
        }
        window.ls = st <= 0 ? 0 : st; 
        return dir
    }

function menuPositionHandler(){
    // console.log(getScrollDir())
    let dir = getScrollDir();
    let menu_wrap = document.querySelector('.sgh-main-menu__wrapper');
    let sgh_header = document.querySelector('.sgh-header')
    if (window.scrollY <= 100){
        if (menu_wrap.classList.contains('sgh-main-menu__down')){
            menu_wrap.classList.remove('sgh-main-menu__down')
            menu_wrap.classList.add('sgh-main-menu__top')
            if (document.body.classList.contains('has-benefitbar')){
                if (window.innerWidth > 1023){
                    sgh_header.style.height = "180px"
                }else{
                    sgh_header.style.height = "148px"
                }
            }else{
                if (window.innerWidth > 1023){
                    sgh_header.style.height = "140px"
                }else{
                    sgh_header.style.height = "108px"
                }
            }
        }
    }else{
        if (dir === 'down' && !menu_wrap.classList.contains('sgh-main-menu__down')){
           
            menu_wrap.classList.add('sgh-main-menu__down')
            menu_wrap.classList.remove('sgh-main-menu__top')
            if (window.innerWidth > 1023){

                sgh_header.style.height = "40px"
            }else{
                sgh_header.style.height = "48px"
            }
          
        }
        if (dir === 'up' && !menu_wrap.classList.contains('sgh-main-menu__top')){
            menu_wrap.classList.add('sgh-main-menu__top')
            menu_wrap.classList.remove('sgh-main-menu__down')
            if (document.body.classList.contains('has-benefitbar')){
                if (window.innerWidth > 1023){
                    sgh_header.style.height = "180px"
                }else{
                    sgh_header.style.height = "148px"
                }
            }else{
                if (window.innerWidth > 1023){
                    sgh_header.style.height = "140px"
                }else{
                    sgh_header.style.height = "108px"
                }
            }
            
        }
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    if(window.innerWidth > 1023){

        document.getElementById('remove_desk').remove()
    }
    let strip = document.createElement('div');
    strip.innerHTML = 'BENEFIT BAR'
    strip.classList.add('benefit-bar')
   
    if (window.promo){
        document.querySelector('.sgh-main-menu__wrapper').append(strip)
        document.body.classList.add('has-benefitbar')
    }
   
    setTimeout(function(){
        window.wcs_config= {
            catalogId: "20603",
            currency:"GBP",
            langId: "-24",
            locale: "fr_fr",
            storeId: "11352"
        }
    },200)
   
    document.addEventListener("scroll", function(){ 
        menuPositionHandler()
    })
   
})