/**
 * Process javascript files.
 * Is possible to set value replace some string
*/

const { stream } = require('browser-sync');
const { isPreProd, release, dist_export, dist_release, dist_ghPages, brands_folder } = require('./_config.js');

let 
    { src, dest, series, glob } = require('gulp'),
    $ = require('gulp-load-plugins')({ pattern: ['gulp-*'] }), // Setting a global variable to include all glup- plugin
    browserSync = require('browser-sync').create(),
    log = require('fancy-log'),
    pkg = require('../package.json'),
    c = require('ansi-colors'),
    fs = require('fs'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
    replace = require('gulp-string-replace'),
    es = require('event-stream');
    path = require('path'),
    { src_asset_js, isProd, dist_js, buildVersion, imagePath, confPath, now} = require('./_config.js');

const lint = () => {
    const jsSrc = [path.join(brands_folder,global.current_brand,global.current_proj, 'js/**/*.js')]
    if (global.moduleLibrary.enabled){
        jsSrc.push(path.join(global.moduleLibrary.js_src,'**/*.js'))
    }
    return src(jsSrc)
        .pipe($.eslint({
            ecmaVersion: 'latest',
            parserOptions: {
                "ecmaVersion": 8,
                "sourceType": "module",
                "requireConfigFile": false
            },

            //List or rules at: https://eslint.org/docs/latest/rules/
            extends: "eslint:recommended",
            rules: {
                'no-useless-escape' : 0,
                'no-const-assign': 2,
            },

            globals: pkg.eslint.globals
        }))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
};

const js = (done) => {
    let streamFail = false;

    const jsFiles = [
        {
            path: path.join(brands_folder,global.current_brand,global.current_proj, 'js/main.js'),
            dest: path.join(brands_folder,global.current_brand,global.current_proj, "dist",'js'),
            name: 'main.js'
        }
    ];
    
    if (global.moduleLibrary.enabled){
        jsFiles.push({
            path: path.join(global.moduleLibrary.js_src,'index.js'),
            dest: path.join(brands_folder,global.current_brand,global.current_proj, "dist",'js'),
            name: 'temp_moduleLibrary.js'
        })
    }

    let tasks = 
        jsFiles.map(function (file) {
            if (!fs.existsSync(file.path)) {
                log(c.red.bold(`🛑 File ${file.path} does not exist`));
                done();
                streamFail = true;
            }else{
                log(c.green.bold(`✅ Bundle File ${file.path}`));
                return browserify({
                        entries: [file.path]
                    })
                    .transform(babelify, { presets : ["@babel/preset-env"] })
                    .bundle()
                    .pipe($.plumber())
                    .pipe(source(`${file.dest}/${file.name}`))
                    .pipe(buffer())
                    .pipe($.if(!(isProd), $.sourcemaps.init()))
                    .pipe($.if(isProd, $.uglify()))
                    // .pipe($.if(!(isProd), $.sourcemaps.write(path.join(brands_folder,global.current_brand,global.current_proj,'js'))))
                    .pipe(replace('@now@', now))
                    .pipe(replace('@env@', (isProd) ? 'production' : 'development' ))
                    .pipe(replace('@buildVersion@', buildVersion ))
                    .pipe(replace('@imagePath@', imagePath ))
                    .pipe(replace('@confPath@', confPath ))
                    .pipe(replace('@language@', global.projLanguage ))
                    .pipe($.if((isProd), $.rename({ suffix: '.min' })))
                    .pipe( dest('.') )
                    .pipe(browserSync.stream())
                    

            }
        })
    

    if(streamFail) return;
    return es.merge.apply(null, tasks).on('end',()=>{done()}); 
}

const concatScripts = (done) => {
    if (!global.isRelease) return done();
    return src([path.join(dist_js,global.selectedBrand,"main.min.js"), path.join(dist_js,'main.min.js')]) 
        .pipe($.concat(`main__${release}.min.js`))
        .pipe( dest(path.join(dist_release,global.selectedBrand,release)) )
}

module.exports = { 
    script: series(
        lint,
        js
    ),
    concatScripts
   }