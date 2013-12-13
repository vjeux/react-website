/**
 * @providesModule unindent
 */

// Remove the indentation introduced by JSX
function unindent(code) {
  var lines = code.split('\n');
  if (lines.length <= 1) {
    return code;
  }

  var indent = lines[1].match(/^\s*/)[0];
  for (var i = 0; i < lines.length; ++i) {
   lines[i] = lines[i].replace(new RegExp('^' + indent), '');
  }
  return lines.join('\n');
}

module.exports = unindent;
