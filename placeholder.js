const fs = require('fs')

function insert(file, pH, txt) {
	const html = fs.readFileSync(file, 'utf8');

	const re = new RegExp(pH, 'g');
	const newHtml = html.replace(re, txt);
	return newHtml;
}

module.exports = { insert };