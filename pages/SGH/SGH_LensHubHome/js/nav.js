export const navManger = {
    nav:document.querySelector('.ct_nav__stick_container .ct_nav__stick_wrap'),
    nav_container:document.querySelector('.ct_nav__stick_container'),
    menu_offset:0,
    nav_offset:0,
    sectionsTopOffest:{},
    manual_click: {
        active:false,
        section:''
    },
    init:function(){
        this.setOffests()
        this.setStickyNav();
        this.setClickHandler();
    },
    setOffests:function(){
        this.menu_offset = document.querySelector('.main-menu-center.navbar').clientHeight + document.querySelector('.benefitbar').clientHeight;
        this.nav_offset = this.menu_offset + this.nav.clientHeight;
        [...document.querySelectorAll('.ct_space [data-section]')].forEach(elem=>{
            this.sectionsTopOffest[elem.dataset.section] = { 
                "top" : elem.offsetTop
            };
        });
    },
    setStickyNav:function(){
        if (window.scrollY + this.menu_offset >= this.nav_container.offsetTop){
            if (!nav.classList.contains('ct_stick')){
                nav.classList.add('ct_stick');
            }
        }else{
            if (this.nav.classList.contains('ct_stick')){
                this.nav.classList.remove('ct_stick');
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
                manual_click.active = true;
                manual_click.section = elem.dataset.sectionTo;
    
                elem.classList.add('ct_active');
                if (ct_current__device === 'M'){
                    $('.ct_nav__stick_wrap ul').stop().animate({scrollLeft: $(elem).offset().left +   $('.ct_nav__stick_wrap ul').scrollLeft() - 8}, 500, 'linear', function() { });
                }
            })
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