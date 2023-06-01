export const storeInfo ={
    getInfo:function(){
        let time = 0;
        return new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                time+=200;
                if (window.wcs_config){
                    window.ct_wow__search.data.storeInfo.lang = wcs_config.locale.toLowerCase().replace('_','-');
                    window.ct_wow__search.data.storeInfo.lang_short = wcs_config.locale.match("^[^_]+")[0];
                    clearInterval(interval)
                
                    resolve(true)
                
                }else{
                    if (time >= 10000){
                        clearInterval(interval)
                        resolve(false)
                    }
                }
            }, 400);
        });
      
    },
    getLang:function(field){
        let keys = Object.keys(field);
        console.log(keys)
        if (keys.includes(window.ct_wow__search.data.storeInfo.lang)){
            return field[window.ct_wow__search.data.storeInfo.lang]
        }
        if (keys.includes(window.ct_wow__search.data.storeInfo.lang_short)){ 
            return field[window.ct_wow__search.data.storeInfo.lang_short]
        }
        return field['en']
    }

}