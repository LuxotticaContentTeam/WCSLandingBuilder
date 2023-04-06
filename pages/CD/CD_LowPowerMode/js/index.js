// console.log('%c WCS LANDING BUILDER IT\'S WORKING','background:green;color:white;border-radius:8px;padding:4px;')

function monetateCode(){
    console.log('MONETATE');
    console.log('%cRISPARMIO ENERGETICO CHECK','background:blue;color:#fff;');
    let video = document.querySelector('[data-czid="X_HP_Hero"] video');
    if (video.paused  === false){
        console.log('%cRISPARMIO ENERGETICO NON ATTIVO','background:green;color:#fff');
    }else{
        if (video.readyState > 1){
            video.play()
            .then(function(){
              console.log('%cRISPARMIO ENERGETICO NON ATTIVO','background:green;color:#fff');
          })
          .catch(function(error){
               console.log('%cRISPARMIO ENERGETICO ATTIVO','background:yellow');
          });
        }else{
            video.addEventListener('canplay',()=>{
                video.play()
                .then(function(){
                  console.log('%cRISPARMIO ENERGETICO NON ATTIVO','background:green;color:#fff');
              })
              .catch(function(error){
                   console.log('%cRISPARMIO ENERGETICO ATTIVO','background:yellow');
              });
            })
        }
       
    }
    
   
    
    
}

document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(()=>{
        monetateCode()
    },15000)
})