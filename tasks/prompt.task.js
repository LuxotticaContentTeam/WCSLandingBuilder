const { brands_folder, current_brand, utils_folder, isMobDep } = require('./_config');
const { getDirectories } = require('./utils.js')

let 
    { src } =   require('gulp'),
    $ =         require('gulp-load-plugins')({ pattern: ['gulp-*'] }); // Setting a global variable to include all glup- plugin
    log = require('fancy-log'),
    c = require('ansi-colors'),
    fs = require("fs"),
    path = require('path'),
    inquirer =  require('inquirer');

// Choose the brand
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
// Choose the project
const proj_choice = (brand) =>{
    let proj_directories = [...getDirectories(`${brands_folder}/${brand}/`)];
    if(proj_directories.length === 0){
        log(c.red.bold(`🛑 No projects available on ${brand}, create project folder before!`));
        throw new Error(`🛑 No projects available on ${brand}, create project folder before!`);
    }else{
        return new Promise((resolve, reject)=>{
            inquirer.prompt( {
                type:'list',
                name:'answer',
                message:'Choose the proj',
                choices:proj_directories,
            }).then(ans=>{
                resolve(ans.answer);
            })
        });
    }
}

// Use module library?
// const moduleLibrary_choice = () =>{
//     return new Promise((resolve, reject)=>{
//         inquirer.prompt( {
//             type:'list',
//             name:'answer',
//             message:'Module Library',
//             choices: ['no','yes'],
//         }).then(ans=>{
//             resolve(ans.answer === 'yes'?true:false);
//         })
//     });
// }

// Open a new tab?
const newTab_choice = () =>{
    return new Promise((resolve, reject)=>{
        inquirer.prompt( {
            type:'list',
            name:'answer',
            message:'Open new tab?',
            choices: ['no','yes'],
        }).then(ans=>{
            resolve(ans.answer === 'yes' ? true : false);
        })
    });
}

// --
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
    
module.exports = async function prompt(done){
    const choices = {};

    choices.brand = await brand_choice();
    if (choices.brand === '[CROSS]'){
        choices.other = await other_choice()
    }else{
        choices.proj = await  proj_choice(choices.brand)
        
    }
    choices.newTab = await newTab_choice()

    global.current_brand = choices.brand;
    global.current_proj = choices.proj;
    global.newTab = choices.newTab;
    
    if(fs.existsSync(path.join(utils_folder,"dependences",global.current_brand,'settings.json'))){
        global.current_brand_settings = JSON.parse (fs.readFileSync( path.join(utils_folder,"dependences",global.current_brand,'settings.json')));
        global.moduleLibrary = global.current_brand_settings.moduleLibrary
    }else{
        log(c.red.bold(`🛑 No settings available on ${global.current_brand}, let's create settings for the project!`));
        throw new Error(`🛑 No projects available on ${brand}, create project folder before!`);
    }
    done();
   
    
    console.log( global.current_brand,  global.current_proj, global.newTab,global.current_brand_settings)
    
    
    
}