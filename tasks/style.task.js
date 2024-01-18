 /**
  * Compile scss files into css.
  * Is variables is needed add it in the options
*/

let 
    { src, dest, series } = require('gulp'),
    log = require('fancy-log'),
    c = require('ansi-colors'),
    fs = require('fs'),
    $ = require('gulp-load-plugins')({ pattern: ['gulp-*'] }), // Setting a global variable to include all glup- plugin
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass')(require('sass')),
    path = require('path'),
    { isProd, dist_css, src_asset_scss_main, src_asset_scss_brands, isPreProd, dist_folder, release, dist_export, dist_release, dist_ghPages, brands_folder } = require('./_config.js');

const scss = (done) => {
    log(`-> Style: compiling scss`);
    const brandMainScssPath = [];
    brandMainScssPath.push(path.join(brands_folder,global.current_brand,global.current_proj, 'style/main.scss'));
    
    if (!fs.existsSync(brandMainScssPath[0])) {
        log(c.red.bold(`🛑 File ${brandMainScssPath} does not exist`));
        done();
        return;
    }
    if(global.moduleLibrary.enabled){
        brandMainScssPath.push(path.join(global.moduleLibrary.css_src, 'index.scss'));
        if (!fs.existsSync(brandMainScssPath[1])) {
            log(c.red.bold(`🛑 File ${brandMainScssPath[1]} does not exist`));
            done();
            return;
        }

    }
    return src(brandMainScssPath)
        .pipe($.if(!(isProd), $.sourcemaps.init()))
        .pipe($.plumber())
        .pipe($.dependents())
        .pipe($.debug())
        .pipe($.sassVariables({
            $env: isProd ? 'production' : 'development',
            $brand: global.current_brand,
            $moduleLibrary: global.moduleLibrary.enabled
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe($.if(!(isProd), $.sourcemaps.write()))
        .pipe($.if(!(isProd),$.concat('main.css')))
        .pipe(dest('.tmp/css'));

    

    
};

const postcss = () => {
    const f = $.filter(['.tmp/css/*.css'], {restore: true});

    log(`-> Style: run post scss`);
    
    return src(['.tmp/css/**/*.css'])
        .pipe(f)
        .pipe($.if(!(isProd), $.sourcemaps.init({loadMaps: true})))
        .pipe($.plumber())
        .pipe($.postcss([
                require('autoprefixer'),
                (isProd) ? require('cssnano')({ preset: 'default' }) : false
            ].filter(Boolean)))
        .pipe($.if(!(isProd), $.sourcemaps.write()))
        .pipe(f.restore)
        .pipe($.if((isProd), $.rename({ suffix: '.min' })))
        .pipe($.size({showFiles: true}))
        .pipe(dest(path.join(brands_folder,global.current_brand,global.current_proj, 'dist/style/')))
        .pipe(browserSync.stream());
};

    

const exportCss = (done) => {
    if (!global.isRelease) return done();
    return src(path.join(dist_css,"main.min.css")) 
        .pipe($.if((isProd), $.rename({basename: `main__${release}`, suffix: '.min' })))
        .pipe( dest(path.join(dist_release,global.selectedBrand,release)) )
}

module.exports = {
    style: series(
        scss,
        postcss,
    ),
    exportCss
}