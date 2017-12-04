const includeTag = require('./includeTag');
const fs = require('fs');

module.exports = (cwd, contents) => {
	const getFileContent = (filePath) => {
		return fs.readFileSync(filePath).toString();
	};

	return includeTag(cwd, contents, getFileContent);
};
