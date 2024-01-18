/**
 * Watch file changes and run relative task
 */

// Require custom tasks
const {views}          = require('./views.task.js');

const {style}        = require('./style.task.js');
const {script}         = require('./script.task.js');


const
    { watch, series } = require('gulp'),
    browserSync = require('browser-sync').create('dev'),
    path = require('path'),
    log = require('fancy-log');

let
    { 

        brands_folder,
    } = require('./_config.js');


module.exports = function watcher(){

    log('-> Watching files in /src folder...');
 
    // Watch normal HTML
    watch(
        path.join(brands_folder,global.current_brand,global.current_proj,"index.html"), 
        series([views])
    ).on('done', browserSync.reload);

    // Watch pug files
    // watch(src_asset_pug, 
    //     series([views, inject, function reload(cb) {
    //         browserSync.reload();
    //         cb();
    //     }])
    // )

    // watch(src_asset_pug_parts, 
    //     series([views, inject, function reload(cb) {
    //         browserSync.reload();
    //         cb();
    //     }])
    // )


    // Watch syles
    watch(path.join(brands_folder,global.current_brand,global.current_proj,"style/**/*.scss"), series(style));
    if (global.moduleLibrary.enabled){
        watch(path.join(global.moduleLibrary.css_src,'**/*.scss'), series(style));
    }

    // Watch scripts
   
    watch(path.join(brands_folder,global.current_brand,global.current_proj,"js/**/*.js"), series(script));
    if (global.moduleLibrary.enabled){
        watch(path.join(global.moduleLibrary.js_src,'**/*.js'), series(script));
    }
    // watch(src_generic_assets, series(genericAssetsTask));
    // watch(src_generic_assets_brands, series(genericAssetsTask));

    // Watch images
    // watch(src_asset_img, 
    //     series(images)
    // ).on('change', browserSync.reload);

}