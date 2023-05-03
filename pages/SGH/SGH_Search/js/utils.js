export const calcCoordinates = (nSides,originX,originY,radius) =>{ 
    let points = [{x:originX,y:originY+radius}]
    let theta = Math.PI/2;
    let dTheta = 2*Math.PI/nSides;

    for (let i=1;i<nSides+1;i++){
        theta += dTheta;
        points.push({x: ( originX + radius*Math.cos(theta)).toFixed(2),y:(originY+radius*Math.sin(theta)).toFixed(2)})
    }
    return points
}