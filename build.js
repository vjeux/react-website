var fs = require('fs')
var glob = require('glob');
var mkdirp = require('mkdirp');

var MD_DIR = 'src/react/content/';

var metadatas = [];

var generators = [
  // blog/2013-11-18-community-roundup-11.js
  //   ->
  // blog/2013/11/18/community-roundup-11.js
  {path: new RegExp('^blog/'), action: function(metadata) {
    return (
      metadata.filename
       .replace(new RegExp('^(blog/)([0-9]+-[0-9]+-[0-9]+-)(.+)'), function(_, a, b, c) {
         return a + b.replace(/-/g, '/') + c;
       })
    );
  }},

  // docs & tips
  {path: new RegExp('^(tips|docs)/'), action: function (metadata) {
    if (!metadata.permalink) {
      return metadata.filename.replace(/\.html$/, '.js');
    }
    return (
      metadata.filename.match(new RegExp('[^/]+/'))[0] + // tips/ or docs/
      metadata.permalink.replace(/\.html$/, '.js')
    );
  }},
];

glob(MD_DIR + '**/*.md', function (er, files) {
  files.forEach(function(file) {
    var content = fs.readFileSync(file, {encoding: 'utf8'});

    // Extract markdown metadata header
    var headers = content.match(/^---([\s\S]+)---/)[1].split('\n');
    var metadata = { filename: file.substr(MD_DIR.length).replace(/\.md$/, '.js') };
    for (var i = 1; i < headers.length - 1; ++i) {
      var keyvalue = headers[i].split(':');
      var key = keyvalue[0].trim();
      var value = keyvalue[1].trim();
      // Handle the case where you have "Community #10"
      try { value = JSON.parse(value); } catch(e) { }
      metadata[key] = value;
    }
    metadatas.push(metadata);

    console.log(metadata.filename);

    // Write the associated js file.
    // Instead of writing require('./doc.md'), you need to write require('./doc.js')
    fs.writeFileSync(
      file.replace(/\.md$/, '.js'),
      'module.exports = `' + content.replace(/`/g, '\\`') + '`;'
    );

    // Create a dummy .js version that just calls the associated layout
    for (var i = 0; i < generators.length; ++i) {
      var generator = generators[i];
      if (metadata.filename.match(generator.path)) {
        var name = generator.action(metadata);
        metadata.href = '/react/' + name.replace(/\.js$/, '.html');

        var targetFile = 'src/react/' + name;
        var layout = metadata.layout[0].toUpperCase() + metadata.layout.substr(1) + 'Layout';

        // blog/2013/11/25/community-roundup-12.md
        //   ->
        // ../../../../content/blog/2013-11-25-community-roundup-12.js
        var dotdots_count = targetFile.match(new RegExp('/', 'g')).length - 2;
        var dotdots = '';
        for (var i = 0; i < dotdots_count; ++i) {
          dotdots += '../';
        }
        var path = dotdots + 'content/' + metadata.filename;

        var content = (
          '/** @generated */\n' +
          'var React = require("React");\n' +
          'var layout = require("' + layout + '");\n' +
          'var content = require("' + path + '");\n' +
          'module.exports = React.createClass({\n' +
          '  render: function() {\n' +
          '    return layout({metadata: ' + JSON.stringify(metadata) + '}, content);\n' +
          '  }\n' +
          '});\n'
        );

        console.log(targetFile);
        mkdirp.sync(targetFile.replace(new RegExp('/[^/]*$'), ''));
        fs.writeFileSync(targetFile, content);
      }
    }
  });

  fs.writeFileSync(
    'src/react/metadata.js',
    '/** @providesModule Metadata */\n' +
    'module.exports = ' + JSON.stringify(metadatas, null, 2) + ';'
  );
});

