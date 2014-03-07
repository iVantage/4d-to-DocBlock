var format = require('./format.json'),
	startPattern = format.startDocBlock,
	endPattern = format.endDocBlock,
	paramPattern = format.param;

function isOneLiner (line) {
	return(line.indexOf(paramPattern) === 0);
}

function isStartDocBlock (line) {
	return(line.indexOf(startPattern) === 0);
}

function isEndDocBlock (line) {
	return(line.indexOf(endPattern) === 0);
}

function fixLine (line, inDocBlock) {
	var result = '';

  if (inDocBlock) {
		// Remove the //
		result = line.substring(2,line.length);
		// Add the *
		result = '*' + result;
	} else if (isOneLiner(line))  {
		result = line.substring(2,line.length);
		result = '/**\n' + '*' + result + '\n*/';
	} else {
		result = line;
	}

	return result;
}

function fixEndDocBlock (line) {
	return "*/";
}

function fixStartDocBlock (line) {
	return "/**";
}

function processLines (lines) {
	var result = [],
	    inDocBlock = false,
	    line,
	    i;

	for (i = 0; i < lines.length; i++) {
		line = lines[i].trim();
		if (inDocBlock) {
			if (isEndDocBlock(line)) {
				inDocBlock=false;
				result.push(fixEndDocBlock(line));
			} else {
				result.push(fixLine(line,true));
			}
		} else {
			if (isStartDocBlock(line)) {
				inDocBlock=true;
				result.push(fixStartDocBlock(line));
			} else {
				if (isOneLiner(line)) {
					newLines = fixLine(line,false);
					newLinesArr = newLines.split('\n');
					result = result.concat(newLinesArr);
				}else{
					result.push(fixLine(line,false));
				}
			}
		}
	}

	return result;
}

var convertToLines = function(text) {
	var lines = String(text).split('\n');
	var resultLines = processLines(lines);
	return resultLines;
};

module.exports = {
	convert : function(text) {
		return convertToLines(text).join('\n');
	},
	convertLines : convertToLines 
};
