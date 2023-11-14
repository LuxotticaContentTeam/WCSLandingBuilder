const 
    /**
    * Set a variable with all data from package.json file
    */
    pkg = require('../package.json'),
    path = require('path');


module.exports = {
    brands_folder                : pkg.paths.brandsFolder,
}