/**
 * Custom log
 * @param {String} log - Main message
 * @param {String} style - Add extra style
 * @param {String} type - "err" for error log, "wait" for wait log
*/
export const customLog = (log,style,type='') =>{
    // if (window.ct_SUPERNOVA.env === 'development' || localStorage.getItem("dev") == "true"){
      if(type=="err") {
        console.log('%c '+ '[OP]  ' + log,`background: red;padding:2px 6px; border-radius:8px; color:#fff;font-family:sans-serif;font-size:14px; ${style};`)
      }
      if(type=="wait"){
         console.log('%c '+ '[OP]  ' + log,`background: #ceb000;padding:2px 4px; border-radius:4px; color:#000;font-family:sans-serif;font-size:14px; ${style};`)
      }
      if(type==''){
        console.log('%c '+ '[OP]  ' + log,`background: #202125;padding:4px 8px; border-radius:6px; color:#fff;font-family:sans-serif;font-size:14px; ${style};`)
    
      }
    // }
  }

/**
 * Custom log
 * @param {String} field - key of the copy in the json
 * @param {String} country - es: en-us, es-es
 * @param {String} lang - es: en, fr, it
*/
export const getTrad = (field,country,lang) => {

    if (typeof field === 'string') return field
    
    let keys = Object.keys(field);
    if (keys.includes(country)) return field[country];
    if (keys.includes(lang)) return field[lang];
    if (keys.includes('en-us')) return field['en-us'];
    if (keys.includes('en')) return field['en'];
    
    return field[0]
}

/**
 * 
 * @param {String} name - Event Name
 * @param {Function} cb - CallBack
 * @returns Run Callback
 */
export const eventCatcher = (name,cb) => [
    window.addEventListener(name,(e)=>{
        cb(e.detail);
    })
]

export const eventDispatch = (event,detail=undefined)=> {
    let eventToDispatch = new CustomEvent(event,{detail:detail})
    window.dispatchEvent(eventToDispatch)
}