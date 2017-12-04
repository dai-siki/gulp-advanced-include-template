const path = require('path');

const RE_ATTRIBUTES = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/gi;
const RE_INCLUDE_TAG = /<t-include([\S\s]*?)>([\S\s]*?)<\/t-include>/gi;
const RE_SOFT_TAG = /<t-soft>([\S\s]*)?<\/t-soft>/gi;
const RE_VARIABLE = /<%=(.+?)%>/gi;
const RE_FOREACH = /<!-- @foreach\(([^)]*?)\) -->([\S\s]*?)<!-- @endforeach -->/gi;

function parseAttributes(tag) {
	var arr, key, value, matches, attributes;

	matches = tag.match(RE_ATTRIBUTES);
	attributes = {};

	matches.forEach(function (match) {
		arr = match.split('=');
		key = arr[0].trim();
		value = arr[1].replace(/^['"]|['"]$/gi, '').trim();
		attributes[key] = value;
	});
	return attributes;
}

function includeTag(cwd, contents, getFileContent) {
	return contents.replace(RE_INCLUDE_TAG, function (tag, $1, $2) {
		var attributes, filePath, result, fileContent;

		attributes = parseAttributes($1);

		// src is required
		if (!attributes.src) throw new Error('src is required for <include> tag');

		filePath = path.join(cwd, attributes.src);
		fileContent = getFileContent(filePath);
		result = applyForeach(fileContent, attributes);
		result = applyVariables(result, attributes);
		result = applySoft(result, $2);

		if (RE_INCLUDE_TAG.test(result)) {
			return includeTag(path.dirname(filePath), result, getFileContent);
		} else {
			return result;
		}
	});
}

function applyVariables(str, attributes) {
	return str.replace(RE_VARIABLE, function (_, key) {
		const trimKey = key.trim();
		return attributes[trimKey];
	});
}

function applySoft(str, cnt) {
	return str.replace(RE_SOFT_TAG, function (_, $1) {
		if(cnt == ''){
			return $1;
		} else {
			return cnt;
		}
	});
}

function applyForeach(str, attributes) {
	return str.replace(RE_FOREACH, function (_, $1, $2) {
		const key = $1.trim();

		if(key != '' && typeof attributes[key] != 'undefined'){
			const arr = attributes[key].split('|').map(item => item.trim());

			return arr.reduce((total, item)=>{
				const attributes2 = Object.assign({item}, attributes);
				const resItem = applyVariables($2, attributes2);
				return total + resItem;
			}, '');
		} else {
			return '';
		}
	});
}

module.exports = includeTag;
