const 
    /**
    * Set a variable with all data from package.json file
    */
    pkg = require('../package.json'),
    path = require('path'),
    // conf = pkg.projectConfigurations
	// projectConfigurations = require('../projectConfig.json');
	// conf = {
	// 	...conf,
	// 	...projectConfigurations
	// }

    arg = (argList => {

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

module.exports = {
    // conf : conf,
    isProd : process.env.NODE_ENV === 'production',
    isMobDep : process.env.NODE_MOBDEP === "true",
	// isPreProd : process.env.NODE_ENV === 'preProd',
    // imagePath : process.env.NODE_ENV === 'production' ? conf.paths.productionImage : conf.paths.developmentImage,
    // confPath : process.env.NODE_ENV === 'production' ? conf.paths.productionConf : conf.paths.developmentConf,
    
    utils_folder                 : "./utils",
    dependences_folder           : path.join("./utils","dependences"),
    brands_folder                : pkg.paths.brandsFolder,

}