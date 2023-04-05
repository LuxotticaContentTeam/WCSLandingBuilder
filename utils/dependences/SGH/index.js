

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
    setTimeout(function(){
        window.wcs_config= {
            catalogId: "20603",
            currency:"GBP",
            langId: "-24",
            locale: "en_GB",
            storeId: "11352"
        }
    },4000)
   
})