var path    = require('path');
var fs      = require('fs');

var taskFiles = fs.readdirSync(path.resolve(__dirname, 'tasks'));

module.exports = function(gulp) {
	taskFiles.forEach(function(taskFile) {
		require(path.resolve(__dirname, 'tasks', taskFile))(gulp);
	});
}