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
const inquirer = require('inquirer');
const jsonMinify = require('gulp-json-minify');
const glob = require('glob');
const replace = require('gulp-string-replace');


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



var currentBrand;
var settings; 
var currentPage;
var moduleLibrary;
var newTab;


function concat_html() {
  return gulp.src([`./utils/dependences/${currentBrand}/${arg.mob?(settings.dependences.responsive?settings.dependences.desk:settings.dependences.mob):settings.dependences.desk}header.html`,`./utils/html/${moduleLibrary? "styleML.html":"style.html"}`, `./pages/${currentBrand}/${currentPage}/index.html`,`./utils/html/${moduleLibrary? "scriptML.html":"script.html"}`,`./utils/dependences/${currentBrand}/${arg.mob?(settings.dependences.responsive?settings.dependences.desk:settings.dependences.mob):settings.dependences.desk}footer.html`]) 
      .pipe(concat("index.html"),{
        ignorePath: `./pages/${currentBrand}/${currentPage}/dist/` ,
        addRootSlash: false,
        addPrefix: 'http://localhost:1234'
      })
      // .pipe(replace('@pathUtils', settings.paths.devUtils ))
      .pipe(gulp.dest(`./pages/${currentBrand}/${currentPage}/dist`))
      .pipe(browserSync.stream());
    
}

function concat_build() {
  var fileContent = fs.readFileSync(`./pages/${currentBrand}/${currentPage}/js/index.js`, "utf8");
  let scriptExist = fileContent.length > 0 ? true : false;
  let concatElement
  if (scriptExist){
    concatElement = [
      "./utils/builderEspot/style/open.html",
      `./pages/${currentBrand}/${currentPage}/dist/style/index.min.css`,
      "./utils/builderEspot/style/close.html",
      `./pages/${currentBrand}/${currentPage}/index.html`,
      "./utils/builderEspot/script/open.html",
      `./pages/${currentBrand}/${currentPage}/dist/js/index.min.js`,
      "./utils/builderEspot/script/close.html",
    ]
  }else{
    concatElement = [
      "./utils/builderEspot/style/open.html",
      `./pages/${currentBrand}/${currentPage}/dist/style/index.min.css`,
      "./utils/builderEspot/style/close.html",
      `./pages/${currentBrand}/${currentPage}/index.html`
    ]
  }

  return gulp.src(concatElement) 
      .pipe(concat("ESPOT.html"))
      // .pipe(replace('@pathUtils', settings.paths.prodUtils ))
      .pipe(gulp.dest(`./pages/${currentBrand}/${currentPage}/dist`))
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




gulp.task("landing_js" ,() => {
  var tasks = glob.sync(`./pages/${currentBrand}/${currentPage}/js/*.js`).map(function(entry) {
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
      // .pipe(replace('@path', settings.page.paths.productionConf ))
      .pipe(rename(function (path) {
        path.basename = entry.replace(`pages/${currentBrand}/${currentPage}/js/`,'').replace('.js','')
        path.extname = ".min.js";
      }))
      .pipe(gulp.dest(`./pages/${currentBrand}/${currentPage}/dist/js/`));
    });
    return merge.apply(null, tasks);
});


gulp.task("script_land_js_dev" ,() => {
  // console.log(fs.readdirSync(`./pages/${currentBrand}/${currentPage}/js/`)); // ["file1", "file2"])
  var tasks = glob.sync(`./pages/${currentBrand}/${currentPage}/js/*.js`).map(function(entry) {
    return browserify({ entries: [entry] }).transform(babelify, {
      global: true,
      ignore: [/\/node_modules\/(?!@vizuaalog\/)/],
      presets: ["@babel/preset-env"],
      plugins: ["@babel/transform-runtime"]
      })
      .bundle()
      .pipe(source('.'))
      .pipe(buffer())
      // .pipe(replace('@path', settings.page.paths.developmentConf ))
      .pipe(rename(function (path) {
        path.basename = entry.replace(`pages/${currentBrand}/${currentPage}/js/`,'').replace('.js','')
        path.extname = ".min.js";
      }))
      .pipe(gulp.dest(`./pages/${currentBrand}/${currentPage}/dist/js/`));
    });
    return merge.apply(null, tasks);
});



gulp.task("landing_ds_js" ,(done) => {
  if(!moduleLibrary){
    return done()
  }
  var tasks = [`${settings.moduleLibrary.jsPath}`].map(function(entry) {
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
        path.extname = "temp_moduleLibrary.js"
      }))
      .pipe(gulp.dest(`./pages/${currentBrand}/${currentPage}/dist/js/`))
    });
    return merge.apply(null, tasks);
});

gulp.task('landing_css', () => {
  return gulp.src([`./pages/${currentBrand}/${currentPage}/style/*.scss`])
      .pipe(sass({
          outputStyle: "compressed"
      }).on('error', sass.logError))
      .pipe(prefix('last 2 versions'))
      .pipe(cleanCSS({ compatibility: 'ie11' })) 
      .pipe(rename(function (path) {
        path.extname = ".min.css";
      }))
      .pipe(gulp.dest(`./pages/${currentBrand}/${currentPage}/dist/style/`))
      .pipe(browserSync.stream());
});


gulp.task('landing_ds_css', (done) => {
  if(!moduleLibrary){
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
      .pipe(gulp.dest(`./pages/${currentBrand}/${currentPage}/dist/style/`))
      .pipe(browserSync.stream());
});

gulp.task('json', (done) => {
  gulp.src(`./pages/${currentBrand}/${currentPage}/json/**`)
  .pipe(gulp.dest(`./pages/${currentBrand}/${currentPage}/dist/json`));
  done()
});



const getDirectories = source =>
fs.readdirSync(source, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)


let brands = getDirectories("./pages")
let pages= [];
const questions_dev = [
  {
    type: 'list',
    name: 'brand',
    message: 'Select Brand to dev:',
    choices: [...brands],
  },
]


gulp.task('dev_', (done)=> {
  if (process.argv.includes('--brand') && process.argv.includes('--page') && process.argv.includes('--moduleLibrary') ){
    
    currentBrand = process.argv[process.argv.indexOf('--brand')+1];
    settings = JSON.parse (fs.readFileSync(`./utils/dependences/${currentBrand}/settings.json`))
    currentPage= process.argv[process.argv.indexOf('--page')+1];
    moduleLibrary = process.argv[process.argv.indexOf('--moduleLibrary')+1] === "yes" ? true : false;
    settings["page"] = JSON.parse (fs.readFileSync(`./pages/${currentBrand}/${currentPage}/settings.json`))
    if (process.argv.includes('--newTab')){
      newTab = process.argv[process.argv.indexOf('--newTab')+1] === "yes" ? true : false;
    }else{
      newTab = false
    }
    
    startDev();
  }else{
    inquirer.prompt(questions_dev).then((answers) => {
    
      console.log('\n Starting Dev: ' + answers.brand + "\n"); 
      currentBrand=  answers.brand;
      
      const questions_dev2 = [ {
        type: 'list',
        name: 'page',
        message: 'Select Page to dev:',
        choices: [...getDirectories(`./pages/${currentBrand}/`)],
      },
      {
        type: 'list',
        name: 'moduleLibrary',
        message: 'There is Module Library? ',
        choices: ['no','yes'],
      },
      {
        type: 'list',
        name: 'newTab',
        message: 'Open new tab?',
        choices: ['no','yes'],
      },
    ];
      
      inquirer.prompt(questions_dev2).then((answers) => {
        currentPage =answers.page;
        settings = JSON.parse (fs.readFileSync(`./utils/dependences/${currentBrand}/settings.json`))
        moduleLibrary = answers.moduleLibrary === 'yes' ? true : false;
        newTab = answers.newTab === 'yes' ? true : false;
        console.log('\n Quick Command: \n\n' + " gulp dev_ --brand \""+currentBrand+"\" --page \""+ currentPage + "\" --moduleLibrary \""+answers.moduleLibrary+"\" --newTab \""+answers.newTab+"\" \n"); 
        startDev();
        done()
  
      })
    })
  }
  
  done();
});

async function startDev(){
  await dev();
  browserSync_()
  
  gulp.watch([`./pages/${currentBrand}/${currentPage}/index.html`], gulp.task('devLandingSeries')).on('done', browserSync.reload);
  gulp.watch([`./pages/${currentBrand}/${currentPage}/js/*.js`,`./pages/${currentBrand}/${currentPage}/js/**/*.js`], gulp.task('script_land_js_dev')).on('change', browserSync.reload);
  gulp.watch([`./pages/${currentBrand}/${currentPage}/style/*.scss`,`./pages/${currentBrand}/${currentPage}/style/**/*.scss`], gulp.task('landing_css'));
  gulp.watch([`./pages/${currentBrand}/${currentPage}/json/*`],gulp.task('json')).on('change', browserSync.reload);
  if (moduleLibrary){
    gulp.watch([`${settings.moduleLibrary.jsPath}*.js`,`${settings.moduleLibrary.jsPath}/**/*.js`], gulp.task('landing_ds_js')).on('change', browserSync.reload);
    gulp.watch([`${settings.moduleLibrary.cssPath}*.scss`,`${settings.moduleLibrary.cssPath}**/*.scss`], gulp.task('landing_ds_css'))
  }
  
  concat_html();

  fs.writeFileSync(`./pages/${currentBrand}/${currentPage}/dist/js/temp.min.js`, `document.title="${currentBrand}/${currentPage} | WCS Landing Builder"`);
  
}


async function dev(){
  return new Promise(function (resolve, reject) {
    if (moduleLibrary){
      gulp.series(['devLandingSeries','script_land_js_dev','landing_css','landing_ds_js','landing_ds_css',"json"], (done) => {
        resolve();
        done();
      })();
    }else{
      gulp.series(['devLandingSeries','script_land_js_dev','landing_css','json'], (done) => {
        resolve();
        done();
      })();
    }
  });
}


gulp.task('devLandingSeries',(done)=>{
  concat_html();
  done();
});



// BUILD SERIES
async function startBuild(){
  await build()
  concat_build();
  if(moduleLibrary){
    moving_moduleLibrary_files_to_folder();
  }
 
  setTimeout(function(){
    del(`./pages/${currentBrand}/${currentPage}/dist/js/temp.min.js`)
    
  },1000)
  
}

async function build(){
  return new Promise(function (resolve, reject) {
    if(moduleLibrary){
      gulp.series(['landing_js','landing_css','landing_ds_css','landing_ds_js','json'], (done) => {
        resolve();
        done();
      })();
    }else{
      gulp.series(['landing_js','landing_css','json'],(done) => {
        resolve();
        done();
      })();
    }   
  });
}



const questions_build = [
  {
    type: 'list',
    name: 'brand',
    message: 'Select Brand to Build:',
    choices: [...brands],
  },
]

gulp.task('build_', (done)=> {
  if (process.argv.includes('--brand') && process.argv.includes('--page') && process.argv.includes('--moduleLibrary')){
    currentBrand = process.argv[process.argv.indexOf('--brand')+1];
    settings = JSON.parse (fs.readFileSync(`./utils/dependences/${currentBrand}/settings.json`))
    currentPage= process.argv[process.argv.indexOf('--page')+1];
    moduleLibrary = process.argv[process.argv.indexOf('--moduleLibrary')+1] === "yes" ? true : false;
    settings["page"] = JSON.parse (fs.readFileSync(`./pages/${currentBrand}/${currentPage}/settings.json`))
    startBuild();
  }else{
    inquirer.prompt(questions_build).then((answers) => {
    
      console.log('\n Starting Dev: ' + answers.brand + "\n"); 
      currentBrand=  answers.brand;
      
      const questions_build2 = [ {
        type: 'list',
        name: 'page',
        message: 'Select Page to build:',
        choices: [...getDirectories(`./pages/${currentBrand}/`)],
      },
      {
        type: 'list',
        name: 'moduleLibrary',
        message: 'There is Module Library? ',
        choices: ['no','yes'],
      },
    ];
      
      inquirer.prompt(questions_build2).then((answers) => {
        currentPage =answers.page;
        settings = JSON.parse (fs.readFileSync(`./utils/dependences/${currentBrand}/settings.json`))
        moduleLibrary = answers.moduleLibrary === 'yes' ? true : false;
        console.log('\n Quick Command: \n\n' + " gulp build_ --brand \""+currentBrand+"\" --page \""+ currentPage+"\" --moduleLibrary "+answers.moduleLibrary+" \n"); 
        startBuild();
        done()
  
      })
    })
  }
 
  done();
})
// 


function moving_moduleLibrary_files_to_folder(){
  gulp.src(`./pages/${currentBrand}/${currentPage}/dist/js/temp_moduleLibrary.js`)
  .pipe(rename(settings.moduleLibrary.jsDestName))
  .pipe(gulp.dest(settings.moduleLibrary.jsDestPath));

  gulp.src(`./pages/${currentBrand}/${currentPage}/dist/style/index_temp_moduleLibrary.css`)
  .pipe(rename(settings.moduleLibrary.cssDestName))
  .pipe(gulp.dest(settings.moduleLibrary.cssDestPath));

  del([`./pages/${currentBrand}/${currentPage}/dist/js/temp_moduleLibrary.js`,`./pages/${currentBrand}/${currentPage}/dist/style/index_temp_moduleLibrary.css`])
}

function browserSync_(){
  browserSync.init({
    server: {
      baseDir: `.`,
      // index: `./pages/${currentBrand}/${currentPage}/dist/index.html`,
      ignore:['./node_modules'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    },
    cors:true,
    startPath:`./pages/${currentBrand}/${currentPage}/dist/index.html`,
    reloadOnRestart: true,
    injectChanges:true,
    open:newTab,
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
  // fs.writeFileSync(`./pages/${currentPage}/dist/js/temp.min.js`, `document.title="${currentPage}"`);
//  console.log(currentPage.substring(0,2))
    // console.log('test',process.argv)
    var brand='SGH';
    var page = 'SGH_Search'
    console.log(glob.sync(`./pages/${brand}/${page}/js/*.js`)); // ["file1", "file2"])
    console.log('brand:',process.argv[process.argv.indexOf('--brand')+1])
    console.log('page:',process.argv[process.argv.indexOf('--page')+1])
    console.log('modulelibrary:',process.argv[process.argv.indexOf('--moduleLibrary')+1])
    done()
});

