const { series } = require('gulp');

const prompt = require('./tasks/prompt.task');
const newTask = require('./tasks/new.task');

exports.serve = series(
  prompt,
  newTask
)