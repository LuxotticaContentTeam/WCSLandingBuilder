import { storeInfo } from "./storeInfo";
import { customLog } from "./utils";

export const loader = {
    elem:null,
    loaderEvent: new CustomEvent('loaderOut'),
    init:function(time){
        this.elem = document.querySelector("#ct_wow__search__loader");
        this.loaderIn(time);
    },
    loaderIn:function(time,type){
        customLog('loader in')
        if (!type || type === 'init'){
            console.log(window.ct_wow__search.data.copy.loader.init)
            this.elem.querySelector('h3').innerHTML =  storeInfo.getLang(window.ct_wow__search.data.copy.loader.init)
        }
        if (type === "restart"){
            this.elem.querySelector('h3').innerHTML = storeInfo.getLang(window.ct_wow__search.data.copy.loader.restart)
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
        customLog('loader out')
        this.elem.classList.remove('ct_in');
        document.dispatchEvent(this.loaderEvent);
    }
}

