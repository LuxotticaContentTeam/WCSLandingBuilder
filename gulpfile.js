const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const babelify = require("babelify");
const browserify = require("browserify");
const concat = require("gulp-concat");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const merge = require('merge-stream');
const rename = require("gulp-rename");
const del = require("del");
const argv = require('yargs').argv;
const fs = require("fs");

const browserSync = require('browser-sync').create();

// GET OPTION DEFINED ON PACKAGE.JSON
const arg = (argList => {

    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {
  
      thisOpt = argList[a].trim();
      opt = thisOpt.replace(/^\-+/, '');
  
      if (opt === thisOpt) {
  
        // argument value
        if (curOpt) arg[curOpt] = opt;
        curOpt = null;
  
      }
      else {
        // argument name
        curOpt = opt;
        arg[curOpt] = true;
  
      }
    }
  
    return arg;
  
  })(process.argv);


const current_brand = arg.page.substring(0,arg.page.indexOf('_'));
const settings = JSON.parse (fs.readFileSync(`./utils/dependences/${current_brand}/settings.json`))


function concat_html() {
  return gulp.src([`./utils/dependences/${current_brand}/${arg.mob?(settings.dependences.responsive?settings.dependences.desk:settings.dependences.mob):settings.dependences.desk}header.html`,`./utils/html/${settings.moduleLibrary.enabled? "styleML.html":"style.html"}`, `./pages/${arg.page}/index.html`,`./utils/html/${settings.moduleLibrary.enabled? "scriptML.html":"script.html"}`,`./utils/dependences/${current_brand}/${arg.mob?(settings.dependences.responsive?settings.dependences.desk:settings.dependences.mob):settings.dependences.desk}footer.html`]) 
      .pipe(concat("index.html"),{
        ignorePath: `./pages/${arg.page}/dist/` ,
        addRootSlash: false,
        addPrefix: 'http://localhost:1234'
      })
      .pipe(gulp.dest(`./pages/${arg.page}/dist`))
      .pipe(browserSync.stream());
    
}

function concat_build() {
  var fileContent = fs.readFileSync(`./pages/${arg.page}/js/index.js`, "utf8");
  let scriptExist = fileContent.length > 0 ? true : false;
  let concatElement
  if (scriptExist){
    concatElement = [
      "./utils/builderEspot/style/open.html",
      `./pages/${arg.page}/dist/style/index.min.css`,
      "./utils/builderEspot/style/close.html",
      `./pages/${arg.page}/index.html`,
      "./utils/builderEspot/script/open.html",
      `./pages/${arg.page}/dist/js/index.min.js`,
      "./utils/builderEspot/script/close.html",
    ]
  }else{
    concatElement = [
      "./utils/builderEspot/style/open.html",
      `./pages/${arg.page}/dist/style/index.min.css`,
      "./utils/builderEspot/style/close.html",
      `./pages/${arg.page}/index.html`
    ]
  }

  return gulp.src(concatElement) 
      .pipe(concat("ESPOT.html"))
      .pipe(gulp.dest(`./pages/${arg.page}/dist`))
}


gulp.task('concat_build', (done)=>{
  let builded = false;
  concat_build();
  del('./pages')
  done();
});

gulp.task('concat_html', (done)=>{
  let builded = false;
  concat_html();
  done();
});



const script_land_js = [`./pages/${arg.page}/js/index.js`];
gulp.task("landing_js" ,() => {
  var tasks = script_land_js.map(function(entry) {
    return browserify({ entries: [entry] }).transform(babelify, {
      global: true,
      ignore: [/\/node_modules\/(?!@vizuaalog\/)/],
      presets: ["@babel/preset-env"],
      plugins: ["@babel/transform-runtime"]
      })
      .bundle()
      .pipe(source('.'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename(function (path) {
        path.extname = "index.min.js";
      }))
      .pipe(gulp.dest(`./pages/${arg.page}/dist/js/`));
    });
    return merge.apply(null, tasks);
});

const script_land_js_dev = [`./pages/${arg.page}/js/index.js`];
gulp.task("script_land_js_dev" ,() => {
  var tasks = script_land_js_dev.map(function(entry) {
    return browserify({ entries: [entry] }).transform(babelify, {
      global: true,
      ignore: [/\/node_modules\/(?!@vizuaalog\/)/],
      presets: ["@babel/preset-env"],
      plugins: ["@babel/transform-runtime"]
      })
      .bundle()
      .pipe(source('.'))
      .pipe(buffer())
      .pipe(rename(function (path) {
        path.extname = "index.min.js";
      }))
      .pipe(gulp.dest(`./pages/${arg.page}/dist/js/`));
    });
    return merge.apply(null, tasks);
});


const landing_ds_js = [`${settings.moduleLibrary.jsPath}`];
gulp.task("landing_ds_js" ,(done) => {
  if(!settings.moduleLibrary.enabled){
    return done()
  }
  var tasks = landing_ds_js.map(function(entry) {
    return browserify({ entries: [entry] }).transform(babelify, {
        global: true,
        ignore: [/\/node_modules\/(?!@vizuaalog\/)/],
        presets: ["@babel/preset-env"],
        plugins: ["@babel/transform-runtime"]
      })
      .bundle()
      .pipe(source('.'))
      .pipe(buffer())
      .pipe(uglify())
    
    
      .pipe(rename(function (path) {
        path.extname = "temp_moduleLibrary.js"
      }))
      .pipe(gulp.dest(`./pages/${arg.page}/dist/js/`))
    });
    return merge.apply(null, tasks);
});

gulp.task('landing_css', () => {
  return gulp.src([`./pages/${arg.page}/style/index.scss`])
      .pipe(sass({
          outputStyle: "compressed"
      }).on('error', sass.logError))
      .pipe(prefix('last 2 versions'))
      .pipe(cleanCSS({ compatibility: 'ie11' })) 
      .pipe(rename(function (path) {
        path.extname = ".min.css";
      }))
      .pipe(gulp.dest(`./pages/${arg.page}/dist/style/`));
});


gulp.task('landing_ds_css', (done) => {
  if(!settings.moduleLibrary.enabled){
    return done()
  }
  return gulp.src([`${settings.moduleLibrary.cssPath}index.scss`])
      .pipe(sass({
          outputStyle: "compressed"
      }).on('error', sass.logError))
      .pipe(prefix('last 2 versions'))
      .pipe(cleanCSS({ compatibility: 'ie11' })) 
      .pipe(rename(function (path) {
        path.extname = "_temp_moduleLibrary.css";
      }))
      .pipe(gulp.dest(`./pages/${arg.page}/dist/style/`));
});

// gulp.task('devLandingServe', gulp.series( ["devLanding", "browser-sync"]));

gulp.task('devLandingServe', (done)=> {
  browserSync_()
  
  gulp.watch([`./pages/${arg.page}/index.html`], gulp.task('devLandingSeries')).on('done', browserSync.reload);
  gulp.watch([`./pages/${arg.page}/js/*.js`], gulp.task('script_land_js_dev')).on('change', browserSync.reload);
  gulp.watch([`./pages/${arg.page}/style/*.scss`,`./pages/${arg.page}/style/**/*.scss`], gulp.task('landing_css')).on('change', browserSync.reload);
  
  if (settings.moduleLibrary.enabled){
    gulp.watch([`${settings.moduleLibrary.jsPath}*.js`,`${settings.moduleLibrary.jsPath}/**/*.js`], gulp.task('landing_ds_js')).on('change', browserSync.reload);
    gulp.watch([`${settings.moduleLibrary.cssPath}*.scss`,`${settings.moduleLibrary.cssPath}/**/*.scss`], gulp.task('landing_ds_css')).on('change', browserSync.reload);
  }
  
  concat_html();

  fs.writeFileSync(`./pages/${arg.page}/dist/js/temp.min.js`, `document.title="${arg.page} | WCS Landing Builder"`);
  
  done()
});


gulp.task('devLandingSeries',(done)=>{
  concat_html();
  done();
});

// 
gulp.task('buildLanding',gulp.series(['landing_js','landing_css','landing_ds_css','landing_ds_js'] ,(done)=>{
  concat_build();
  if(settings.moduleLibrary.enabled){
    moving_moduleLibrary_files_to_folder();
  }
 
  del(`./pages/${arg.page}/dist/js/temp.min.js`)
  done();
  
}));


function moving_moduleLibrary_files_to_folder(){
  gulp.src(`./pages/${arg.page}/dist/js/temp_moduleLibrary.js`)
  .pipe(rename(settings.moduleLibrary.jsDestName))
  .pipe(gulp.dest(settings.moduleLibrary.jsDestPath));

  gulp.src(`./pages/${arg.page}/dist/style/index_temp_moduleLibrary.css`)
  .pipe(rename(settings.moduleLibrary.cssDestName))
  .pipe(gulp.dest(settings.moduleLibrary.cssPath));

  del([`./pages/${arg.page}/dist/js/temp_moduleLibrary.js`,`./pages/${arg.page}/dist/style/index_temp_moduleLibrary.css`])
}

function browserSync_(){
  browserSync.init({
    server: {
      baseDir: `.`,
      // index: `./pages/${arg.page}/dist/index.html`,
      ignore:['./node_modules'],
    },
    startPath:`./pages/${arg.page}/dist/index.html`,
    reloadOnRestart: true,
    injectChanges:true,
    open:true,
    port: 1234,
    snippetOptions: {
      rule: {
        match: /<head[^>]*>/i,
        fn: function(snippet, match) {
          return match + snippet;
        }
      }
    },
    ui:false,

  });
}

gulp.task('browser-sync', (done) => {
  browserSync.init({
    server: {
      baseDir: `.`,
      // index: `./pages/${arg.page}/dist/index.html`
    },
   
    port: 1234,
    snippetOptions: {
      rule: {
        match: /<head[^>]*>/i,
        fn: function(snippet, match) {
          return match + snippet;
        }
      }
    },
    ui:false,

  });

  done();
});


const svgSprite = require('gulp-svg-sprite'),
config = {
  mode: {
    symbol: { // symbol mode to build the SVG
      render: {
        css: false, // CSS output option for icon sizing
        scss: false // SCSS output option for icon sizing
      },
      dest: './sprite', // destination folder
      prefix: '.svg--%s', // BEM-style prefix if styles rendered
      sprite: 'sprite.svg', //generated sprite name
      example: true // Build a sample page, please!
    }
  }
};

//BLOG
gulp.task('sprite',done => {
  gulp.src(`${arg.icons}/*.svg`)
    .pipe(svgSprite(config))
    .pipe(gulp.dest(`${arg.icons}`));
    done()
});

//BLOG
const arg2 =  (argList => {
  

})(process.argv);


gulp.task('test',done => {
  // fs.writeFileSync(`./pages/${arg.page}/dist/js/temp.min.js`, `document.title="${arg.page}"`);
//  console.log(arg.page.substring(0,2))
 

  done()
});



