const { brands_folder, current_brand } = require('./_config');
const { getDirectories } = require('./utils.js')

let 
    { src } =   require('gulp'),
    $ =         require('gulp-load-plugins')({ pattern: ['gulp-*'] }); // Setting a global variable to include all glup- plugin
    inquirer =  require('inquirer');




const brand_choice = () =>{
    return new Promise((resolve, reject)=>{
        inquirer.prompt( {
            type:'list',
            name:'answer',
            message:'Choose the brand',
            choices:[...getDirectories(brands_folder)],
        }).then(ans=>{
            resolve(ans.answer);
        })
    });
}
const proj_choice = (brand) =>{
    return new Promise((resolve, reject)=>{
        inquirer.prompt( {
            type:'list',
            name:'answer',
            message:'Scegli proj',
            choices:[...getDirectories(`${brands_folder}/${brand}/`)],
        }).then(ans=>{
            resolve(ans.answer);
        })
    });
}
const other_choice = () =>{
    return new Promise((resolve, reject)=>{
        inquirer.prompt( {
            type:'list',
            name:'answer',
            message:'Scegli other',
            choices:['OTH1','OTH2'],
        }).then(ans=>{
            resolve(ans.answer);
        })
    });
}
    
module.exports = async function prompt(){
    const choices = {};
    console.log(getDirectories("./pages",))
    
    choices.brand = await brand_choice();
    if (choices.brand === '[CROSS]'){
        choices.other = await other_choice()
    }else{
        choices.proj = await  proj_choice(choices.brand)
    }
    global.current_brand = choices.brand;
    console.log(choices)
    
}