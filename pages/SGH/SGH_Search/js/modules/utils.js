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
export const debounce = (f) =>{
    var timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(f,500,event);
    };
}

export const customLog = (log,entraStyle) =>{
    console.log('%c ' + log,`background:#E8DBBD;padding:3px 5px; border-radius:4px; color:#000;font-family:helvetica; ${entraStyle};`)
}