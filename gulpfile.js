const { series } = require('gulp');

const prompt = require('./tasks/prompt.task');
// const test = require('./tasks/m.task');
const mergeJson = require('./tasks/mergeJson');
const clean = require('./tasks/clean.task');
const { views } = require('./tasks/views.task');
const { style } = require('./tasks/style.task');
const { script } = require('./tasks/script.task');
const bs = require('./tasks/browser-sync.task');
const watcher = require('./tasks/watcher.task');


exports.serve = series(
  prompt,
  clean,
  views,
  style,
  script,
  bs,
  watcher
)

exports.build = series(
  prompt,
  clean,
  style,
  script,
  views,
)

exports.test = mergeJson;