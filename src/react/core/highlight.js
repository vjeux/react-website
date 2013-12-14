/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule highlight
 */

var CodeMirror = require('codemirror/addon/runmode/runmode.node.js');

// Hack in order to fix syntax highlighters
this.CodeMirror = CodeMirror;
// Hack in order to fix css dependency
CodeMirror.resolveMode = function(spec) { return {name: 'css'}; };

require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/htmlmixed/htmlmixed.js');

function escape(html) {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(new RegExp('"', 'g'), '&quot;')
    .replace(new RegExp("'", 'g'), '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlight(string, options) {
	if (!options) options = {};

	var html = '';
	var col = 0;
	var tabSize = options.tabSize || 4

	CodeMirror.runMode(string, options.mode, function (text, style) {

		if (text === '\n') {
			html += '\n';
			col = 0;
			return;
		}

		var content = '';

		// replace tabs
		var pos = 0;
		while (true) {
			var idx = text.indexOf('\t', pos);
			if (idx === -1) {
				content += text.slice(pos);
				col += text.length - pos;
				break;
			} else {
				col += idx - pos;
				content += text.slice(pos, idx);
				var size = tabSize - col % tabSize;
				col += size;
				for (var i = 0; i < size; ++i) content += ' ';
				pos = idx + 1;
			}
		}

//		content = escape(content);
		if (style) {
			var className = 'cm-' + style.replace(/ +/g, 'cm-');
			content = '<span class="' + className + '">' + content + '</span>';
		}
		html += content;
	});

	return html;
};

module.exports = highlight;
