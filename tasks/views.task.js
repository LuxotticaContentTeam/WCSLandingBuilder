 /** 
  * Pug compiler.
  * To set up a variable, add it on the `pugOps` object or insert in the pug file: `#{gulpFileGlobalVar}`
* */ 

let
    { src, dest } = require('gulp'),
    $ = require('gulp-load-plugins')({ pattern: ['gulp-*'] }), // Setting a global variable to include all glup- plugin
    log = require('fancy-log'),
    c = require('ansi-colors'),
    replace = require('gulp-string-replace'),
    { src_asset_pug, temp_folder, isProd, dist_folder, isPreProd, projectName, dist_ghPages, dist_html, release, dist_release, utils_folder, dependences_folder, isMobDep, brands_folder } = require('./_config.js'),
    browserSync = require('browser-sync').create();

const views = function views(cb) {
    let sources= [];
    if (isProd){
        log(c.yellow.bold(`PROD VIEW`));
        sources.push(path.join(utils_folder,'builderEspot',"style","open.html"))
        sources.push(path.join(brands_folder,global.current_brand,global.current_proj,'dist', 'style/main.min.css'))
        sources.push(path.join(utils_folder,'builderEspot',"style","close.html"))

        sources.push(path.join(brands_folder,global.current_brand,global.current_proj,'index.html'))

        let scriptContent = fs.readFileSync(path.join(brands_folder,global.current_brand,global.current_proj, 'js/main.js'), "utf8").length > 0 ? true : false;;

        if(scriptContent){
            sources.push(path.join(utils_folder,'builderEspot',"script","open.html"))
            sources.push(path.join(brands_folder,global.current_brand,global.current_proj,'dist', 'js/main.min.js'))
            sources.push(path.join(utils_folder,'builderEspot',"script","close.html"))
        }
        return src(sources) 
            .pipe($.concat("ESPOT.html"))
            // .pipe(replace('@pathUtils', settings.paths.devUtils ))
            .pipe(dest(path.join(brands_folder,global.current_brand,global.current_proj,'dist')))
    }else{

        log(c.yellow.bold(`DEV VIEW`));
        if(isMobDep){
            if (global.current_brand_settings.dependences.responsive){
                sources.push(path.join(dependences_folder,global.current_brand,global.current_brand_settings.dependences.desk,'header.html'))
                
            }else{
                sources.push(path.join(dependences_folder,global.current_brand,global.current_brand_settings.dependences.mob,'header.html'))
            }
        }else{
            sources.push(path.join(dependences_folder,global.current_brand,global.current_brand_settings.dependences.desk,'header.html'))
            
        }

        if (global.moduleLibrary.enabled){
            sources.push(path.join(utils_folder,'html',"styleML.html"))
        }else{
            sources.push(path.join(utils_folder,'html',"style.html"))
        }
        sources.push(path.join(brands_folder,global.current_brand,global.current_proj,'index.html'));
        
        if (global.moduleLibrary.enabled){
            sources.push(path.join(utils_folder,'html',"scriptML.html"))
        }else{
            sources.push(path.join(utils_folder,'html',"script.html"))
        }
        
        if(isMobDep){
            if (global.current_brand_settings.dependences.responsive){
                sources.push(path.join(dependences_folder,global.current_brand,global.current_brand_settings.dependences.desk,'footer.html'))
                
            }else{
                sources.push(path.join(dependences_folder,global.current_brand,global.current_brand_settings.dependences.mob,'footer.html'))
            }
        }else{
            sources.push(path.join(dependences_folder,global.current_brand,global.current_brand_settings.dependences.desk,'footer.html'))
        }
        return src(sources) 
            .pipe($.concat("index.html"),{
                ignorePath: path.join(brands_folder,global.current_brand,global.current_proj,'dist') ,
                addRootSlash: false,
                addPrefix: 'http://localhost:347'
            })
            // .pipe(replace('@pathUtils', settings.paths.devUtils ))
            .pipe(replace('@dist_path@', path.join(global.current_brand,global.current_proj,'dist')))
            .pipe(replace('@proj_title@', `${global.current_brand} | ${global.current_proj} ` ))
            .pipe(dest(path.join(brands_folder,global.current_brand,global.current_proj,'dist')))
            // .pipe(browserSync.stream());
    }
   cb();
};


module.exports ={
    views
}