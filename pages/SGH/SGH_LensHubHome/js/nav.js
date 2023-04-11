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
    setMenuOffset:function(){
        try {
            if (ct_current__device !== 'D'){
                this.menu_offset = document.querySelectorAll('.sgh-main-menu')[1].clientHeight 
            }else{
                if (document.querySelector('.sgh-main-menu__wrapper').classList.contains('sgh-main-menu__down')){
                    this.menu_offset =  document.querySelector('.sgh-header-top').clientHeight
                }else{
                    this.menu_offset = document.querySelector('.main-menu-center.navbar').clientHeight + document.querySelector('.sgh-header-top').clientHeight + this.benefitBarHeight;
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
            }
            this.nav.style.top = this.menu_offset+'px';
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
                ct_scroll_to_section(elem.dataset.sectionTo, this.nav_offset - 1);
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
            }else{
                navManger.nav.classList.remove('ct_hide')
            }
        }
       
    },
    onScrollEvents:function(){
        document.addEventListener('scroll',()=>{
            console.log('scroll')
            this.setMenuOffset();
            this.setStickyNav();
            if (navManger.manual_click.active){
                if (window.scrollY + navManger.nav_offset  >= navManger.sectionsTopOffest[navManger.manual_click.section].top && window.scrollY + navManger.nav_offset <  navManger.sectionsTopOffest[navManger.sectionsTopOffestKeys[navManger.sectionsTopOffestKeys.indexOf(navManger.manual_click.section)+1]].top ){
                    navManger.manual_click.active = false
                }
            }else{
                navManger.setActiveSection() 
            }
        })
    }

}

function ct_scroll_to_section(elem,offset){
    let sectionTop = document.querySelector(`.ct_double_content[data-section="${elem}"]`).getBoundingClientRect().top 
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: sectionTop + window.scrollY - offset
      });
}