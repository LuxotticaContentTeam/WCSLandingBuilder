/**
 * Clean generated assets
 */

const 
    del = require('del'),
    log = require('fancy-log'),
    path = require('path');
const { brands_folder } = require('./_config.js');
  


module.exports = async function clean(cb) {
    await del(path.join(brands_folder,global.current_brand,global.current_proj,'dist'));
    cb();
}