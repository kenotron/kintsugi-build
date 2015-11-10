//******************************************************************************
//* GULP OPTIONS
//******************************************************************************
var path = require('path');
var util = require('gulp-util');
var findup = require('findup');
var appRoot = '/';

var releaseRoot = path.resolve("..", "built");

var packagesPath = util.env['packagesPath'];

if (packagesPath) {
    var sourceRoot = findup.sync(process.cwd(), "packages");
    var relative = path.relative(sourceRoot, process.cwd())
    releaseRoot = path.resolve(packagesPath, relative);
}  

console.log("releaseRoot: " + releaseRoot);

module.exports = {
  source: ['src/**/*.ts', 'src/**/*.tsx'],
  styleSource: ['src/**/*.css'],
  test: 'test/**/*.ts',
  releaseRoot: releaseRoot,
  output: path.resolve(releaseRoot, 'dist')
};