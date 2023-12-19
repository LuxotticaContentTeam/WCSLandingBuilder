const { series } = require('gulp');

const prompt = require('./tasks/prompt.task');
// const test = require('./tasks/m.task');
const mergeJson = require('./tasks/mergeJson');


exports.serve = series(
  prompt,
  mergeJson
)

exports.test = mergeJson;