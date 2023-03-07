import LocomotiveScroll from 'locomotive-scroll';

document.addEventListener('DOMContentLoaded',()=>{
    window.promo = false;
    const lsscroll = new LocomotiveScroll({
        el: document.querySelector('#content'),
        smooth: true,
        lerp: 0.5,
        reloadOnContextChange: true,
        tablet: {
            smooth: true,
        },
        smartphone: {
            smooth: false,
        }
    });
    
    
      
})