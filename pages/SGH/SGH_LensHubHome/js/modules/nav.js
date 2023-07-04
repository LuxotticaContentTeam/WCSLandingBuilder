export const navManger = {
    nav:document.querySelector('.ct_nav__stick_container .ct_nav__stick_wrap'),
    nav_container:document.querySelector('.ct_nav__stick_container'),
    menu_offset:0,
    nav_offset:0,
    sectionsTopOffest:{},
    benefitBarHeight:0,
    manual_click: {
        active:false,
        section:''
    },
    inSection:false,
    init:function(){
        if (document.querySelector('.benefit-bar')){
           this.benefitBarHeight = document.querySelector('.benefit-bar').clientHeight;
        }else{
            setTimeout(()=>{
                if (document.querySelector('.benefit-bar')){
                    this.benefitBarHeight = document.querySelector('.benefit-bar').clientHeight;
                    this.setMenuOffset();
                    this.setOffsets()
                }
            },2000)
        }
        this.setOffsets()
        this.setStickyNav();
        this.setClickHandler();
        this.setActiveSection();

        this.onScrollEvents();
    },
    setOffsets:function(){
        this.setMenuOffset();
        [...document.querySelectorAll('.ct_space [data-section]')].forEach(elem=>{
            this.sectionsTopOffest[elem.dataset.section] = { 
                "top" : elem.offsetTop
            };
        });
        this.sectionsTopOffestKeys = Object.keys(this.sectionsTopOffest)
    },
    setMenuOffset:function(down){
       
        try {
            if (ct_current__device !== 'D'){
             
                if (!down){
                    if (document.querySelector('.sgh-main-menu__wrapper').classList.contains('sgh-main-menu__down')){
                        this.menu_offset =  document.querySelector('.sgh-header-top').clientHeight
                    }else{
                        this.menu_offset =     document.querySelector('.sgh-main-menu').clientHeight  + document.querySelector('.sgh-header-top').clientHeight + this.benefitBarHeight;
                    }
                }else{
                   
                    if (down === 'down'){
                        this.menu_offset =  document.querySelector('.sgh-header-top').clientHeight
                    }
                    if (down === 'up'){
                        this.menu_offset =     document.querySelector('.sgh-main-menu').clientHeight  + document.querySelector('.sgh-header-top').clientHeight + this.benefitBarHeight;
                    }
                }
            }else{
                if (!down){
                    if (document.querySelector('.sgh-main-menu__wrapper').classList.contains('sgh-main-menu__down') ){
                        this.menu_offset =  document.querySelector('.sgh-header-top').clientHeight
                    }else{
                        this.menu_offset = document.querySelector('.main-menu-center.navbar').clientHeight + document.querySelector('.sgh-header-top').clientHeight + this.benefitBarHeight;
                    }
                }else{
                  
                    if (down === 'down'){
                        this.menu_offset =  document.querySelector('.sgh-header-top').clientHeight
                    }
                    if (down === 'up'){
                        this.menu_offset = document.querySelector('.main-menu-center.navbar').clientHeight + document.querySelector('.sgh-header-top').clientHeight + this.benefitBarHeight;
                    }
                }
               
               
               
            }
    
        } catch (error) {
            console.log('Nav Erorr: ',error)
            this.menu_offset = 0;
        }
      


        this.nav_offset = this.menu_offset + this.nav.clientHeight;
    },
    setStickyNav:function(){
        if (window.scrollY + this.menu_offset >= this.nav_container.offsetTop){
           
            if (!this.nav.classList.contains('ct_stick')){
                this.nav.classList.add('ct_stick'); 
                this.setOffsets()
            }
            if (!this.nav.classList.contains('ct_hide')){

                this.nav.style.top = this.menu_offset+'px';
            }
        }else{
          
            if (this.nav.classList.contains('ct_stick')){
                this.nav.classList.remove('ct_stick');
                this.nav.style.top = 'unset';
            }
           
        }
    },
    setClickHandler:function(){
        [...document.querySelectorAll('.ct_nav__container ul button')].forEach(elem=>{
            elem.addEventListener('click',()=>{
                ct_scroll_to_section(elem.dataset.sectionTo);
                if (document.querySelector('.ct_nav__container ul button.ct_active')){
                    document.querySelector('.ct_nav__container ul button.ct_active').classList.remove("ct_active");
                }
                this.manual_click.active = true;
                this.manual_click.section = elem.dataset.sectionTo;
    
                elem.classList.add('ct_active');
                if (ct_current__device !== 'D'){
                    $('.ct_nav__stick_wrap ul').stop().animate({scrollLeft: $(elem).offset().left +   $('.ct_nav__stick_wrap ul').scrollLeft() - 8}, 500, 'linear', function() { });
                }
            })
        })
    },
    setActiveSection:function(){
        navManger.inSection = false;
        navManger.sectionsTopOffestKeys.forEach((elem,i)=>{
            if (window.scrollY + navManger.nav_offset >= navManger.sectionsTopOffest[elem].top && window.scrollY + navManger.nav_offset < navManger.sectionsTopOffest[navManger.sectionsTopOffestKeys[i+1]]?.top ){
                navManger.inSection = true;
                if(navManger.nav.classList.contains('ct_hide')){
                    navManger.nav.classList.remove('ct_hide')
                    navManger.nav.style.opacity = '1'
                }
                if (!document.querySelector(`[data-section-to="${elem}"]`).classList.contains('ct_active')){
                    if(document.querySelector('.ct_nav__container button.ct_active')){
                        document.querySelector('.ct_nav__container button.ct_active').classList.remove('ct_active');
                    }
                    document.querySelector(`[data-section-to="${elem}"]`).classList.add('ct_active')
                    if (ct_current__device !== 'D'){
                        $('.ct_nav__stick_wrap ul').stop().animate({scrollLeft: $(`[data-section-to="${elem}"]`).offset().left +   $('.ct_nav__stick_wrap ul').scrollLeft() - 8}, 500, 'linear', function() { });
                    }
                }
            }
        });
        if(!navManger.inSection && document.querySelector('.ct_nav__container button.ct_active')){
            document.querySelector('.ct_nav__container button.ct_active').classList.remove('ct_active');
            if(window.scrollY >= navManger.sectionsTopOffest.last.top -  navManger.nav_offset){
                navManger.nav.classList.add('ct_hide')
                navManger.nav.style.opacity = '0'
            }else{
                navManger.nav.classList.remove('ct_hide')
                navManger.nav.style.opacity = '1'
            }
        }
       
    },
    onScrollEvents:function(){
        document.addEventListener('scroll',()=>{
           
            if (navManger.manual_click.active){
                if (window.scrollY + navManger.nav_offset  >= navManger.sectionsTopOffest[navManger.manual_click.section].top && window.scrollY + navManger.nav_offset <  navManger.sectionsTopOffest[navManger.sectionsTopOffestKeys[navManger.sectionsTopOffestKeys.indexOf(navManger.manual_click.section)+1]].top ){
                    navManger.manual_click.active = false
                }
            }else{
                this.setMenuOffset();
               
                navManger.setActiveSection() 
            }
            this.setStickyNav();
        })
    }

}

function ct_scroll_to_section(elem){
    let section  = document.querySelector(`.ct_double_content[data-section="${elem}"]`)
    let sectionTop = section.getBoundingClientRect().top;
    
    if (section.offsetTop > window.scrollY){
      
        navManger.setMenuOffset('down');
      
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: sectionTop + window.scrollY - navManger.nav_offset
        });
        
    }else{
      
        navManger.setMenuOffset('up');
       
       
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: sectionTop + window.scrollY - navManger.nav_offset
        });
        
    }
   
   
}