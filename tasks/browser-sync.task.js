/**
 * Init webserver
 */

const { brands_folder } = require('./_config');

const
    browserSync = require('browser-sync').create(),
    // projectConfiguration = require('../projectConfig.json');
    log = require('fancy-log');

module.exports = function bs(cb){

    log(`-> open index.html page`)

    browserSync.init({
        server: {
            baseDir: brands_folder,
            index: path.join(global.current_brand,global.current_proj,'dist', 'index.html'),
        },
        watch: true,
        watchEvents: 'change',
        open: global.newTab,
        browser: "google chrome",
        port: 347, // => safe for RTR
        // middleware: function (req, res, next) {
        //     res.setHeader('Access-Control-Allow-Origin', '*');
        //     next();
        //   },
        snippetOptions: {
            rule: {
                match: /<head[^>]*>/i,
                fn: function(snippet, match) {
                    return match + snippet;
                }
            }
        }
    });

    cb();
};