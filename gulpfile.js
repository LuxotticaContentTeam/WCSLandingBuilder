const { series } = require('gulp');

const prompt = require('./tasks/prompt.task');
// const test = require('./tasks/m.task');
const mergeJson = require('./tasks/mergeJson');
const clean = require('./tasks/clean.task');
const { views } = require('./tasks/views.task');
const { style } = require('./tasks/style.task');


exports.serve = series(
  prompt,
  clean,
  views,
  style
)

exports.build = series(
  prompt,
  clean,
  // views
)

exports.test = mergeJson;