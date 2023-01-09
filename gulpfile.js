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




gulp.task('js',done => {
    return browserify({
        entries:[arg.file]
        
    },{ base: "." })
    .transform( babelify, {
        global: true,
        ignore: [/\/node_modules\/(?!@vizuaalog\/)/],
        presets: ["@babel/preset-env"],
        plugins: ["@babel/transform-runtime"]
    } )
    .bundle()
    .pipe( source(arg.file))
    .pipe(rename({extname:".min.js"}))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("./"))
   
    done()
});



const script_brand = ['./01_PatchManager/patchJs.js'];

gulp.task("patchManagerJs" ,() => {
  var tasks = script_brand.map(function(entry) {
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
        path.extname = "patchJs.min.js";
      }))
      .pipe(gulp.dest(`./01_PatchManager/dist`));
    });
    return merge.apply(null, tasks);
});

gulp.task('patchManagerCss', () => {
  return gulp.src(['./01_PatchManager/patchStyle.scss'])
      .pipe(sass({
          outputStyle: "compressed"
      }).on('error', sass.logError))
      .pipe(prefix('last 2 versions'))
      .pipe(cleanCSS({ compatibility: 'ie11' })) 
      .pipe(rename(function (path) {
        path.extname = ".min.css";
      }))
      .pipe(gulp.dest(`./01_PatchManager/dist`));
});

gulp.task('watchPatchManager', ()=> {
  gulp.watch(["./01_PatchManager/patchJs.js"], gulp.series('patchManagerJs'));
});

gulp.task('patchManager', gulp.series(['patchManagerJs', 'patchManagerCss'], (done)=>{
 
  done();
}));


function concat_html() {
  return gulp.src(["./CreateLandingPage/00_Dependences/DESK/to-us/header.html",`./CreateLandingPage/${arg.page}/html/style.html`, `./CreateLandingPage/${arg.page}/index.html`,`./CreateLandingPage/${arg.page}/html/script.html`,"./CreateLandingPage/00_Dependences/DESK/to-us/footer.html"]) 
      .pipe(concat("index.html"),{
        ignorePath: `./CreateLandingPage/${arg.page}/dist/` ,
        addRootSlash: false,
        addPrefix: 'http://localhost:3000'
      })
      .pipe(gulp.dest(`./CreateLandingPage/${arg.page}/dist`))
      .pipe(browserSync.stream());
    
}

function concat_build() {
  return gulp.src([
    "./CreateLandingPage/00_Dependences/builderEspot/style/open.html",
    `./CreateLandingPage/${arg.page}/dist/style/index.min.css`,
    "./CreateLandingPage/00_Dependences/builderEspot/style/close.html",
    `./CreateLandingPage/${arg.page}/index.html`,
    "./CreateLandingPage/00_Dependences/builderEspot/script/open.html",
    `./CreateLandingPage/${arg.page}/dist/js/index.min.js`,
    "./CreateLandingPage/00_Dependences/builderEspot/script/close.html",
  ]) 
      .pipe(concat("ESPOT.html"))
      .pipe(gulp.dest(`./CreateLandingPage/${arg.page}/dist`))
}


gulp.task('concat_build', (done)=>{
  let builded = false;
  concat_build();
  done();
});

gulp.task('concat_html', (done)=>{
  let builded = false;
  concat_html();
  done();
});



const script_land_js = [`./CreateLandingPage/${arg.page}/js/index.js`];
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
      .pipe(gulp.dest(`./CreateLandingPage/${arg.page}/dist/js/`));
    });
    return merge.apply(null, tasks);
});

const script_land_js_dev = [`./CreateLandingPage/${arg.page}/js/index.js`];
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
      .pipe(gulp.dest(`./CreateLandingPage/${arg.page}/dist/js/`));
    });
    return merge.apply(null, tasks);
});


gulp.task('landing_css', () => {
  return gulp.src([`./CreateLandingPage/${arg.page}/style/index.scss`])
      .pipe(sass({
          outputStyle: "compressed"
      }).on('error', sass.logError))
      .pipe(prefix('last 2 versions'))
      .pipe(cleanCSS({ compatibility: 'ie11' })) 
      .pipe(rename(function (path) {
        path.extname = ".min.css";
      }))
      .pipe(gulp.dest(`./CreateLandingPage/${arg.page}/dist/style/`));
});

// gulp.task('devLandingServe', gulp.series( ["devLanding", "browser-sync"]));

gulp.task('devLandingServe', (done)=> {
  browserSync_()

  gulp.watch([`./CreateLandingPage/${arg.page}/index.html`], gulp.parallel('devLandingSeries','browser-sync')).on('done', browserSync.reload);
  gulp.watch([`./0_ModuleLibrary/**/*.html`], gulp.parallel('devLandingSeries','browser-sync')).on('done', browserSync.reload);
  gulp.watch([`./CreateLandingPage/${arg.page}/js/*.js`], gulp.parallel('devLandingSeries','browser-sync')).on('done', browserSync.reload);;
  gulp.watch([`./CreateLandingPage/${arg.page}/style/*.scss`,`./CreateLandingPage/${arg.page}/style/**/*.scss`], gulp.parallel('devLandingSeries','browser-sync')).on('done', browserSync.reload);;
  gulp.watch([`./0_ModuleLibrary/DesignSystem/script/*.js`,`./0_ModuleLibrary/DesignSystem/script/**/*.js`], gulp.parallel('devLandingSeriesDesignSystem','browser-sync')).on('done', browserSync.reload);;
  gulp.watch([`./0_ModuleLibrary/DesignSystem/style/*.scss`,`./0_ModuleLibrary/DesignSystem/style/**/*.scss`], gulp.parallel('devLandingSeriesDesignSystem','browser-sync')).on('done', browserSync.reload);;
  done()
});

gulp.task('devLandingSeriesDesignSystem', gulp.series(['landing_js','landing_ds_js','landing_css','landing_ds_css'] ,(done)=>{
  concat_html();
  done();
}));

gulp.task('devLandingSeries', gulp.series(['script_land_js_dev','landing_css'] ,(done)=>{
  concat_html();
  done();
}));

// 
gulp.task('buildLanding',gulp.series(['landing_js','landing_css'] ,(done)=>{
  concat_build();
  done();
}));

function browserSync_(){
  browserSync.init({
    server: {
      baseDir: [ `.` ]
    },
    port: 3000,
    snippetOptions: {
      rule: {
        match: /<head[^>]*>/i,
        fn: function(snippet, match) {
          return match + snippet;
        }
      }
    }
  });
}

gulp.task('browser-sync', (done) => {
  browserSync.init({
    server: {
      baseDir: [ `.` ]
    },
    port: 3000,
    snippetOptions: {
      rule: {
        match: /<head[^>]*>/i,
        fn: function(snippet, match) {
          return match + snippet;
        }
      }
    }
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

