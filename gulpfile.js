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

function concat_html() {
  return gulp.src([`./utils/dependences/${arg.page.substring(0,2)}/${arg.mob?'MOB':'DESK'}/to-us/header.html`,`./${arg.page}/html/style.html`, `./${arg.page}/index.html`,`./${arg.page}/html/script.html`,`./utils/dependences/${arg.page.substring(0,2)}/${arg.mob?'MOB':'DESK'}/to-us/footer.html`]) 
      .pipe(concat("index.html"),{
        ignorePath: `./${arg.page}/dist/` ,
        addRootSlash: false,
        addPrefix: 'http://localhost:1234'
      })
      .pipe(gulp.dest(`./${arg.page}/dist`))
      .pipe(browserSync.stream());
    
}

function concat_build() {
  var fileContent = fs.readFileSync(`./${arg.page}/js/index.js`, "utf8");
  let scriptExist = fileContent.length > 0 ? true : false;
  let concatElement
  if (scriptExist){
    concatElement = [
      "./utils/builderEspot/style/open.html",
      `./${arg.page}/dist/style/index.min.css`,
      "./utils/builderEspot/style/close.html",
      `./${arg.page}/index.html`,
      "./utils/builderEspot/script/open.html",
      `./${arg.page}/dist/js/index.min.js`,
      "./utils/builderEspot/script/close.html",
    ]
  }else{
    concatElement = [
      "./utils/builderEspot/style/open.html",
      `./${arg.page}/dist/style/index.min.css`,
      "./utils/builderEspot/style/close.html",
      `./${arg.page}/index.html`
    ]
  }

  return gulp.src(concatElement) 
      .pipe(concat("ESPOT.html"))
      .pipe(gulp.dest(`./${arg.page}/dist`))
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



const script_land_js = [`./${arg.page}/js/index.js`];
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

const script_land_js_dev = [`./${arg.page}/js/index.js`];
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
      .pipe(gulp.dest(`./${arg.page}/dist/js/`));
    });
    return merge.apply(null, tasks);
});


gulp.task('landing_css', () => {
  return gulp.src([`./${arg.page}/style/index.scss`])
      .pipe(sass({
          outputStyle: "compressed"
      }).on('error', sass.logError))
      .pipe(prefix('last 2 versions'))
      .pipe(cleanCSS({ compatibility: 'ie11' })) 
      .pipe(rename(function (path) {
        path.extname = ".min.css";
      }))
      .pipe(gulp.dest(`./${arg.page}/dist/style/`));
});

// gulp.task('devLandingServe', gulp.series( ["devLanding", "browser-sync"]));

gulp.task('devLandingServe', (done)=> {
  browserSync_()
  
  gulp.watch([`./${arg.page}/index.html`], gulp.parallel('devLandingSeries','browser-sync')).on('done', browserSync.reload);
  gulp.watch([`./${arg.page}/js/*.js`], gulp.parallel('devLandingSeries','browser-sync')).on('done', browserSync.reload);
  gulp.watch([`./${arg.page}/style/*.scss`,`./${arg.page}/style/**/*.scss`], gulp.parallel('devLandingSeries','browser-sync')).on('done', browserSync.reload);
  concat_html();
  done()
});


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
      baseDir: `.`,
      // index: `./${arg.page}/dist/index.html`,
      ignore:['./node_modules'],
    },
    startPath:`./${arg.page}/dist/index.html`,
    reloadOnRestart: true,
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
      // index: `./${arg.page}/dist/index.html`
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
  var fileContent = fs.readFileSync("./TO_Example/js/index.js", "utf8");
  let scriptExist = fileContent.length > 0;
  done()
});



