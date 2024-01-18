const 
    /**
    * Set a variable with all data from package.json file
    */
    pkg = require('../package.json'),
    path = require('path');
    // conf = pkg.projectConfigurations
	// projectConfigurations = require('../projectConfig.json');
	// conf = {
	// 	...conf,
	// 	...projectConfigurations
	// }


module.exports = {
    // conf : conf,
    isProd : process.env.NODE_ENV === 'production',
    isMobDep : process.env.NODE_MOBDEP === "true",
	// isPreProd : process.env.NODE_ENV === 'preProd',
    // imagePath : process.env.NODE_ENV === 'production' ? conf.paths.productionImage : conf.paths.developmentImage,
    // confPath : process.env.NODE_ENV === 'production' ? conf.paths.productionConf : conf.paths.developmentConf,
    
    utils_folder                 : path.join(pkg.paths.brandsFolder,"utils"),
    dependences_folder           : path.join(pkg.paths.brandsFolder,"utils","dependences"),
    brands_folder                : pkg.paths.brandsFolder,

}