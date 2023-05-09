export const storeInfo ={
    homeUrl:location.origin + location.pathname,
    lang:null,
    lang_short:null,
    getInfo:function(){
        let time = 0;
        return new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                time+=200;
                if (window.wcs_config){
                    storeInfo.lang = wcs_config.locale.toLowerCase().replace('_','-');
                    storeInfo.lang_short = wcs_config.locale.match("^[^_]+")[0];
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
        if (keys.includes(this.lang)){
            return field[this.lang]
        }
        if (keys.includes(this.lang_short)){
            return field[this.lang_short]
        }
        return field['en']
    }

}