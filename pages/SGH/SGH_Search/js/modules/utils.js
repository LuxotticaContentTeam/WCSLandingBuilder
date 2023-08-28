export const calcCoordinates = (nSides,radius) =>{ 
    let originX = radius;
    let originY = radius;
    let dTheta = 2*Math.PI/nSides;
    let theta = Math.PI/2 + dTheta;
    let points = []
    for (let i=0;i<nSides;i++){
         points.push({x: ( originX + radius*Math.cos(theta)).toFixed(2),y:(originY+radius*Math.sin(theta)).toFixed(2)})
        theta+=dTheta
    }
    return points
}
export const debounce = (f,stop) =>{
    var timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(f,500,event);
    };
}

export const customLog = (log,entraStyle) =>{
    console.log('%c ' + log,`background:#E8DBBD;padding:3px 5px; border-radius:4px; color:#000;font-family:helvetica; ${entraStyle};`)
}

export const getDevice = () => {
    return window.innerWidth > 1025 ? "D" : window.innerWidth < 1025 && window.innerWidth >= 768 ? "T" :  window.innerWidth < 768 ? "M" : "not recognized";
}

export const checkData = (data,timeout) => {
    return new Promise((resolve,reject)=>{
        if (data.loaded === true){
            resolve()
        }else{ 
            let timer = 0;
            let checkDataInterver = setInterval(()=>{
                if (data.loaded === true){
                    // console.log('RESOLVED IN: ' + timer + 'ms')
                    clearInterval(checkDataInterver)
                    resolve()
                }else{
                    timer += 200;
                    if (timer > timeout){
                        clearInterval(checkDataInterver)
                        console.log('TIMEOUT')
                        resolve()
                    }
                }
            },200)
        }
    })
}

export const analyticsPush = (data) => {
    if (window.tealium_data2track){
        window.tealium_data2track.push(data);
    }else{
        console.log(data)
    }
}

export const formatDataAnalytics = (data,separator) => {
    let data2track = {};
    if (separator === 'object'){
        for(let i = 0;i<data.length;i++){
            data2track[data[i]] = {};
        }
    }else{
        data2track = '';
        data.forEach((item,index)=>{
            data2track += item;
            if (index < data.length -1){
                data2track += separator;
            }
        })
    }
   
    return data2track
}