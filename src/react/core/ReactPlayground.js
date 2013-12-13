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
 * @providesModule ReactPlayground
 * @jsx React.DOM
 */

var React = require('React');
var unindent = require('unindent');

var IS_MOBILE = (
  typeof navigator !== 'undefined' && (
       navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  )
);

var CodeMirrorEditor = React.createClass({displayName: 'CodeMirrorEditor',
  componentDidMount: function(root) {
    if (IS_MOBILE) {
      return;
    }
    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      mode: 'javascript',
      lineNumbers: false,
      matchBrackets: true,
      theme: 'solarized-light',
      readOnly: this.props.readOnly
    });
    this.editor.on('change', this.onChange);
    this.onChange();
  },
  onChange: function() {
    if (this.props.onChange) {
      var content = this.editor.getValue();
      this.props.onChange(content);
    }
  },
  render: function() {
    // wrap in a div to fully contain CodeMirror
    var editor;

    if (IS_MOBILE) {
      editor = React.DOM.pre( {style:{overflow: 'scroll'}}, this.props.codeText);
    } else {
      editor = React.DOM.textarea( {ref:"editor", defaultValue:this.props.codeText} );
    }

    return (
      React.DOM.div( {className:this.props.className},
        editor
      )
    );
  }
});

var ReactPlayground = React.createClass({displayName: 'ReactPlayground',
  MODES: {XJS: 'XJS', JS: 'JS'}, //keyMirror({XJS: true, JS: true}),

  getInitialState: function() {
    // Remove the indentation introduced by JSX
    var lines = this.props.codeText.split('\n');
    var indent = lines[1].match(/^\s*/)[0];
    for (var i = 0; i < lines.length; ++i) {
      lines[i] = lines[i].replace(new RegExp('^' + indent), '');
    }
    var code = lines.join('\n');

    return {mode: this.MODES.XJS, code: unindent(this.props.codeText)};
  },

  bindState: function(name) {
    return function(value) {
      var newState = {};
      newState[name] = value;
      this.setState(newState);
    }.bind(this);
  },

  getDesugaredCode: function() {
    return JSXTransformer.transform(this.state.code).code;
  },

  render: function() {
    var content;
    if (this.state.mode === this.MODES.XJS) {
      content =
        CodeMirrorEditor(
          {onChange:this.bindState('code'),
          className:"playgroundStage",
          codeText:this.state.code}
        );
    } else if (this.state.mode === this.MODES.JS) {
      content =
        React.DOM.div( {className:"playgroundJS playgroundStage"},
          this.getDesugaredCode()
        );
    }

    return this.transferPropsTo(
      React.DOM.div( {className:"playground"},
        React.DOM.div( {className:"playgroundCode"},
          content
        ),
        React.DOM.div( {className:"playgroundPreview"},
          React.DOM.div( {ref:"mount"} )
        )
      )
    );
  },
  componentDidMount: function() {
    this.executeCode();
  },
  componentDidUpdate: function() {
    this.executeCode();
  },
  executeCode: function() {
    var mountNode = this.refs.mount.getDOMNode();

    try {
      React.unmountComponentAtNode(mountNode);
    } catch (e) { }

    try {
      var desugaredCode = this.getDesugaredCode();
      if (this.props.renderCode) {
        React.renderComponent(
          CodeMirrorEditor( {codeText:desugaredCode, readOnly:true} ),
          mountNode
        );
      } else {
        eval(desugaredCode);
      }
    } catch (e) {
      React.renderComponent(
        React.DOM.div( {content:e.toString(), className:"playgroundError"} ),
        mountNode
      );
    }
  }
});

module.exports = ReactPlayground;
