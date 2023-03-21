

document.addEventListener('DOMContentLoaded',()=>{
    let strip = document.createElement('div');
    strip.id = "strip"
    strip.innerHTML = 'promo strip'
    strip.classList.add('benefit-bar', 'cms-custom-color-apricot-orange', 'ct-dark--text')
    setTimeout(function(){
        if (window.promo){
            document.querySelector('#espot').before(strip)
        }
    },1000);

   
})