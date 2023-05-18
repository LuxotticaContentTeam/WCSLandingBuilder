import { customLog } from "./utils";

export const loader = {
    elem:null,
    init:function(loader){
        this.elem = document.querySelector("#ct_wow__search__loader");
        if (loader){
            this.elem.classList.add('ct_in');
            customLog('loader in')
            setTimeout(()=>{
                let loader = new CustomEvent('loaderOut');
                document.dispatchEvent(loader);
                this.elem.classList.remove('ct_in');
                customLog('loader out')
            },2000)
           
        }
      

    }
}