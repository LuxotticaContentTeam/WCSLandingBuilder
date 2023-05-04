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