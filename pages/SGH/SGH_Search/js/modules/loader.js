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
            this.elem.querySelector('h3').innerHTML = 'Preparing your quiz...'
        }
        if (type === "restart"){
            this.elem.querySelector('h3').innerHTML = 'Restarting quiz...'
        }
        if (type === "results"){
            this.elem.querySelector('h3').innerHTML = 'Preparing your results...'
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

