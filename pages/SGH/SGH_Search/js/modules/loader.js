import { storeInfo } from "./storeInfo";
import { analyticsPush, customLog } from "./utils";

export const loader = {
    elem:null,
    loaderEvent: new CustomEvent('loaderOut'),
    init:function(time){
        this.elem = document.querySelector("#ct_wow__search__loader");
        this.loaderIn(time);
    },
    loaderIn:function(time,type){
        if (!type || type === 'init'){
            this.elem.querySelector('h3').innerHTML =  storeInfo.getLang(window.ct_wow__search.data.copy.loader.init)
        }
        if (type === "restart"){
            this.elem.querySelector('h3').innerHTML = storeInfo.getLang(window.ct_wow__search.data.copy.loader.restart);
            analyticsPush({
                'id': 'Impression',
                'Page_Section2': 'WowQuiz:Step1', 
              });
        }
        if (type === "results"){
            this.elem.querySelector('h3').innerHTML = storeInfo.getLang(window.ct_wow__search.data.copy.loader.results)
        }
        
        this.elem.classList.add('ct_in');
        setTimeout(()=>{
            this.loaderOut()    
        },time)
    },
    loaderOut:function(){
        this.elem.classList.remove('ct_in');
        document.dispatchEvent(this.loaderEvent);
    }
}

