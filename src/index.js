'use strict';
const gutil = require('gulp-util');
const through = require('through2');
const path = require('path');
const includeTag = require('./includeTag.node');

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-include-tag', 'Streaming not supported'));
			return;
		}

		try {
			file.contents = new Buffer(includeTag(
				path.dirname(file.path),
				file.contents.toString()
			));
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-include-tag', err));
		}

		cb();
	});
};
