const include = require('./include');
const fs = require('fs');

module.exports = (cwd, contents) => {
	const getFileContent = (filePath) => {
		return fs.readFileSync(filePath).toString();
	};

	return include(cwd, contents, getFileContent);
};
