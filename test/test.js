var mod = require('../index.js'),
	  assert = require('assert'),
    fs = require('fs');

var testText = fs.readFileSync('./test/testFile.txt',{
	encoding:'utf8'
});

var resultLines = mod.convertLines(testText);

console.log("Resulting lines:");
console.log(mod.convert(testText));

describe('results',function() {
	it('should begin with /**',function() {
		assert(resultLines[0]=="/**");
	});

	it('should see docblock end with */',function() {
		assert(resultLines[10]=='*/');
	});

	it('should see a * in the docblock',function() {
		assert(resultLines[1][0]=="*");
	});

	it('should see an @param',function() {
		assert(resultLines[20].indexOf('* @') === 0);
	});
});
