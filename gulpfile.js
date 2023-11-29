const { series } = require('gulp');

const prompt = require('./tasks/prompt.task');
const newTask = require('./tasks/new.task');
const test = require('./tasks/test.task');


exports.serve = series(
  prompt,
  newTask
)

exports.test = test;