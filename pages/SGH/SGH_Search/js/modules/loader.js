import { customLog } from "./utils";

export const loader = {
    elem:null,
    time:2400,
    init:function(loader,time){
        this.elem = document.querySelector("#ct_wow__search__loader");
        var loaderEvent = new CustomEvent('loaderOut');
        this.loaderAnim();
        if (loader){
            this.elem.classList.add('ct_in');
            customLog('loader in')
            setTimeout(()=>{
                document.dispatchEvent(loaderEvent);
                this.elem.classList.remove('ct_in');
                customLog('loader out 1')
                
            },time?time:this.time)
           
        }else{
            setTimeout(()=>{
                document.dispatchEvent(loaderEvent);
                customLog('loader out 2')
            },20);
        }
    },
    loaderAnim:function(){
        let count=1;
        let currentId;
        let loaderInvterval = setInterval(() => { 
            
            
            if(!this.elem.querySelector('use.ct_active')){
                this.elem.querySelector('use:nth-child(1)').classList.add('ct_active');
            }else{
                this.elem.querySelector('use.ct_active').classList.remove('ct_active');
                if (currentId < 5){
                    currentId +=1
                }else{
                    currentId=1
                }
                this.elem.querySelector(`use:nth-child(${currentId})`).classList.add('ct_active');
            }

            count+=300;
            if (count >= this.time*2){
                clearInterval(loaderInvterval)
            }
        }, 300);
    }
}

